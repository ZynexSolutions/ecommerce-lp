// components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useProtectedCalendlyRedirect } from "@/hooks/useProtectedCalendlyRedirect";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const {
    triggerRedirect: triggerMobileRedirect,
    isRedirecting: isMobileRedirecting,
    redirectError: mobileRedirectError
  } = useProtectedCalendlyRedirect("header_mobile_contact");

  const {
    triggerRedirect: triggerDesktopRedirect,
    isRedirecting: isDesktopRedirecting,
    redirectError: desktopRedirectError
  } = useProtectedCalendlyRedirect("header_desktop_contact");

  const CallButton = ({ onClick, isRedirecting, children, className }: { onClick: () => void, isRedirecting: boolean, children: React.ReactNode, className?: string }) => (
    <button
      onClick={onClick}
      disabled={isRedirecting}
      className={`group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-hidden disabled:opacity-50 ${className}`}
    >
      {isRedirecting ? "Processing..." : children}
      <ArrowRight className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" />
    </button>
  );

  const ErrorDisplay = ({ error }: { error: string | null }) => (
    error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null
  );

  return (
    <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
      <div className="absolute inset-0 max-w-5xl mx-2 lg:mx-auto rounded-full bg-neutral-800/30 backdrop-blur-md"></div>
      <nav
        className="relative max-w-5xl w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/"
            aria-label="Preline"
          >
            <img src="/logo.png" className="w-28 pl-2" alt="Zynex Solutions Logo"></img>
          </Link>
          <div className="md:hidden">
            <div className="flex flex-col items-end"> {/* Wrapper for button and error */}
              <CallButton onClick={triggerMobileRedirect} isRedirecting={isMobileRedirecting}>
                Contact us
              </CallButton>
              <ErrorDisplay error={mobileRedirectError} />
            </div>
          </div>
        </div>
        <div
          id="hs-navbar-floating-dark"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-navbar-floating-dark-collapse"
        >
          <div className="hidden md:flex flex-col md:flex-row md:items-center md:justify-end gap-y-3 py-2 md:py-0 md:ps-7">
            <a
              className="pe-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-hidden focus:text-neutral-300"
              href="#recent-works"
            >
              Recent Works
            </a>
            <a
              className="pe-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-hidden focus:text-neutral-300"
              href="#testimonials"
            >
              Testimonial
            </a>
            <a
              className="pe-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-hidden focus:text-neutral-300"
              href="#our-approach"
            >
              Our Approach
            </a>{" "}
            <a
              className="pe-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-hidden focus:text-neutral-300"
              href="#faqs"
            >
              FAQs
            </a>
            <div className="flex flex-col items-start"> {/* Wrapper for button and error */}
              <CallButton onClick={triggerDesktopRedirect} isRedirecting={isDesktopRedirecting}>
                Contact us
              </CallButton>
              <ErrorDisplay error={desktopRedirectError} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
