// app/page.tsx
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import CaseStudies from "@/components/CaseStudies";

import StatsSection from "@/components/StatsSection";
import ApproachSection from "@/components/ApproachSection";
import ContactForm from "@/components/ContactForm"; // ContactForm includes its own title etc.
import FAQAccordion from "@/components/FAQAccordion"; // Adjust import path if needed
import TestimonialsGrid from "@/components/TestimonialsGrid";
import ComparisonSection from "@/components/ComparisonSection";

import TestimonialComplexGrid from "@/components/TestimonialComplexGrid";
import CaseStudySectionOne from "@/components/CaseStudySectionOne";

import CaseStudySectionTwo from "@/components/CaseStudySectionTwo";

export default function HomePage() {
  return (
    <main id="content">
      <HeroSection />
      <ClientLogos />
      <CaseStudies />

      {/* <Projects /> */}
      <div className="bg-neutral-900 bg-linear-to-t from-black to-transparent">
        <ComparisonSection />
        <StatsSection />
        <TestimonialsGrid />

        <CaseStudySectionOne />
        <CaseStudySectionTwo />

        <TestimonialComplexGrid />

        <ApproachSection />
        <FAQAccordion />
        {/* The ContactForm component now includes the title and grid structure */}
        <div className="bg-neutral-900">
          {" "}
          {/* Add the bg wrapper */}
          <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
