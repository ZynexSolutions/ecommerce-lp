"use client";

// components/ComparisonSection.tsx
import React from "react";
import Link from "next/link"; // For the CTA button
import { XIcon, CheckIcon } from "./SvgPatterns/logo";
import { motion, useAnimation } from "framer-motion";

// Local data for comparison points
const withoutUsPoints = [
  "Pay 20% of your revenue to a third-party platform",
  "Pay a high monthly fee to run your online store",
  "Poor webstie loading time and performance",
  "Reduced convertion rates due to generic design",
  "Poor SEO scores and reduced organic traffic",
];

const withUsPoints = [
  "Increase your revenue by 40%+",
  "70% Reduction in monthly platform charges",
  "Blazing fast online store with great UI / UX",
  "Increased convertion due to unique design and market analysis",
  "90+ SEO scores and improved organic traffic",
];
// Animation for the glowing outline
const glowAnimation = {
  initial: { boxShadow: "0 0 0 rgba(255, 255, 0, 0)" },
  animate: {
    boxShadow: "0 0 10px rgba(255, 255, 0, 0.6)",
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    } as const, // Explicitly cast the transition object
  },
};

// Animation for the button's subtle pulse
const buttonPulse = {
  initial: { scale: 1 },
  animate: {
    scale: 1.05,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    } as const, // Explicitly cast the transition object
  },
};

const ComparisonSection = () => {
  return (
    <div className="">
      <div className="max-w-5xl px-4 xl:px-0 pt-10 lg:pt-20 mx-auto">
        {/* Title */}
        <div className="max-w-3xl mb-10 lg:mb-14 mx-auto text-center">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            No Fixed Costs<span className="text-[#ff0]">.</span> No Design
            Restriction<span className="text-[#ff0]">.</span>
          </h2>
        </div>
        {/* End Title */}

        {/* Grid for Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Without Us (The Old Way) */}
          <div className="flex flex-col bg-neutral-900 border border-neutral-700 shadow-sm rounded-xl p-6 lg:p-8 h-full">
            <h3 className="text-lg font-semibold text-neutral-300 mb-4">
              Sticking to the your current platform...
            </h3>
            <ul className="space-y-3 text-neutral-400 text-sm lg:text-base">
              {withoutUsPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-x-3">
                  <XIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* End Card 1 */}

          {/* Card 2: With Us (The Preline Way) - Glowing Outline */}
          <motion.div
            className="flex flex-col bg-neutral-900 border border-[#ff0]/30 shadow-sm rounded-xl p-6 lg:p-8 h-full ring-1 ring-neutral-700 hover:ring-[#ff0]/50 transition-shadow duration-300"
            initial="initial"
            animate="animate"
            variants={glowAnimation}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Partnering With Zynex Solutions...
            </h3>
            <ul className="space-y-3 text-neutral-200 text-sm lg:text-base">
              {withUsPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-x-3">
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button Area - Subtle Pulse Animation */}
            <div className="mt-auto pt-6 flex justify-end">
              <motion.div variants={buttonPulse} animate="animate">
                <Link
                  className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff0]/50 focus:ring-offset-neutral-800 hover:bg-yellow-300 transition"
                  href="#contact" // Links to contact section ID
                >
                  Unlock Your Potential
                  <svg
                    className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          {/* End Card 2 */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default ComparisonSection;
