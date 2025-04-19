// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { WavyLinesBackground } from "./SvgPatterns"; // Assuming index.ts export

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-neutral-900">
      {/* Background SVG Pattern */}
      <WavyLinesBackground className="absolute -bottom-20 start-1/2 w-[1900px] transform -translate-x-1/2" />

      <div className="relative z-10">
        <div className="w-full max-w-5xl px-4 xl:px-0 py-10 lg:pt-16 mx-auto">
          <div className="inline-flex items-center">
            {/* Logo */}
            <Link href="/" aria-label="Preline">
              <img src="/logo.png" className="w-28"></img>
            </Link>
            {/* End Logo */}

            <div className="border-s border-neutral-700 ps-5 ms-5">
              <p className="text-sm text-neutral-400">
                © 2025 Zynex Solutions.
              </p>
            </div>
          </div>
          {/* Consider adding navigation links here if needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
