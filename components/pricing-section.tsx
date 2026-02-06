import { VadataLogo } from "./vadata-logo";
import { GradientButton } from "./gradient-button";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import Image from "next/image";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring market validation",
    features: [
      "Basic market insights",
      "1 validation per month",
      "Community support",
      "Cambodia market data",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$29",
    period: "per month",
    description: "For serious founders ready to validate",
    features: [
      "Advanced validation insights",
      "Unlimited validations",
      "Priority support",
      "Full analytics dashboard",
      "Google Maps visualization",
      "Export reports",
    ],
    cta: "Buy Now",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For organizations and accelerators",
    features: [
      "Everything in Premium",
      "Custom integrations",
      "Dedicated account manager",
      "Team collaboration",
      "API access",
      "Custom data sources",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-pink-900/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 border border-purple-500/50 backdrop-blur-sm">
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                ✨ Unofficial Pricing
              </span>
            </div>
          </div>
          {/* <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="VADATA Logo"
              className="w-12 h-12 opacity-60"
            />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your validation journey
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-900/30 to-card border-purple-500/50 scale-105 shadow-xl shadow-purple-500/20"
                  : "bg-card border-border hover:border-purple-500/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-4xl font-bold ${plan.highlighted ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent" : "text-foreground"}`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-muted-foreground dark:text-muted-foreground text-sm mt-2">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`p-1 rounded-full ${plan.highlighted ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-muted"}`}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.highlighted ? (
                <GradientButton
                  className="w-full justify-center"
                  showArrow={false}
                >
                  {plan.cta}
                </GradientButton>
              ) : (
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-border text-foreground hover:bg-secondary hover:text-foreground"
                >
                  {plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
