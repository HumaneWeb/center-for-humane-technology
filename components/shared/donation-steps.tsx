'use client';

import type React from 'react';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { RadioGroup, RadioGroupItem } from './forms/radio-group';
import Label from './forms/label';
import Input from './forms/input';
import { Checkbox } from './forms/checkbox';
import { redirect } from 'next/navigation';
import Script from 'next/script';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface DonationFormData {
  frequency: 'monthly' | 'once';
  amount: string;
  coverFees: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

export type DonationStep = 1 | 2 | 3;

function PaymentForm({
  formData,
  onBack,
  onSuccess,
}: {
  formData: DonationFormData;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An error occurred during payment');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-primary-navy mb:text-xl mb-4 font-sans text-[18px] leading-140 font-normal">
        Payment Information
      </div>

      <div className="mb-6">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {errorMessage && <div className="mb-4 text-sm text-red-600">{errorMessage}</div>}

      <div className="mb:flex-row flex flex-col-reverse justify-between space-x-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-primary-teal hover:text-primary-navy tracking-02 group mb:w-auto mb-4 w-full cursor-pointer rounded-[5px] text-xl leading-120 font-semibold underline transition-all duration-200 ease-in"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group mb-4 inline-block min-w-[215px] cursor-pointer rounded-[5px] px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in"
        >
          {isProcessing ? 'Processing...' : `Donate $${formData.amount}`}
        </button>
      </div>
    </form>
  );
}

export default function DonationSteps() {
  const [currentStep, setCurrentStep] = useState<DonationStep>(1);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [formData, setFormData] = useState<DonationFormData>({
    frequency: 'monthly',
    amount: '50',
    coverFees: false,
    firstName: '',
    lastName: '',
    email: '',
  });

  const validateStep = (step: DonationStep): boolean => {
    switch (step) {
      case 1:
        return formData.amount !== '' && Number(formData.amount) > 0;
      case 2:
        return formData.firstName !== '' && formData.lastName !== '' && formData.email !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = async (): Promise<void> => {
    if (!validateStep(currentStep)) {
      alert('Please fill in all required fields.');
      return;
    }

    if (currentStep === 2) {
      // Create payment intent when moving to step 3
      try {
        const response = await fetch(
          'https://ht-hbspt.loggins.workers.dev/api/create-contact-and-payment',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: Number(formData.amount),
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              // frequency: formData.frequency,
              // coverFees: formData.coverFees,
            }),
          },
        );

        const { success, clientSecret, error } = await response.json();

        if (success && clientSecret) {
          setClientSecret(clientSecret);
          setCurrentStep(3);
        } else {
          alert('Error creating payment: ' + (error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as DonationStep);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as DonationStep);
    }
  };

  const handleInputChange = (field: keyof DonationFormData, value: string | boolean): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentSuccess = () => {
    redirect('/thank-you');
  };

  const renderStep1 = () => (
    <div className="w-full max-w-md">
      {/* <div>
        <div className="text-primary-navy mb:text-xl mb-4 text-[18px] leading-140 font-normal">
          How often would you like to give?
        </div>
      </div> */}
      <div>
        {/* <RadioGroup
          value={formData.frequency}
          onValueChange={(value: string) =>
            handleInputChange('frequency', value as 'monthly' | 'once')
          }
          className="mb-[18px] gap-4"
        >
          <div className="bg-neutral-white flex items-center space-x-3 rounded-[5px] border-2 border-[#A8ADB6] px-2.5 py-4">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label
              htmlFor="monthly"
              className="text-primary-navy mb:text-[18px] flex-1 cursor-pointer text-[16px] leading-140 font-normal"
            >
              Donate monthly
              <br />
              <span className="text-[16px]">Help us make a bigger difference</span>
            </Label>
          </div>
          <div className="bg-neutral-white flex items-center space-x-3 rounded-[5px] border-2 border-[#A8ADB6] px-2.5 py-4">
            <RadioGroupItem value="once" id="once" />
            <Label
              htmlFor="once"
              className="text-primary-navy mb:text-[18px] flex-1 cursor-pointer text-[16px] leading-140 font-normal"
            >
              Donate once
            </Label>
          </div>
        </RadioGroup>

        {formData.frequency === 'once' && (
          <div className="mb-8 text-[15px] leading-140 text-[#0B1023]">
            Monthly donations help us plan ahead and make a bigger difference.{' '}
            <button
              className="cursor-pointer underline"
              onClick={() => handleInputChange('frequency', 'monthly')}
            >
              Change to monthly
            </button>
          </div>
        )} */}

        <div>
          <Label className="text-primary-navy mb:text-xl mb-4 text-[18px] leading-140 font-normal">
            How much would you like to give?
          </Label>
          <div className="relative mt-2 mb-4">
            <span className="text-primary-navy mb:text-xl absolute top-1/2 left-3 z-10 -translate-y-1/2 transform font-sans text-[18px] leading-140 font-medium">
              $
            </span>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('amount', e.target.value)
              }
              className="text-primary-navy mb:text-xl w-full rounded-[5px] border border-[#A8ADB6] py-6 pr-2 pl-7 font-sans text-[18px] leading-140 font-medium"
              placeholder="50"
              min="1"
              step="1"
            />
            {/* <button
              className="text-primary-navy absolute top-1/2 right-2 mr-1 -translate-y-1/2 transform cursor-pointer text-[16px] leading-140"
              onClick={() => {
                const newAmount: string | null = prompt('Enter amount:', formData.amount);
                if (newAmount && !isNaN(Number(newAmount)) && Number(newAmount) > 0) {
                  handleInputChange('amount', newAmount);
                }
              }}
            >
              Click to change
            </button> */}
          </div>
        </div>

        {/* <div className="mb-12 flex items-start space-x-2">
          <Checkbox
            id="cover-fees"
            checked={formData.coverFees}
            onCheckedChange={(checked: boolean | 'indeterminate') =>
              handleInputChange('coverFees', checked as boolean)
            }
          />
          <Label
            htmlFor="cover-fees"
            className="text-primary-navy text-[14px] leading-140 font-normal"
          >
            I'd like to cover the processing fee so that all of my gift will go to CHT
          </Label>
        </div> */}

        <button
          onClick={handleNext}
          className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group mb:min-w-[215px] mb-4 inline-block min-w-full cursor-pointer rounded-[5px] px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in"
        >
          Next
        </button>

        <div className="mt-2 flex items-start">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M3.24854 15C2.90479 15 2.61062 14.8696 2.36604 14.6087C2.12145 14.3478 1.99895 14.0338 1.99854 13.6667V7C1.99854 6.63333 2.12104 6.31956 2.36604 6.05867C2.61103 5.79778 2.9052 5.66711 3.24854 5.66667H3.87353V4.33333C3.87353 3.41111 4.17833 2.62511 4.78791 1.97533C5.39749 1.32556 6.13437 1.00044 6.99853 1C7.8627 0.999556 8.59978 1.32467 9.20978 1.97533C9.81978 2.626 10.1244 3.412 10.1235 4.33333V5.66667H10.7485C11.0923 5.66667 11.3867 5.79733 11.6317 6.05867C11.8767 6.32 11.999 6.63378 11.9985 7V13.6667C11.9985 14.0333 11.8762 14.3473 11.6317 14.6087C11.3871 14.87 11.0927 15.0004 10.7485 15H3.24854ZM6.99853 11.6667C7.34228 11.6667 7.63666 11.5362 7.88166 11.2753C8.12666 11.0144 8.24895 10.7004 8.24853 10.3333C8.24812 9.96622 8.12583 9.65244 7.88166 9.392C7.63749 9.13156 7.34312 9.00089 6.99853 9C6.65395 8.99911 6.35979 9.12978 6.11603 9.392C5.87228 9.65422 5.74978 9.968 5.74853 10.3333C5.74728 10.6987 5.86979 11.0127 6.11603 11.2753C6.36229 11.538 6.65645 11.6684 6.99853 11.6667ZM5.12353 5.66667H8.87353V4.33333C8.87353 3.77778 8.69124 3.30556 8.32666 2.91667C7.96208 2.52778 7.51937 2.33333 6.99853 2.33333C6.4777 2.33333 6.03499 2.52778 5.67041 2.91667C5.30583 3.30556 5.12353 3.77778 5.12353 4.33333V5.66667Z"
                fill="#0B1023"
              />
            </svg>
          </div>
          <p className="text-primary-navy font-sans text-[13px] leading-135">
            Secure Payment - This site is protected by reCAPTCHA and the Google Privacy Policy and
            Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="w-full max-w-md">
      <div>
        <div className="text-primary-navy mb:text-xl mb-4 font-sans text-[18px] leading-140 font-normal">
          Your information
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Input
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('firstName', e.target.value)
            }
            className="text-primary-navy mt-0 h-full px-4 py-3 font-sans text-[18px] leading-140 font-normal"
          />
        </div>

        <div>
          <Input
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('lastName', e.target.value)
            }
            className="text-primary-navy mt-0 h-full px-4 py-3 font-sans text-[18px] leading-140 font-normal"
          />
        </div>

        <div>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('email', e.target.value)
            }
            className="text-primary-navy mt-0 h-full px-4 py-3 font-sans text-[18px] leading-140 font-normal"
          />
        </div>

        <div className="mb:flex-row flex flex-col-reverse justify-between space-x-3 pt-4">
          <button
            onClick={handleBack}
            className="text-primary-teal hover:text-primary-navy tracking-02 group mb:w-auto mb-4 w-full cursor-pointer rounded-[5px] text-xl leading-120 font-semibold underline transition-all duration-200 ease-in"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group mb-4 inline-block min-w-[215px] cursor-pointer rounded-[5px] px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="w-full max-w-md">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
        >
          <PaymentForm formData={formData} onBack={handleBack} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );

  return (
    <div className="mb:px-7 mb:pt-10 mb:pb-14 flex items-center justify-center rounded-[5px] bg-[#F0F7F7] p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
}
