"use client"; // Required for useState and event handlers

import React, { useState } from "react";

// Interface for individual FAQ items (kept locally)
interface AccordionItemProps {
  id: number | string; // Unique identifier
  question: string;
  answer: string;
  defaultOpen?: boolean; // We'll use this only for INITIAL state
}

// FAQ data defined directly within the component
const faqItemsData: AccordionItemProps[] = [
  {
    id: 1,
    question: "How long does it take to build my new store?",
    answer:
      "For a typical store, we need about 2 to 2½ months. That time lets us learn your market, design a great layout, write clear product descriptions, migrate your items, and launch your site smoothly.",
  },
  {
    id: 2,
    question: "Will you handle migrating my store?",
    answer:
      "Yes—we migrate your entire store for free. Even for large catalogs, migration usually takes no more than 1 week.",
    defaultOpen: true, // This one will be open initially
  },
  {
    id: 3,
    question: "Will I get a dashboard and inventory management system?",
    answer:
      "Absolutely. Every custom store includes a dedicated dashboard with features like user-account management, inventory tracking, location settings, item creation, POS integration, and more.",
  },
  {
    id: 4,
    question: "Will my site show up on Google and other search engines?",
    answer:
      "Yes. Our SEO and copywriting experts make sure your site loads quickly and follows best practices so it's indexed easily. That means customers can find you when they search online.",
  },
  {
    id: 5,
    question: "Do you provide support for marketing my store?",
    answer:
      "Yes. We offer marketing support across platforms like Meta (Facebook & Instagram) and Google to help you reach more customers and grow your sales.",
  },
];

const FAQSection = () => {
  // State: Store the ID of the currently open item, or null if none are open.
  const [openItemId, setOpenItemId] = useState<string | number | null>(() => {
    // Calculate initial state based on defaultOpen
    const defaultOpenItem = faqItemsData.find((item) => item.defaultOpen);
    return defaultOpenItem ? defaultOpenItem.id : null;
  });

  // Function to toggle an item's open state
  // If the clicked item is already open, close it (set state to null).
  // If a different item is clicked, open it (set state to its id).
  const handleToggle = (id: string | number) => {
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
  };

  return (
    <div className="bg-neutral-900">
      <div className="max-w-5xl px-4 xl:px-0 pt-10 lg:pt-20 mx-auto">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Left Column: Title */}
            <div className="md:col-span-2">
              <div className="max-w-xs">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">
                  Frequently
                  <br />
                  asked questions
                </h2>
                <p className="mt-1 hidden md:block text-neutral-400">
                  Answers to the most frequently asked questions.
                </p>
              </div>
            </div>
            {/* End Left Column */}

            {/* Right Column: Accordion */}
            <div className="md:col-span-3">
              <div className="hs-accordion-group divide-y divide-neutral-400">
                {faqItemsData.map((item, idx) => {
                  const isOpen = openItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`hs-accordion${
                        idx === 0 ? " pt-0 pb-3" : " pt-6 pb-3"
                      }${isOpen ? " active" : ""}`}
                      id={`hs-basic-with-title-and-arrow-stretched-heading-${item.id}`}
                    >
                      <button
                        type="button"
                        className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-neutral-400 focus:outline-none focus:text-white"
                        aria-expanded={isOpen}
                        aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${item.id}`}
                        onClick={() => handleToggle(item.id)}
                      >
                        {item.question}
                        <svg
                          className={`transition-transform duration-300 shrink-0 size-5 text-white group-hover:text-gray-500 ${
                            isOpen ? "rotate-180" : ""
                          }`}
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
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        id={`hs-basic-with-title-and-arrow-stretched-collapse-${item.id}`}
                        className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300${
                          isOpen ? "" : " hidden"
                        }`}
                        role="region"
                        aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${item.id}`}
                      >
                        <div className="text-neutral-400 pb-3">
                          {typeof item.answer === "string" ? (
                            <p>{item.answer}</p>
                          ) : (
                            <div>{item.answer}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* End Right Column */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
