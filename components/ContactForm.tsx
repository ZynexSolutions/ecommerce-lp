// components/ContactForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ID, client, ensureAuthSession } from "@/lib/appwrite";
import { Databases } from "appwrite";
import posthog from "posthog-js";
import { useProtectedCalendlyRedirect } from "@/hooks/useProtectedCalendlyRedirect";
import { ArrowRight } from "lucide-react";


const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

const ContactForm = () => {
  const {
    triggerRedirect: triggerCalendlyRedirect,
    isRedirecting: isCalendlyRedirecting,
    redirectError: calendlyRedirectError
  } = useProtectedCalendlyRedirect("contact_form_book_call");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await ensureAuthSession();
        setUserId(session.$id);
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    };
    checkAuth();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const key = id.replace("hs-tac-input-", "").replace("hs-tac-", "");
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasData = Object.values(formData).some(
      (value) => value.trim() !== ""
    );
    if (!hasData || !userId) {
      return;
    }

    try {
      const documentData = {
        user_id: userId,
        created_at: new Date().toISOString(),
        data: JSON.stringify(formData),
      };

      posthog.capture("Contact Form Submitted", {
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

      console.log("Form submitted successfully:", response);
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="contact" className="scroll-mt-12">
      <div className="max-w-3xl mb-10 lg:mb-14">
        <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
          Contact us
        </h2>
        <p className="mt-1 text-neutral-400">
          Whatever your goal - we will get you there.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
        <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-name"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
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

              <div className="relative">
                <input
                  type="email"
                  id="hs-tac-input-email"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
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

              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-company"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                />
                <label
                  htmlFor="hs-tac-input-company"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                >
                  Company
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-phone"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label
                  htmlFor="hs-tac-input-phone"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                >
                  Phone
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="hs-tac-message"
                  className="peer p-3 sm:p-4 block w-full bg-neutral-800 border-transparent rounded-lg sm:text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6 autofill:pb-2"
                  placeholder="Tell us about your project"
                  data-hs-textarea-auto-height
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label
                  htmlFor="hs-tac-message"
                  className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400
                    peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                >
                  Tell us about your project
                </label>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-xs text-neutral-500">
                All fields are required
              </p>
              <p className="mt-5">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff0]/50 focus:ring-offset-neutral-900"
                >
                  Submit
                  <ArrowRight className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5" />
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="space-y-10">
          <div className="flex gap-x-5">
            <svg
              className="shrink-0 size-6 text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">Our address:</h4>
              <address className="mt-1 text-neutral-400 not-italic">
                Chennai, India
              </address>
            </div>
          </div>

          <div className="flex gap-x-5">
            <svg
              className="shrink-0 size-6 text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
              <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">Email us:</h4>
              <a
                className="mt-1 text-neutral-400 hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                href="mailto:social@zynexsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                social@zynexsolutions.com
              </a>
            </div>
          </div>

          <div className="flex gap-x-5">
            <svg
              className="shrink-0 size-6 text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.5 3.5a10 10 0 0 0-17.07 11.2L2 22l7.48-1.97A10 10 0 0 0 20.5 3.5Z" />
              <path d="M16.5 14.5c-.5.14-1.09.25-1.74.14a9.39 9.39 0 0 1-3.08-1.34 9.39 9.39 0 0 1-2.53-2.53c-.4-.6-.86-1.49-1.01-2.53-.09-.61.12-1.24.53-1.63.38-.37.71-.41 1.03-.34l1.64.44c.21.06.39.2.48.39l.52 1.1c.12.24.09.52-.07.73l-.64.84a6.84 6.84 0 0 0 2.53 2.53l.84-.64c.21-.16.49-.19.73-.07l1.1.52c.19.09.33.27.39.48l.44 1.64c.07.32.03.65-.34 1.03Z" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">Phone & Whatsapp:</h4>
              <a
                className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                href="tel:+919176700606"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 9176700606
              </a>
              <br/>
              <a
                className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                href="tel:+918015255485"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 8015255485
              </a>
            </div>
          </div>

          <div className="flex gap-x-5">
            <svg
              className="shrink-0 size-6 text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M9 15h.01" />
              <path d="M12 15h.01" />
              <path d="M15 15h.01" />
            </svg>
            <div className="grow">
              <h4 className="text-white font-semibold">Schedule Call</h4>
              <p className="mt-1 text-neutral-400">
                Need more clarity about your custom eCommerce store? Schedule
                your FREE consultation call with now!.
              </p>
              <div className="mt-2"> {/* Wrapper for button and error */}
                <button
                  onClick={triggerCalendlyRedirect}
                  disabled={isCalendlyRedirecting}
                  className="group inline-flex items-center gap-x-2 font-medium text-sm text-[#ff0] decoration-2 hover:underline focus:outline-none focus:underline disabled:opacity-50 bg-transparent border-none p-0 cursor-pointer"
                >
                  {isCalendlyRedirecting ? "Processing..." : "Book a Call"}
                  {!isCalendlyRedirecting && (
                    <ArrowRight className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5" />
                  )}
                </button>
                {calendlyRedirectError && (
                  <p className="mt-1 text-red-500 text-xs">{calendlyRedirectError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
