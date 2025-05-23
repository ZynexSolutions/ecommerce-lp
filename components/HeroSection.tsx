"use client";

import React, { useEffect } from "react"; // Removed useState
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useProtectedCalendlyRedirect } from "@/hooks/useProtectedCalendlyRedirect";

const HeroSection = () => {
  const controls = useAnimation();
  const avatarControls = useAnimation();
  const { triggerRedirect, isRedirecting, redirectError } = useProtectedCalendlyRedirect("hero_book_consultation");

  useEffect(() => {
    const arrowSequence = async () => {
      while (true) {
        await controls.start({
          translateX: 5,
          opacity: 1,
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" },
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
        await controls.start({
          translateX: -2,
          opacity: 0.8,
          scale: 0.98,
          transition: { duration: 0.2, ease: "easeInOut" },
        });
        await controls.start({
          translateX: 0,
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        });
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    };

    arrowSequence();

    const avatarSequence = async () => {
      while (true) {
        await avatarControls.start({
          scale: 1.05,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.4, ease: "easeInOut" },
        });
        await new Promise((resolve) => setTimeout(resolve, 800));
        await avatarControls.start({
          scale: 1,
          rotate: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        });
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    };

    avatarSequence();
  }, [controls, avatarControls]);

  return (
    <div className="bg-neutral-900 pb-8">
      <div className="max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-16 text-center">
        <h1 className="font-semibold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
          {/* Discover the Smart Way to Build a
          <span className="text-[#ff0]"> Custom Ecommerce Store.</span>{" "} */}
          Reduce your Monthly Ecommerce Costs by {" "}
          <span className="text-[#ff0]">Upto 70%</span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          ></motion.span>
        </h1>
        <div className="max-w-3xl mx-auto mt-6">
          {/* <div className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            Your brand is special, not just another template. Imagine designing
            your perfect online Ecommerce Store the Sckyrocket your sales.
            You're in charge, and it costs way less in the long run.
          </div> */}
          <div className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            We provide you a fully custom-made E-Commerce Stores which loads faster than any other store
            and it costs only a fraction of what you are already paying for your current platform.
          </div>
        </div>

        {/* Centered Sleek Button with More Noticeable Automatic Animation */}
        <div
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="mt-8 md:mt-10 flex flex-col items-center justify-center" // Added flex-col and items-center
        >
          <motion.button
            onClick={triggerRedirect}
            disabled={isRedirecting}
            className="group bg-[#f5f500] text-black font-medium px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 ease-in-out inline-flex items-center gap-2 md:gap-3 shadow-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50"
            style={{
              boxShadow: "0 6px 12px rgba(245, 245, 0, 0.5)",
            }}
          >
            {isRedirecting ? "Verifying..." : "Connect with Us"}
            <motion.div
              className="overflow-hidden relative w-6 h-6 md:w-7 md:h-7 flex items-center justify-center"
              animate={controls}
            >
              <ArrowRight
                size={20}
                className="absolute transition-transform duration-300"
              />
            </motion.div>
          </motion.button>
          {redirectError && (
            <p className="mt-4 text-red-500 text-sm">{redirectError}</p>
          )}
        </div>

        {/* Centered Avatar and Trustpilot below the button with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="mt-12 md:mt-8 flex items-center justify-center gap-6"
        >
          {/* Animated Avatars */}
          <motion.div animate={avatarControls} className="flex -space-x-3">
            <img
              src="/testimonial/img4.png"
              alt="user1"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <img
              src="/testimonial/img3.jpg"
              alt="user2"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <img
              src="/testimonial/img6.png"
              alt="user3"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <img
              src="/testimonial/img7.png"
              alt="user4"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
          </motion.div>

          <div className="w-px h-12 bg-gray-500 opacity-50"></div>

          {/* Trustpilot */}
          <div className="text-left">
            <div className="flex items-center gap-0">
              <span className="text-green-500 text-xl pr-1">★★★★★ </span>
              <span className="font-semibold text-white">
                {" " + "Trustpilot"}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">4.9</span> Average
              Ratings
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
