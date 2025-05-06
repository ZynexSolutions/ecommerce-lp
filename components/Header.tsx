// components/Header.tsx
"use client"; // Needed for Preline interactive components (collapse, dropdown)

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
      {/* Blurred Background Element */}
      <div className="absolute inset-0 max-w-5xl mx-2 lg:mx-auto rounded-full bg-neutral-800/30 backdrop-blur-md"></div>

      <nav
        className="relative max-w-5xl w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/" // Changed to root link
            aria-label="Preline"
          >
            <img src="/logo.png" className="w-28 pl-2"></img>
          </Link>
          {/* End Logo */}

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <div>
              <a
                className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-hidden"
                href="#contact" // Link to contact section ID
              >
                Contact us
              </a>
            </div>
          </div>
          {/* End Mobile Toggle Button */}
        </div>

        {/* Collapse Navigation Menu */}
        <div
          id="hs-navbar-floating-dark" // Target ID for collapse toggle
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-navbar-floating-dark-collapse"
        >
          <div className="hidden md:flex flex-col md:flex-row md:items-center md:justify-end gap-y-3 py-2 md:py-0 md:ps-7">
            {/* Simple Links */}
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
            {/* Dropdown Menu: Company */}
            {/* Contact Button */}
            <div>
              <a
                className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-hidden"
                href="#contact" // Link to contact section ID
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
        {/* End Collapse Navigation Menu */}
      </nav>
    </header>
  );
};

export default Header;
