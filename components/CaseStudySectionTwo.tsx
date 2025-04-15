// components/CaseStudySectionTwo.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data (can be moved or fetched later if needed)
const caseStudyData = {
    label: "Client Success",
    title: "Streamlining Development Cycles by 25% with GitLab CI/CD",
    description: "For 'DevFlow Solutions', we implemented robust CI/CD pipelines using GitLab. This automated testing and deployment, significantly reducing manual errors and accelerating their time-to-market for new features.",
    // Added demo stats
    stats: [
        { value: "-65%", label: "Reduction in Monthly Charges" },
        { value: "90+", label: "SEO scores on all pages" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with relevant image
    imageAlt: "Code on a screen representing development workflow",
    linkHref: "#" // Replace with actual case study link later
};

const CaseStudySectionTwo = () => {
    // Remember to configure image hostname in next.config.js if using external URLs
    // module.exports = { images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] } };

    return (
        <div className="bg-neutral-900">
            <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-16 mx-auto"> {/* Slightly reduced padding */}
                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Content Column (Left) */}
                    <div className="space-y-4 md:space-y-6">
                        <p className="inline-block text-[#ff0] text-sm font-medium bg-[#ff0]/10 rounded-lg px-3 py-1">
                            {caseStudyData.label}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-semibold text-white">
                            {caseStudyData.title}
                        </h2>
                        <p className="text-neutral-400">
                            {caseStudyData.description}
                        </p>
                        {/* Stats Section */}
                        <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
                            {caseStudyData.stats.map((stat, index) => (
                                <div key={index} className="grow sm:grow-0">
                                    <p className="text-xl sm:text-2xl font-semibold text-[#ff0]">{stat.value}</p>
                                    <p className="text-xs sm:text-sm text-neutral-400 uppercase mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                        {/* End Stats Section */}
                        <div className='flex gap-6 items-center'>
                            {/* CTA Button Area - Pushed to bottom */}
                            <div className="mt-auto flex justify-end">
                                <Link
                                    className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff0]/50 focus:ring-offset-neutral-800 hover:bg-yellow-300 transition" // Adjusted offset color
                                    href="#contact" // Links to contact section ID
                                >
                                    Unlock Your Potential
                                    <svg className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            {/* <Link
                                className="group inline-flex items-center gap-x-2 font-medium text-sm text-[#ff0] decoration-2 hover:underline focus:outline-none focus:underline"
                                href={caseStudyData.linkHref}
                            >
                                Read case study
                                <svg className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </Link> */}
                        </div>
                    </div>
                    {/* End Content Column */}

                    {/* Image Column (Right) - Note: order changes implicitly on mobile, fixed by grid */}
                    <div>
                        <Image
                            className="w-full h-auto object-cover rounded-xl"
                            src={caseStudyData.imageUrl}
                            alt={caseStudyData.imageAlt}
                            width={800} // Adjust based on image aspect ratio
                            height={600} // Adjust based on image aspect ratio
                        />
                    </div>
                    {/* End Image Column */}

                </div>
                {/* End Grid */}
            </div>
        </div>
    );
};

export default CaseStudySectionTwo;