// components/ContactForm.tsx
'use client'; // Needed for form state/handling and potentially Preline's auto-height textarea

import React, { useState, useEffect } from 'react';
import {
  ID,
  client,
  ensureAuthSession,
} from "@/lib/appwrite";
import { Databases } from "appwrite";

import posthog from 'posthog-js';

// Initialize the database client
const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

const ContactForm = () => {
  // Form state and auto-save refs
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [userId, setUserId] = useState<string | null>(null);

  // Run authentication check on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await ensureAuthSession();
        setUserId(session.$id);
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id.replace('hs-tac-input-', '').replace('hs-tac-', '');
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field has data
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    if (!hasData || !userId) {
      return;
    }

    try {
      const documentData = {
        user_id: userId,
        created_at: new Date().toISOString(),
        data: JSON.stringify(formData)
      };

      posthog.capture('Contact Form Submitted', {
        distinct_id: userId,
        properties: {
          ...formData,
          created_at: documentData.created_at,
        },
      });

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        documentData
      );

      console.log('Form submitted successfully:', response);
      // Clear form after successful submission
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    // The wrapping div with grid structure is part of the parent page/section
    // This component is just the form itself and related info
    <div id="contact" className="scroll-mt-12"> {/* Add ID for hash linking */}
      <div className="max-w-3xl mb-10 lg:mb-14">
        <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">Contact us</h2>
        <p className="mt-1 text-neutral-400">Whatever your goal - we will get you there.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
        {/* Form Column */}
        <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Input Name */}
              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-name" // Keep ID for label and Preline
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Name"
                  value={formData.name} onChange={handleChange}
                />
                <label
                  htmlFor="hs-tac-input-name"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                >
                  Name
                </label>
              </div>
              {/* End Input Name */}

              {/* Input Email */}
              <div className="relative">
                <input
                  type="email"
                  id="hs-tac-input-email"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Email"
                  value={formData.email} onChange={handleChange}
                />
                <label
                  htmlFor="hs-tac-input-email"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                >
                  Email
                </label>
              </div>
              {/* End Input Email */}

              {/* Input Company */}
              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-company"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Company"
                  value={formData.company} onChange={handleChange}
                />
                <label
                  htmlFor="hs-tac-input-company"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  Company
                </label>
              </div>
              {/* End Input Company */}

              {/* Input Phone */}
              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-phone"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Phone"
                  value={formData.phone} onChange={handleChange}
                />
                <label
                  htmlFor="hs-tac-input-phone"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  Phone
                </label>
              </div>
              {/* End Input Phone */}


              {/* Textarea */}
              <div className="relative">
                <textarea
                  id="hs-tac-message"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Tell us about your project"
                  data-hs-textarea-auto-height // Preline attribute for auto-height
                  value={formData.message} onChange={handleChange}
                ></textarea>
                <label
                  htmlFor="hs-tac-message"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  Tell us about your project
                </label>
              </div>
              {/* End Textarea */}
            </div>

            <div className="mt-2">
              <p className="text-xs text-neutral-500">
                All fields are required
              </p>

              <p className="mt-5">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff0]/50 focus:ring-offset-neutral-900" // Added focus styles
                >
                  Submit
                  <svg className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </p>
            </div>
          </form>
        </div>
        {/* End Form Column */}

        {/* Contact Info Column */}
        <div className="space-y-14">
          {/* Item */}
          <div className="flex gap-x-5">
            <svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">Our address:</h4>
              <address className="mt-1 text-neutral-400 text-sm not-italic">
                300 Bath Street, Tay House<br />
                Glasgow G2 4JR, United Kingdom
              </address>
            </div>
          </div>
          {/* End Item */}

          {/* Item */}
          <div className="flex gap-x-5">
            <svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
              <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">Email us:</h4>
              <a className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200" href="mailto:hello@example.so" target="_blank" rel="noopener noreferrer">
                hello@example.so
              </a>
            </div>
          </div>
          {/* End Item */}

          {/* Item */}
          <div className="flex gap-x-5">
            <svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 11 18-5v12L3 14v-3z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">We&apos;re hiring</h4>
              <p className="mt-1 text-neutral-400">We&apos;re thrilled to announce that we&apos;re expanding our team and looking for talented individuals like you to join us.</p>
              <p className="mt-2">
                <a className="group inline-flex items-center gap-x-2 font-medium text-sm text-[#ff0] decoration-2 hover:underline focus:outline-none focus:underline" href="#">
                  Job openings
                  <svg className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </p>
            </div>
          </div>
          {/* End Item */}
        </div>
        {/* End Contact Info Column */}
      </div>
    </div>
  );
};

export default ContactForm;