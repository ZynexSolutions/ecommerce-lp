"use client";

import React from "react";

import { TrendingUp, Globe } from "react-feather";

interface CaseStudy {
  id: string;
  IconComponent: React.FC<{ className?: string; style?: React.CSSProperties }>;
  iconColor: string;
  backgroundColor: string;
  statistic: string;
  title: string;
  description: string;
  link: string;
}

function BankNotes() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="rgba(244, 114, 182, 1.0)"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "conversions",
    IconComponent: TrendingUp,
    iconColor: "#22C55E",
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    statistic: "43%",
    title: "Boost in Conversions",
    description:
      "Experience a significant uplift in sales with custom site designs optimized for user experience and conversion pathways, averaging a 43% boost after migration.",
    link: "#contact",
  },
  {
    id: "cost-reduction",
    IconComponent: BankNotes,
    iconColor: "#F472B6",
    backgroundColor: "rgba(244, 114, 182, 0.2)",
    statistic: "70%",
    title: "Reduction in Monthly Charges",
    description:
      "Cut down on expensive monthly subscriptions and high transaction fees. On average, businesses save up to 70% in overhead costs by migrating to a custom e-commerce store.",
    link: "#contact",
  },
  {
    id: "organic-traffic",
    IconComponent: Globe,
    iconColor: "#6366F1",
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    statistic: "4X",
    title: "Increase in Organic Traffic",
    description:
      "Leverage advanced, tailored SEO strategies unavailable on standard platforms to dramatically improve search rankings and achieve up to a 4X increase in organic traffic.",
    link: "#contact",
  },
];

const CaseStudies = () => {
  return (
    <div className="bg-neutral-900 bg-linear-to-t from-black to-transparent">
      <div className="max-w-5xl px-4 xl:px-0 py-24 mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            Make your store <span className="text-[#ff0]"> sell 43% more </span>
            today
          </h2>
          <p className="mt-1 text-neutral-400">
            Save a significant portion of your monthly budget while increasing
            your sales conversions by 43%. Our team of experts will not only
            build a store that you and your audience will love, but also make
            sure it's fully optimized for sales and performance.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center border border-neutral-700 divide-y lg:divide-y-0 lg:divide-x divide-neutral-700 rounded-xl">
          {caseStudiesData.map((study) => (
            <a
              key={study.id}
              href={study.link}
              className="group relative z-10 p-4 md:p-6 h-full flex flex-col bg-neutral-900 focus:outline-none first:rounded-t-xl last:rounded-b-xl lg:first:rounded-l-xl lg:first:rounded-tr-none lg:last:rounded-r-xl lg:last:rounded-bl-none before:absolute before:inset-0 before:bg-gradient-to-b hover:before:from-transparent hover:before:via-transparent hover:before:to-[#ff0]/10 before:via-80% focus:before:from-transparent focus:before:via-transparent focus:before:to-[#ff0]/10 before:-z-1 last:before:rounded-b-xl lg:first:before:rounded-s-xl lg:last:before:rounded-e-xl lg:last:before:rounded-bl-none before:opacity-0 hover:before:opacity-100 focus:before:opacity-100"
            >
              <div className="mb-5">
                <div
                  className="relative rounded-full flex items-center justify-center w-12 h-12 mb-4" // Reduced width and height
                  style={{ backgroundColor: study.backgroundColor }}
                >
                  <study.IconComponent
                    className={`h-6 w-6`} // Reduced icon size
                    style={{ color: study.iconColor }}
                  />
                </div>
                <div className="mt-1 flex items-center">
                  <p className="font-semibold text-6xl text-white mr-4">
                    {study.statistic}
                  </p>
                </div>
                <h3 className="mt-5 font-medium text-lg text-white">
                  {study.title}
                </h3>
                <p className="mt-1 text-neutral-400">{study.description}</p>
              </div>
              <p className="mt-auto">
                <span className="font-medium text-sm text-[#ff0] pb-1 border-b-2 border-neutral-700 group-hover:border-[#ff0] group-focus:border-[#ff0] transition focus:outline-none">
                  <a href="#contact">Contact Us</a>
                </span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
