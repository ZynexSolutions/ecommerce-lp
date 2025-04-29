// components/ClientLogos.tsx
import React from "react";
import { WavyLinesBackground } from "./SvgPatterns"; // Assuming index.ts export

const ClientLogos = () => {
  return (
    <div className="relative overflow-hidden pt-2 bg-neutral-900">
      {/* Background SVG Pattern */}
      <WavyLinesBackground className="absolute -bottom-20 start-1/2 w-[1900px] transform -translate-x-1/2" />

      <div className="relative z-10">
        <div className="max-w-5xl px-4 xl:px-0 mx-auto">
          <div className="mb-4">
            <h2 className="text-neutral-400">
              Trusted by over 150+ Businesses across the World.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-between gap-6">
            {/* Client Logo SVGs - Include all 5 SVGs from the HTML */}
            {/* Logo 1: Mailchimp */}

            {/* Logo 2: Shopify */}
            <img
              className="py-3 lg:py-5 w-36 h-auto md:w-24 lg:w-40 text-neutral-400"
              src="/strategy.svg"
            ></img>

            <img
              className="py-3 lg:py-5 w-26 h-auto md:w-24 lg:w-40 text-neutral-400"
              src="/lepa.svg"
            ></img>

            <img
              className="py-3 lg:py-5 w-26 h-auto md:w-24 lg:w-32 text-neutral-400"
              src="/synergys.svg"
            ></img>

            <img
              className="py-3 lg:py-5 w-26 h-auto md:w-24 lg:w-32 text-neutral-400"
              src="/hogist.svg"
            ></img>

            <img
              className="py-3 lg:py-5 w-18 h-auto md:w-24 lg:w-28 text-neutral-400"
              src="/silvercastle.svg"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
