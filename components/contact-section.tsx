"use client";

import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { GradientButton } from "./gradient-button";
import { Loader2 } from "lucide-react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const FORMSPREE_ID = "mbdgvdvn";

export function ContactSection() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const saveToDatabase = async (emailValue: string, messageValue: string) => {
    try {
      const { error } = await supabase.from("feedbacks").insert([
        {
          email: emailValue,
          message: messageValue,
        },
      ]);

      if (error) {
        console.error("Error saving to database:", error);
      }
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  useEffect(() => {
    if (state.succeeded) {
      saveToDatabase(email, message);

      setShowSuccess(true);
      setEmail("");
      setMessage("");
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, email, message]);

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-900/10 to-background" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* <div className="flex justify-center mb-4">
            <Image src={logo} alt="VADATA Logo" className="w-10 h-10" />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Have any questions or feedback?
          </h2>
          <p className="text-kmuted-foreground mb-8">
            Reach out to us via email or fill out the form below
          </p>
        </div>

        {/* Email Option */}
        <div className="text-center mb-12 pb-12 border-b border-border">
          <p className="text-foreground mb-2">
            Email us directly at:{" "}
            <a
              href="mailto:vadata.ai@gmail.com"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity"
            >
              vadata.ai@gmail.com
            </a>
          </p>
          <p className="text-muted-foreground text-sm">
            Or send us a message using the form below
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl shadow-cyan-500/5">
          {showSuccess && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              ✓ Thank you! We've received your message and will get back to you
              soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-3"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-3"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Submit Button */}
            <GradientButton
              type="submit"
              className="w-full justify-center"
              size="lg"
              disabled={state.submitting}
            >
              {state.submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </GradientButton>
          </form>
        </div>
      </div>
    </section>
  );
}
