// components/TestimonialsGrid.tsx
import React from "react";
import Image from "next/image"; // For potential avatars
import { QuoteIcon } from "@/components/SvgPatterns/logo";

// Local data for the testimonials
const testimonialData = [
  {
    id: 1,
    quote:
      "Zynex migrated our entire product catalog from WooCommerce to a headless setup using Next.js and Medusa. Our Lighthouse score went from 62 to 98.",
    name: "Sethil Raj J.",
    title: "Director, Synergys Primex",
    avatarUrl: "/testimonial/img8.png", // Example avatar
  },
  {
    id: 2,
    quote:
      "By partnering up with Zynex, we were able to improve our conversion rates by 60% with the number of customers growing every day. Very satisfied with their work.",
    name: "Pranshu Jha.",
    title: "CEO, Innovate Solutions",
    avatarUrl: "/testimonial/img7.png", // Example avatar
  },
  // Add more testimonials here if needed, they will wrap in the grid
];

// Helper component for the quote SVG for cleaner code

const TestimonialsGrid = () => {
  // Configure image hostname in next.config.js if using external URLs like unsplash
  // module.exports = { images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] } };

  return (
    <div className="">
      <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
        {/* Title */}
        <div className="max-w-3xl mb-10 lg:mb-14 mx-auto text-center">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            Client experiences
          </h2>
          <p className="mt-1 text-neutral-400">
            Hear directly from those who've partnered with us and achieved
            remarkable results.
          </p>
        </div>
        {/* End Title */}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonialData.map((testimonial) => (
            // Testimonial Card
            <div
              key={testimonial.id}
              className="relative flex flex-col bg-neutral-900 border border-neutral-700 shadow-sm rounded-xl p-6 lg:p-8"
            >
              <QuoteIcon /> {/* Decorative quote icon */}
              <div className="flex-grow pt-8">
                {" "}
                {/* Add padding top to avoid overlap with quote icon */}
                <p className="text-lg lg:text-xl text-neutral-200 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              {/* Footer / Attribution */}
              <footer className="mt-6 pt-5 border-t border-neutral-700/50 flex items-center gap-x-3">
                <Image
                  className="size-10 rounded-full object-cover"
                  src={testimonial.avatarUrl}
                  alt={`Avatar of ${testimonial.name}`}
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {testimonial.title}
                  </div>
                </div>
              </footer>
            </div>
            // End Testimonial Card
          ))}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default TestimonialsGrid;
