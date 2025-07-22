'use client';

import type React from 'react';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from './forms/input';
import { RadioGroup, RadioGroupItem } from './forms/radio-group';
import Label from './forms/label';
import { Checkbox } from './forms/checkbox';
import { Textarea } from './forms/textarea';
import { HubspotProvider } from 'next-hubspot';
import { useHubspotForm } from 'next-hubspot';
import { cn } from '@/lib/utils/css.utils';

const HUBPOST_FORM_GENERAL = 'c32639d7-603c-4d6a-9adb-233bc6fc7f2d';
const HUBSPOT_FORM_POLICY = '9b52b82c-41f5-4232-b679-f961cb76bd75';

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState(() => {
    const typeParam = searchParams.get('type');
    const emailParam = searchParams.get('email');

    return {
      contactOption: typeParam && ['general', 'policy'].includes(typeParam) ? typeParam : 'general',
      firstName: '',
      lastName: '',
      email: emailParam ? decodeURIComponent(emailParam) : '',
      phone: '',
      message: '',
      agreement: false,
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace
    const endpoint = '/api/contact';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        // Handle success (e.g., show success message, reset form)
      } else {
        console.error('Form submission failed');
        // Handle error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle network error
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generalForm = useHubspotForm({
    portalId: '45134634',
    formId: HUBPOST_FORM_GENERAL,
    target: '#hubspot-form-wrapper-general',
    region: 'na1',
  });
  const policyForm = useHubspotForm({
    portalId: '45134634',
    formId: HUBSPOT_FORM_POLICY,
    target: '#hubspot-form-wrapper-policy',
    region: 'na1',
  });

  return (
    <HubspotProvider>
      <form
        onSubmit={handleSubmit}
        className="mb:px-7.5 mb:py-8 space-y-6 rounded-lg bg-[#F0F7F7] p-6"
      >
        <RadioGroup
          value={formData.contactOption}
          onValueChange={(value) => handleInputChange('contactOption', value)}
          className="mb:space-y-5 mb-0 space-y-3 border-b border-[#DBDEE6] pb-8"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="general" id="general" className="h-[18px] w-[18px]" />
            <Label
              htmlFor="general"
              className={`text-[16px] leading-135 font-medium ${
                formData.contactOption === 'general' ? 'text-primary-blue' : 'text-primary-navy'
              }`}
            >
              General
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="policy" id="policy" className="h-[18px] w-[18px]" />
            <Label
              htmlFor="policy"
              className={`text-[16px] leading-135 font-medium ${
                formData.contactOption === 'policy' ? 'text-primary-blue' : 'text-primary-navy'
              }`}
            >
              Policy
            </Label>
          </div>
          <div className="flex_DISABLED hidden items-center space-x-3">
            <RadioGroupItem value="example" id="example" className="h-[18px] w-[18px]" />
            <Label
              htmlFor="example"
              className={`text-[16px] leading-135 font-medium ${
                formData.contactOption === 'example' ? 'text-primary-blue' : 'text-primary-navy'
              }`}
            >
              Speaking Inquiry
            </Label>
          </div>
        </RadioGroup>

        <div
          id="hubspot-form-wrapper-general"
          className={cn(formData.contactOption === 'general' ? 'block' : 'hidden')}
        />
        <div
          id="hubspot-form-wrapper-policy"
          className={cn(formData.contactOption === 'policy' ? 'block' : 'hidden')}
        />

        <div className="hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label
                htmlFor="firstName"
                className="mb-2 block text-[15px] leading-135 font-semibold text-[#262626]"
              >
                First name*
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="text-primary-navy h-fit rounded-[5px] border border-[#A8ADB6] bg-white p-3.5 text-[15px] leading-135 font-medium"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="mb-2 block text-[15px] leading-135 font-semibold text-[#262626]"
              >
                Last name*
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="text-primary-navy h-fit rounded-[5px] border border-[#A8ADB6] bg-white p-3.5 text-[15px] leading-135 font-medium"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label
                htmlFor="email"
                className="mb-2 block text-[15px] leading-135 font-semibold text-[#262626]"
              >
                Email*
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-primary-navy h-fit rounded-[5px] border border-[#A8ADB6] bg-white p-3.5 text-[15px] leading-135 font-medium"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="mb-2 block text-[15px] leading-135 font-semibold text-[#262626]"
              >
                Phone*
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="text-primary-navy h-fit rounded-[5px] border border-[#A8ADB6] bg-white p-3.5 text-[15px] leading-135 font-medium"
                required
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="message"
              className="mb-2 block text-[15px] leading-135 font-semibold text-[#262626]"
            >
              Your message
            </Label>
            <Textarea
              id="message"
              placeholder="Write here"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="text-primary-navy min-h-[120px] resize-none bg-white p-3.5 text-[15px] leading-135 font-medium"
              rows={5}
            />
          </div>
          <div className="text-[14px] leading-135 text-black">
            Lorem ipsum dolor sit amet consectetur. Egestas ut felis euismod posuere quis. Mi sapien
            mi at nulla molestie. Lectus lacus integer pulvinar ultrices leo volutpat at feugiat.
            Dolor risus eleifend tortor et lobortis adipiscing sagittis ultrices.
          </div>
          <div className="mb:mb-10 mb-6 flex items-center space-x-2.5 border-b border-[#DBDEE6] pb-5">
            <Checkbox
              id="agreement"
              checked={formData.agreement}
              onCheckedChange={(checked) => handleInputChange('agreement', checked as boolean)}
              className="mt-0.5"
            />
            <Label
              htmlFor="agreement"
              className="text-primary-navy text-[14px] leading-135 font-normal"
            >
              Lorem ipsum dolor sit amet consectetur.
            </Label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group mb:min-w-[216px] inline-block min-w-full cursor-pointer rounded-[5px] px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </HubspotProvider>
  );
}
