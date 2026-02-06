"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { InsightDashboard } from "@/components/insight-dashboard";
import { Footer } from "@/components/footer";

interface ValidationData {
  founderType: string;
  idea: string;
  sector: string;
  pricing?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [validationData, setValidationData] = useState<ValidationData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get validation data from sessionStorage or URL params
    const storedData = sessionStorage.getItem("validationData");
    if (storedData) {
      setValidationData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  const handleValidateAgain = () => {
    // Clear stored data and go back to home
    sessionStorage.removeItem("validationData");
    router.push("/#validate");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-purple-500/50 border-t-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your insights...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!validationData) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Validation Data Found
            </h2>
            <p className="text-muted-foreground mb-6">
              Please validate your idea first to view your insights.
            </p>
            <button
              onClick={() => router.push("/#validate")}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300"
            >
              Validate Now
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <InsightDashboard
          data={validationData}
          onValidateAgain={handleValidateAgain}
        />
      </div>
      <Footer />
    </main>
  );
}
