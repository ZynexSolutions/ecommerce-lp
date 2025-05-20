"use client"; // Ensure client component
import React from "react";
import Image from "next/image";
import { useProtectedCalendlyRedirect } from "@/hooks/useProtectedCalendlyRedirect";
import { ArrowRight } from "lucide-react"; // For a consistent icon

const ApproachSection = () => {
  const { triggerRedirect, isRedirecting, redirectError } = useProtectedCalendlyRedirect("approach_schedule_call");

  return (
    <div id="our-approach" className="bg-neutral-900">
      <div className="max-w-5xl px-4 xl:px-0 py-10 lg:pt-20 mx-auto">
        {/* Title */}
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            Our approach
          </h2>
          <p className="mt-1 text-neutral-400">
            At Zynex Solutions, we initiate every partnership with an in-depth
            consultation to meticulously analyze your business challenges and
            objectives.
          </p>
        </div>
        {/* End Title */}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            {/* Replace with your image */}
            <Image
              className="w-full h-full object-cover rounded-xl" // Added h-full
              src="https://images.unsplash.com/photo-1587614203976-365c74645e83?q=80&w=480&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Approach planning session"
              width={480} // Adjust based on your image aspect ratio
              height={600} // Adjust based on your image aspect ratio
              // Consider adding 'sizes' attribute
            />
          </div>
          {/* End Col */}

          {/* Timeline */}
          <div>
            {/* Heading */}
            <div className="mb-4">
              <h3 className="text-[#ff0] text-xs font-medium uppercase">
                Steps
              </h3>
            </div>
            {/* End Heading */}

            {/* Item 1 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">
                    1
                  </span>
                </div>
              </div>
              {/* End Icon */}
              {/* Right Content */}
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-white">Initial Consultation : </span>
                  Comprehensive assessment of your business specific needs and
                  problem identification.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 1 */}

            {/* Item 2 */}
            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">
                    2
                  </span>
                </div>
              </div>
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-white">
                    Market Research & Analysis :{" "}
                  </span>
                  Identify target demographics and analyze their digital
                  behaviors and preferences.
                </p>
              </div>
            </div>
            {/* End Item 2 */}

            {/* Item 3 */}
            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">
                    3
                  </span>
                </div>
              </div>
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-white">
                    Custom Store Development :{" "}
                  </span>
                  Engineering tailored digital commerce solutions aligned with
                  specific requirements of your Business.
                </p>
              </div>
            </div>
            {/* End Item 3 */}

            {/* Item 4 */}
            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">
                    4
                  </span>
                </div>
              </div>
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-white">Launch and Optimization : </span>
                  Platform launch with continuous performance monitoring and
                  feedback integration.
                </p>
              </div>
            </div>
            {/* End Item 4 */}
            <div className="mt-6"> {/* Added a div wrapper for button and error message */}
              <button
                onClick={triggerRedirect}
                disabled={isRedirecting}
                className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-hidden disabled:opacity-50"
              >
                {isRedirecting ? "Processing..." : "Connect with Us"}
                <ArrowRight className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
              </button>
              {redirectError && (
                <p className="mt-2 text-red-500 text-xs">{redirectError}</p>
              )}
            </div>
          </div>
          {/* End Timeline */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default ApproachSection;
