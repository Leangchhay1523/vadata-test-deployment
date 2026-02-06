"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ValidationForm } from "@/components/validation-form";
import { FeaturesSection } from "@/components/features-section";
import { EarlyAccessSection } from "@/components/early-access-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { LogoLoader } from "@/components/loader";
import { AdvancedLoader } from "@/components/advanced-loader";

interface ValidationData {
  businessType: string;
  idea: string;
  sector: string;
  pricing?: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const validationRef = useRef<HTMLDivElement>(null);

  const scrollToValidation = () => {
    validationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleValidationSubmit = async (data: ValidationData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store validation data in sessionStorage
    sessionStorage.setItem("validationData", JSON.stringify(data));

    setIsLoading(false);

    // Route to dashboard page
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-background">
      <Header onValidateClick={scrollToValidation} />
      <div className="animate-fade-up">
        <HeroSection onValidateClick={scrollToValidation} />
      </div>
      <div ref={validationRef} className="animate-fade-up animate-delay-100">
        <ValidationForm
          onSubmit={handleValidationSubmit}
          isLoading={isLoading}
        />
      </div>
      {/* <div className="border border-solid flex items-center justify-center">
        <LogoLoader />
      </div> */}
      <div className="animate-fade-up animate-delay-200">
        <FeaturesSection />
      </div>
      <div className="animate-fade-up animate-delay-300">
        <EarlyAccessSection />
      </div>
      {/* <PricingSection /> */}
      <div className="animate-fade-up animate-delay-400">
        <TestimonialsSection />
      </div>
      {/* <ContactSection /> */}
      <div className="animate-fade-up animate-delay-500">
        <Footer />
      </div>
    </main>
  );
}
