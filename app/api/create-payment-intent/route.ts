import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// @ts-ignore
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured correctly. Please contact the administrator.' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { amount, currency, donationType, frequency, customerInfo } = body;

    // Validate required fields
    if (!amount || !currency || !donationType || !customerInfo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1,
    });

    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        name: customerInfo.name,
        email: customerInfo.email,
      });
    }

    let paymentIntent;

    if (donationType === 'recurring') {
      // For recurring donations, create a subscription
      const price = await stripe.prices.create({
        unit_amount: amount,
        currency: currency,
        recurring: {
          interval:
            frequency === 'monthly' ? 'month' : frequency === 'quarterly' ? 'month' : 'year',
          interval_count: frequency === 'quarterly' ? 3 : 1,
        },
        product_data: {
          name: 'Recurring Donation',
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      // @ts-ignore
      paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
    } else {
      // For one-time donations, create a regular payment intent
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          donationType: 'one-time',
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
        },
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: `Error Stripe: ${error.message}` }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
