"use client";

import React, { useState, useEffect } from "react";
import { GradientButton } from "./gradient-button";
import { Loader2, Zap, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import logo from "@/public/logo.png";
import Image from "next/image";

export function EarlyAccessSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [signupCount, setSignupCount] = useState(0);
  const [error, setError] = useState("");
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  const fetchSignupCount = async () => {
    try {
      const { count } = await supabase
        .from("early_access_signups")
        .select("*", { count: "exact", head: true });
      if (count !== null) {
        setSignupCount(count);
      }
    } catch (err) {
      console.log("Could not fetch signup count");
    }
  };

  useEffect(() => {
    fetchSignupCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setAlreadySignedUp(false);

    try {
      // Check if email already exists
      const { data: existingEmail, error: queryError } = await supabase
        .from("early_access_signups")
        .select("email")
        .eq("email", email)
        .single();

      if (existingEmail) {
        setAlreadySignedUp(true);
        setIsLoading(false);
        // Hide message after 4 seconds
        setTimeout(() => setAlreadySignedUp(false), 4000);
        return;
      }

      if (queryError && queryError.code !== "PGRST116") {
        // PGRST116 is "no rows found" which is expected
        throw queryError;
      }

      // Email doesn't exist, so proceed with signup
      const { error: insertError } = await supabase
        .from("early_access_signups")
        .insert([{ name, email }]);

      if (insertError) {
        setError("Failed to signup. Please try again.");
        console.error("Supabase error:", insertError);
      } else {
        setShowSuccess(true);
        setName("");
        setEmail("");
        // Refresh the count to get the latest number
        await fetchSignupCount();

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="early-access" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Design Elements */}
          <div className="space-y-8">
            {/* FOMO Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Limited Early Access Spots
              </span>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get early access to{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  VADATA
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                You will get notified when our product MVP is launched. Be among
                the first to experience the power of market validation for your
                startup ideas.
              </p>
            </div>

            {/* Benefits */}
            {/* <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <span className="text-foreground">
                  ⚡ Priority Launch Access
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <span className="text-foreground">
                  🎁 Exclusive Early Bird Pricing
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <span className="text-foreground">👥 Join 500+ Founders</span>
              </div>
            </div> */}

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-muted-foreground">
                  Social Proof
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {signupCount}+
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  founders already waiting
                </span>
              </p>
            </div>
          </div>

          {/* Right Column - Signup Form */}
          <div>
            <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl shadow-purple-500/10">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Image src={logo} alt="VADATA Logo" className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold text-foreground text-center mb-2">
                Join the Waitlist
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Get priority access when we launch
              </p>

              {/* Signup Counter */}
              <div className="mb-6 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  Founders already in:
                </p>
                <p className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {signupCount} Early Adopters
                </p>
              </div>

              {showSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
                  ✓ Thanks for signing up! Check your email for updates.
                </div>
              )}

              {alreadySignedUp && (
                <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm text-center">
                  🎉 You're already on our checklist! We'll notify you when we
                  launch.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    required
                  />
                </div>

                {/* Submit Button */}
                <GradientButton
                  type="submit"
                  className="w-full justify-center"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "Get Early Access"
                  )}
                </GradientButton>

                <p className="text-xs text-muted-foreground text-center">
                  We'll never share your email.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
