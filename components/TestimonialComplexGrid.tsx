// components/TestimonialComplexGrid.tsx
import React from "react";
import Image from "next/image";
const testimonialData = [
  {
    id: 1,
    quote:
      "We were stuck with a clunky Shopify template. Zynex Solutions rebuilt our site from scratch, and within 2 months, Our store now looks better than ever and I can have all the features I need.",
    name: "Aarav Mehta",
    title: "@aaravmehta",
    avatarUrl: "/testimonial/aimg.png",
    hasGlow: true,
  },
  {
    id: 2,
    quote:
      "We used to run our store with Amazon Marketplace, but it costed a significant portion of our revenue. With our new store, we are free from vendor charges and the monthly charges are very minimal. Very impressed with the new store.",
    name: "Naveed Shariff",
    title: "@naveedshariff",
    avatarUrl: "/testimonial/img3.jpg",
  },
  {
    id: 3,
    quote:
      "The level of communication and organization from Zynex was outstanding. They were always punctual, responsive, and kept us informed every step of the way.",
    name: "Priya Iyer",
    title: "@priyaiyer",
    avatarUrl: "/testimonial/img5.png",
  },
  {
    id: 4,
    quote:
      "The team at Zynex truly listened to our needs and built us an ecommerce solution that's both powerful and cost-effective. Highly impressed!",
    name: "Arnold Simon.",
    title: "@driesvincent",
    avatarUrl: "/testimonial/img6.png",
  },
  {
    id: 5,
    quote:
      "Our store would lag during traffic spikes, especially during sales. Zynex built a high-performance platform optimized for speed. Now, even during peak times, everything runs smoothly—and our conversion rate jumped",
    name: "Leonard K.",
    title: "@leonardkrasner",
    avatarUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=320&h=320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    quote:
      "I contacted them regarding a relative's ecommerce business. Zynex offered us a free consultation and a report showing how they could help us. By partnering up with Zynex, we were able to improve our conversion rates by 60% with the number of customers growing every day. Very satisfied with their work.",
    name: "Mounika G.",
    title: "@mounikag",
    avatarUrl: "/testimonial/img4.png",
  },
  {
    id: 7,
    quote:
      "Most of our users come from mobile, but our site wasn’t mobile-friendly. Zynex rebuilt it from scratch with a mobile-first approach, and it looks stunning on any device. We saw a 70% increase in mobile sales within the first month",
    name: "Gokul Prithiv.",
    title: "@gokulprithiv",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=320&h=320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    quote:
      "We had to rely on developers for every minor update, which slowed us down. Zynex gave us an intuitive backend that anyone on our team can use. We’re way more agile now",
    name: "Rajeev M.",
    title: "@rajeevmenon",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=320&h=320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    quote:
      "Our old store needed tons of paid plugins to function well. Zynex created a tailor-made solution with all features baked in—no more monthly plugin charges. It’s streamlined and way more cost-efficient.",
    name: "Ravi Rohith A.",
    title: "@ravirohith",
    avatarUrl: "/testimonial/img2.png",
    hasGlow: true,
  },
];

const TestimonialComplexGrid = () => {
  // Hostname config for next/image still needed if using external URLs
  // module.exports = { images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] } };

  return (
    <div className="bg-neutral-900 overflow-hidden">
      {" "}
      {/* Added overflow-hidden for glows */}
      {/* Using container for centering but allowing wider content, adjust max-w if needed */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        {/* Title */}
        <div className="max-w-2xl mb-10 lg:mb-14 mx-auto text-center">
          <p className="inline-block bg-[#ff0]/10 text-[#ff0] text-xs font-medium rounded-lg px-3 py-1 mb-3">
            Testimonials
          </p>
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            We have worked with thousands of amazing people
          </h2>
        </div>
        {/* End Title */}

        {/* Masonry Column Layout */}
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          {testimonialData.map((testimonial) => (
            // Wrapper div for potential glow effect
            <div key={testimonial.id} className="relative break-inside-avoid">
              {" "}
              {/* break-inside-avoid is crucial for columns */}
              {/* Conditional Background Glow */}
              {testimonial.hasGlow && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 w-60 h-60 bg-[#ff0] rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-15" // Centered, blurred, yellow, low opacity
                />
              )}
              {/* Testimonial Card Content */}
              <div className="flex flex-col bg-neutral-800 border-2 border-neutral-700 hover:border-[#ff0]/50 transition-colors shadow-sm rounded-xl p-5 lg:p-6 h-full">
                {" "}
                {/* Slightly reduced padding */}
                {/* Quote */}
                <blockquote className="flex-grow mb-4">
                  <p className="text-base lg:text-md text-neutral-200 leading-relaxed">
                    "{testimonial.quote}" {/* Added quotes */}
                  </p>
                </blockquote>
                {/* Footer / Attribution */}
                <footer className="flex items-center gap-x-3">
                  <Image
                    className="size-9 rounded-full object-cover" // Slightly smaller avatar
                    src={testimonial.avatarUrl}
                    alt={`Avatar of ${testimonial.name}`}
                    width={36} // Match size
                    height={36} // Match size
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
              {/* End Testimonial Card Content */}
            </div>
            // End Wrapper Div
          ))}
        </div>
        {/* End Masonry Column Layout */}
      </div>
    </div>
  );
};

export default TestimonialComplexGrid;
