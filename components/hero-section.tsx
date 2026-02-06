"use client";

import { VadataLogo } from "./vadata-logo";
import { GradientButton } from "./gradient-button";
import logo from "@/public/logo.png";
import Image from "next/image";

export function HeroSection({
  onValidateClick,
}: {
  onValidateClick?: () => void;
}) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-cyan-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
      {/* <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: "url('/2.png')",
          backgroundSize: "220px 220px",
        }}
      /> */}
      {/* <div className="absolute inset-0 bg-gray/30"></div> */}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        {/* <div className="flex justify-center mb-8">
          <div className="relative">
            <Image
              src={logo}
              alt="VADATA Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-30 blur-2xl" />
          </div>
        </div> */}

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
          Instant Business Clarity on the{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Cambodian Market
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          {/* VADATA gives instant market insights to validate startup ideas and
          reach the right customers in Cambodia */}
          VADATA provides answer to who are they, where are they in Cambodia and
          why them
        </p>

        {/* CTA */}
        <GradientButton size="lg" onClick={onValidateClick} showArrow={false}>
          Test Your Business Now
        </GradientButton>

        {/* Stats or trust indicators */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            {/* <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              500+
            </div> */}
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-sm text-muted-foreground">Founders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              1,200+
            </div>
            <div className="text-sm text-muted-foreground">Validations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
