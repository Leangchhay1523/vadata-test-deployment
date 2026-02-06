"use client";

import React from "react";

import { useState } from "react";
import { GradientButton } from "./gradient-button";
import {
  Loader2,
  ChevronDown,
  Check,
  Building2,
  Users,
  TriangleAlert,
  Network,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const sectors = [
  "Technology / Software",
  "F&B / Food & Beverages",
  "Healthcare",
  "Education / EdTech",
  "Agriculture / AgriTech",
  "Retail / E-commerce",
  "Finance / FinTech",
  "Logistics / Transportation",
  "Real Estate / Property",
  "Tourism / Hospitality",
  "Manufacturing",
  "Other",
];

const pricingModels = [
  "Subscription Model",
  "Freemium Model",
  "Usage-Based Model",
  "Commission Model",
  "Advertising Model",
  "Licensing Model",
  "Other",
];

interface ValidationFormProps {
  onSubmit: (data: {
    businessType: string;
    idea: string;
    sector: string;
    pricing: string;
  }) => void;
  isLoading?: boolean;
}

export function ValidationForm({
  onSubmit,
  isLoading = false,
}: ValidationFormProps) {
  const [businessType, setBusinessType] = useState<
    "B2B" | "B2C" | "B2B2C" | ""
  >("");
  const [idea, setIdea] = useState("");
  const [sector, setSector] = useState("");
  const [customSector, setCustomSector] = useState("");
  const [pricing, setPricing] = useState("");
  const [customPricing, setCustomPricing] = useState("");
  const otherOption = "Other";
  const [errors, setErrors] = useState({
    businessType: "",
    idea: "",
    sector: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalSector = sector === otherOption ? customSector : sector;
    const finalPricing = pricing === otherOption ? customPricing : pricing;

    let hasError = false;
    const newErrors = { businessType: "", idea: "", sector: "" };

    if (!businessType) {
      newErrors.businessType = "Please select a business type.";
      hasError = true;
    }
    if (!idea.trim()) {
      newErrors.idea = "Please enter your startup idea.";
      hasError = true;
    }
    if (!finalSector.trim()) {
      newErrors.sector = "Please select or enter your primary sector.";
      hasError = true;
    }

    console.log(
      `Submitting: {business: ${businessType}, idea: ${idea}, sector: ${finalSector}, pricing: ${finalPricing}`,
    );

    setErrors(newErrors);

    if (!hasError) {
      onSubmit({
        businessType,
        idea,
        sector: finalSector,
        pricing: finalPricing,
      });
    }
  };

  return (
    <section id="validate" className="py-24 relative ">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/10 to-background" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl shadow-purple-500/5">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Describe Your Business
            </h2>
            <p className="text-sm text-muted-foreground">
              {/* Get Cambodia-specific market insights */}
              Evaluate market potential in Phnom Penh and across Cambodia's
              provinces
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Type Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Who are you building for?
              </label>
              <div className={`grid grid-cols-3 gap-3`}>
                {/* B2B Card */}
                <button
                  type="button"
                  title="Selling products or services to other businesses."
                  onClick={() => {
                    setBusinessType("B2B");
                    setErrors({ ...errors, businessType: "" });
                  }}
                  className={`relative flex flex-col items-center p-4 rounded-xl border transition-all ${
                    businessType === "B2B"
                      ? "border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-400/10"
                      : "border-border bg-card hover:border-purple-500/30"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full mb-2 ${
                      businessType === "B2B"
                        ? "bg-purple-500/20"
                        : "bg-purple-500/10"
                    }`}
                  >
                    <Building2
                      className={`w-5 h-5 ${
                        businessType === "B2B"
                          ? "text-purple-500"
                          : "text-purple-500"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-sm font-semibold mb-0.5 ${
                      businessType === "B2B"
                        ? "text-foreground"
                        : "text-foreground"
                    }`}
                  >
                    B2B
                  </h3>
                  <p
                    className={`text-[11px] text-center ${
                      businessType === "B2B"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Selling to businesses
                  </p>
                </button>

                {/* B2C Card */}
                <button
                  type="button"
                  onClick={() => {
                    setBusinessType("B2C");
                    setErrors({ ...errors, businessType: "" });
                  }}
                  className={`relative flex flex-col items-center p-4 rounded-xl border transition-all ${
                    businessType === "B2C"
                      ? "border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-400/10"
                      : "border-border bg-card hover:border-purple-500/30"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full mb-2 ${
                      businessType === "B2C"
                        ? "bg-purple-500/20"
                        : "bg-purple-500/10"
                    }`}
                  >
                    <Users
                      className={`w-5 h-5 ${
                        businessType === "B2C"
                          ? "text-purple-500"
                          : "text-purple-500"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-sm font-semibold mb-0.5 ${
                      businessType === "B2C"
                        ? "text-foreground"
                        : "text-foreground"
                    }`}
                  >
                    B2C
                  </h3>
                  <p
                    className={`text-[11px] text-center ${
                      businessType === "B2C"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Selling to consumers
                  </p>
                </button>

                {/* B2B2C Card */}
                <button
                  type="button"
                  onClick={() => {
                    setBusinessType("B2B2C");
                    setErrors({ ...errors, businessType: "" });
                  }}
                  className={`relative flex flex-col items-center p-4 rounded-xl border transition-all ${
                    businessType === "B2B2C"
                      ? "border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-400/10"
                      : "border-border bg-card hover:border-purple-500/30"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full mb-2 ${
                      businessType === "B2B2C"
                        ? "bg-purple-500/20"
                        : "bg-purple-500/10"
                    }`}
                  >
                    <Network
                      className={`w-5 h-5 ${
                        businessType === "B2B2C"
                          ? "text-purple-500"
                          : "text-purple-500"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-sm font-semibold mb-0.5 ${
                      businessType === "B2B2C"
                        ? "text-foreground"
                        : "text-foreground"
                    }`}
                  >
                    B2B2C
                  </h3>
                  <p
                    className={`text-[11px] text-center ${
                      businessType === "B2B2C"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Businesses & consumers
                  </p>
                </button>
              </div>
              {errors.businessType && (
                <div className="text-sm text-red-500 mt-2 flex items-center gap-1">
                  {errors.businessType}
                </div>
              )}
            </div>

            {/* Startup Idea */}
            <div>
              <label
                htmlFor="idea"
                className="block text-sm font-medium text-foreground mb-3"
              >
                {"What's your startup idea?"}
              </label>
              <textarea
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                // placeholder="Describe your startup idea in a few sentences..."
                // placeholder="E.g. We help small shops in Cambodia understand customer demand using instant market data."
                placeholder={`"Google is the only search engine that organizes the world's information for billions of users."`}
                // placeholder="For [Target Market/Customer Segment] who [Statement of Need or Opportunity], the [Product/Service Name] is a [Product Category] that [Statement of Key Benefit/Compelling Reason to Buy]. Unlike [Primary Competitive Alternative], our product [Statement of Primary Differentiation]."
                rows={4}
                className={`w-full bg-input border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-none ${
                  errors.idea
                    ? "border-red-500 ring-1/2 ring-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-border focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500"
                }`}
              />
              <div className="text-sm text-red-500 mt-1">{errors.idea}</div>
            </div>

            {/* Primary Sector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Primary Sector
              </label>
              <Select.Root value={sector} onValueChange={setSector}>
                <Select.Trigger
                  className={cn(
                    "w-full bg-input border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-all appearance-none cursor-pointer flex items-center justify-between",
                    !sector && "text-muted-foreground",
                    errors.sector
                      ? "border-red-500 ring-1/2 ring-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-border focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500",
                  )}
                >
                  <Select.Value placeholder="Select a sector" />
                  <Select.Icon className="ml-2">
                    <ChevronDown className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50"
                    position="popper"
                    sideOffset={5}
                  >
                    <Select.Viewport className="p-2 max-h-64 overflow-y-auto">
                      {sectors.map((s) => (
                        <Select.Item
                          key={s}
                          value={s}
                          className="relative flex items-center px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 cursor-pointer rounded-lg 
             data-[highlighted]:bg-secondary/50 
             data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500/20 data-[state=checked]:via-pink-500/20 data-[state=checked]:to-cyan-400/20 
             transition-colors outline-none"
                        >
                          <Select.ItemText className="pl-8">
                            {s}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {sector === "Other" && (
                <input
                  type="text"
                  value={customSector}
                  onChange={(e) => setCustomSector(e.target.value)}
                  placeholder="Enter your sector..."
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all mt-3"
                  required
                />
              )}
              <div className="text-sm text-red-500 mt-1">{errors.sector}</div>
            </div>

            {/* Pricing Model */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Revenue Model Types (Optional)
              </label>
              <Select.Root value={pricing} onValueChange={setPricing}>
                <Select.Trigger
                  className={cn(
                    "w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none cursor-pointer flex items-center justify-between",
                    !pricing && "text-muted-foreground",
                  )}
                >
                  <Select.Value placeholder="Select a pricing model" />
                  <Select.Icon className="ml-2">
                    <ChevronDown className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50"
                    position="popper"
                    sideOffset={5}
                  >
                    <Select.Viewport className="p-2 max-h-64 overflow-y-auto">
                      {pricingModels.map((p) => (
                        <Select.Item
                          key={p}
                          value={p}
                          className="relative flex items-center px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 cursor-pointer rounded-lg 
             data-[highlighted]:bg-secondary/50 
             data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500/20 data-[state=checked]:via-pink-500/20 data-[state=checked]:to-cyan-400/20 
             transition-colors outline-none"
                        >
                          <Select.ItemIndicator className="absolute left-4 flex items-center justify-center">
                            <Check className="w-4 h-4 text-purple-500" />
                          </Select.ItemIndicator>
                          <Select.ItemText className="pl-8">
                            {p}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {pricing === otherOption && (
                <input
                  type="text"
                  value={customPricing}
                  onChange={(e) => setCustomPricing(e.target.value)}
                  placeholder="Enter your pricing model..."
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all mt-3"
                  required
                />
              )}
            </div>

            {/* Submit Button */}
            <GradientButton
              type="submit"
              className="w-full justify-center"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search in Cambodia"
              )}
            </GradientButton>
          </form>
        </div>
      </div>
    </section>
  );
}
