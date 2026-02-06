"use client";

import { CircuitBoard } from "lucide-react";

interface LeanCanvasProps {
  idea: string;
  sector: string;
  founderType: string;
}

export function LeanCanvas({ idea, sector, founderType }: LeanCanvasProps) {
  // Mock LEAN Canvas data based on input
  const canvasData = {
    problem: [
      "Limited access to market validation tools for local startups",
      "Uncertainty about target customers and willingness to pay",
      "Lack of Cambodia-specific business insights",
    ],
    existingAlternatives: [
      "Generic market research platforms",
      "Manual surveys and interviews",
      "Consulting services (expensive)",
    ],
    solution: [
      "AI-powered market analysis tailored to Cambodia",
      "Quick startup idea validation framework",
      "Local data-driven customer targeting",
    ],
    keyMetrics: [
      "Customer Acquisition Cost (CAC)",
      "Validation Success Rate",
      "Time to First Customer",
    ],
    uniqueValueProposition:
      "Know Who to Validate With Before You Build - Cambodia's only AI-powered market validation for early-stage founders",
    highLevelConcept: "AI-driven market validation for Cambodian startups",
    unfairAdvantage:
      "Deep integration with local data, community relationships with Cambodian founders, and region-specific market knowledge",
    channels: [
      "Facebook Groups & Communities",
      "Startup Incubators",
      "Direct Outreach to Founders",
      "LinkedIn Professional Network",
    ],
    earlyAdapters: [
      "Startup Founders in Cambodia",
      "Entrepreneurs Seeking Market Validation",
      "Small Business Owners Exploring New Ideas",
    ],
    customerSegments: [
      founderType === "B2B"
        ? "Small Business Owners & Startups"
        : "Young Professionals & Students",
      "Tech Entrepreneurs",
      "First-time Founders",
    ],
    costStructure: [
      "AI/ML Model Training & Maintenance",
      "Data Acquisition (Local Sources)",
      "Community Building & Support",
    ],
    revenueStreams: [
      "Freemium Model (Basic Validation)",
      "Premium Subscription ($10-50/month)",
      "Enterprise Partnerships",
    ],
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400">
          <CircuitBoard className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">LEAN Canvas</h3>
      </div>

      {/* Main Canvas Grid */}
      <div className="space-y-6">
        {/* Row 1: Problem, Solution, Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Problem Section (left column) - contains 'Problem' and 'Existing Alternative' */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex flex-col gap-6">
            <div>
              <h4 className="font-semibold text-red-400 mb-3 text-sm uppercase">
                Problem
              </h4>
              <ul className="space-y-2">
                {canvasData.problem.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-red-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Existing Alternative subsection (under Problem) */}
            <div>
              <h4 className="font-semibold text-red-400 mb-3 text-sm uppercase">
                Existing Alternative
              </h4>
              <ul className="space-y-2">
                {canvasData.existingAlternatives.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-red-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {" "}
            {/* Solution Section (center-left) */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-green-400 mb-3 text-sm uppercase">
                Solution
              </h4>
              <ul className="space-y-2">
                {canvasData.solution.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-green-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Key Metrics Section (below Solution) */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex-1">
              <h4 className="font-semibold text-purple-400 mb-3 text-sm uppercase">
                Key Metrics
              </h4>
              <ul className="space-y-2">
                {canvasData.keyMetrics.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2: UVP (Center) */}
          <div className="flex flex-col gap-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-400/10 border border-purple-500/30 rounded-xl p-4">
            <div>
              <h4 className="font-semibold text-pink-400 mb-2 text-sm uppercase">
                Unique Value Proposition
              </h4>
              <p className="text-sm text-foreground">
                {canvasData.uniqueValueProposition}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-pink-400 mb-2 text-sm uppercase">
                High Level Concept
              </h4>
              <p className="text-sm text-foreground">
                {canvasData.highLevelConcept}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {" "}
            {/* Unfair Advantage (top) */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-blue-400 mb-2 text-sm uppercase">
                Unfair Advantage
              </h4>
              <p className="text-sm text-foreground">
                {canvasData.unfairAdvantage}
              </p>
            </div>
            {/* Channels (below Unfair Advantage) */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-orange-400 mb-3 text-sm uppercase">
                Channels
              </h4>
              <ul className="space-y-2">
                {canvasData.channels.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-orange-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Customer Segments and Early Adapters */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 flex flex-col gap-6">
            {/* Customer Segments (top of right column) */}
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3 text-sm uppercase">
                Customer Segments
              </h4>
              <ul className="space-y-2">
                {canvasData.customerSegments.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Early Adapters (below Customer Segments) */}
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3 text-sm uppercase">
                Early Adapters
              </h4>
              <ul className="space-y-2">
                {canvasData.earlyAdapters.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Row 5: Cost Structure & Revenue Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cost Structure */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-red-400 mb-3 text-sm uppercase">
              Cost Structure
            </h4>
            <ul className="space-y-2">
              {canvasData.costStructure.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-foreground flex items-start gap-2"
                >
                  <span className="text-red-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Revenue Streams */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-green-400 mb-3 text-sm uppercase">
              Revenue Streams
            </h4>
            <ul className="space-y-2">
              {canvasData.revenueStreams.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-foreground flex items-start gap-2"
                >
                  <span className="text-green-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      {/* <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border/50">
        <p className="text-xs text-muted-foreground">
          💡 <span className="font-semibold">Tip:</span> Use this LEAN Canvas as
          a starting point for your business model. Validate each section
          through customer interviews and iterate based on feedback.
        </p>
      </div> */}
    </div>
  );
}
