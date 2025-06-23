import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, firstName, lastName, email, frequency, coverFees } = await request.json();

    // Calculate the final amount (in cents)
    let finalAmount = Math.round(amount * 100);

    // Add processing fees if requested
    if (coverFees) {
      // Stripe fee calculation: 2.9% + $0.30
      const stripeFee = Math.round(finalAmount * 0.029 + 30);
      finalAmount += stripeFee;
    }

    // Create customer or retrieve existing one
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: 'usd',
      customer: customer.id,
      metadata: {
        firstName,
        lastName,
        email,
        frequency,
        originalAmount: amount.toString(),
        coverFees: coverFees.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Optional: Create contact in your CRM/database here
    // You can replace this with your actual API call
    try {
      // Example: Call to your contact creation API
      // await fetch('https://your-api.com/create-contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ firstName, lastName, email, amount }),
      // });
    } catch (contactError) {
      console.error('Error creating contact:', contactError);
      // Don't fail the payment if contact creation fails
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
