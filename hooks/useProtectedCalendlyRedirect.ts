"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReCaptcha } from 'next-recaptcha-v3';

const CALENDLY_LINK = "https://calendly.com/zynexsolutions/30min";

export const useProtectedCalendlyRedirect = (actionName: string = "calendly_redirect") => {
  const { executeRecaptcha } = useReCaptcha();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectError, setRedirectError] = useState<string | null>(null);

  const triggerRedirect = async () => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha not yet available");
      setRedirectError("reCAPTCHA is not available at the moment. Please try again later.");
      setIsRedirecting(false); // Ensure loading state is reset
      return;
    }

    setIsRedirecting(true);
    setRedirectError(null);

    try {
      const token = await executeRecaptcha(actionName);
      const response = await fetch("/api/verify-consultation-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Sending token with key 'token'
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(CALENDLY_LINK);
        // No need to setIsRedirecting(false) here as navigation will occur
      } else {
        setRedirectError(data.message || "reCAPTCHA verification failed or score too low. Please try again.");
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error("Error during reCAPTCHA protected redirection:", error);
      setRedirectError("An unexpected error occurred while trying to redirect. Please try again.");
      setIsRedirecting(false);
    }
    // Removed finally block as setIsRedirecting(false) is handled in error cases or navigation occurs
  };

  return {
    triggerRedirect,
    isRedirecting,
    redirectError,
  };
};