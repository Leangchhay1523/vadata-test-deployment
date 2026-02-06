"use client";

import { useState } from "react";
import { VadataLogo } from "./vadata-logo";
import { GradientButton } from "./gradient-button";
import logo from "@/public/logo.png";
import Image from "next/image";
import { MarketFitMap } from "./market-fit-map";
import { LeanCanvas } from "./lean-canvas";
import {
  TrendingUp,
  Users,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Zap,
  Building2,
  User,
  Smartphone,
  Facebook,
  MessageCircle,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface InsightDashboardProps {
  data: {
    founderType: string;
    idea: string;
    sector: string;
  };
  onValidateAgain: () => void;
}

// Mock data generator based on input
function generateInsights(data: {
  founderType: string;
  idea: string;
  sector: string;
}) {
  const isB2B = data.founderType === "B2B";

  // Demand confidence based on sector
  const confidenceLevels = {
    "Technology / Software": { level: "High", score: 85 },
    "F&B / Food & Beverages": { level: "High", score: 82 },
    Healthcare: { level: "Medium", score: 68 },
    "Education / EdTech": { level: "High", score: 88 },
    "Agriculture / AgriTech": { level: "Medium", score: 72 },
    "Retail / E-commerce": { level: "High", score: 80 },
    "Finance / FinTech": { level: "Medium", score: 65 },
    "Logistics / Transportation": { level: "Medium", score: 70 },
    "Real Estate / Property": { level: "Low", score: 45 },
    "Tourism / Hospitality": { level: "Medium", score: 60 },
    Manufacturing: { level: "Low", score: 48 },
    Other: { level: "Medium", score: 55 },
  };

  const confidence = confidenceLevels[
    data.sector as keyof typeof confidenceLevels
  ] || { level: "Medium", score: 55 };

  const personas = isB2B
    ? [
        {
          role: "Small Business Owners",
          demographic: "Urban, Phnom Penh-based, tech-familiar",
          pain: "Struggle with operational efficiency and lack affordable tech solutions",
          source: "DataEF SME Registry",
          sourceUrl:
            "https://data.opendevelopmentcambodia.net/dataset/registered-businesses",
        },
        {
          role: "Corporate Decision Makers",
          demographic: "Mid-large enterprises, budget-conscious, ROI-focused",
          pain: "Need proven solutions with local support and customization",
          source: "ODC Business Survey 2024",
          sourceUrl:
            "https://opendevelopmentcambodia.net/topics/economy-and-commerce",
        },
        {
          role: "Startup Founders",
          demographic: "Urban, high tech familiarity, early adopters",
          pain: "Limited access to specialized tools and resources",
          source: "Khmer Enterprise Startup Ecosystem Report",
          sourceUrl: "https://www.khmerenterprise.info/reports",
        },
      ]
    : [
        {
          role: "Young Urban Professionals",
          demographic: "18-35, urban, middle income, high smartphone usage",
          pain: "Seeking convenience, quality, and modern experiences",
          source: "Cambodia Socio-Economic Survey (CSES) 2023",
          sourceUrl:
            "https://www.nis.gov.kh/index.php/en/14-cses/12-cambodia-socio-economic-survey-reports",
        },
        {
          role: "University Students",
          demographic:
            "18-24, tech-savvy, price-sensitive, social media active",
          pain: "Limited budget but high demand for quality and accessibility",
          source: "Ministry of Education Statistics",
          sourceUrl: "https://www.moeys.gov.kh/en/emis",
        },
        {
          role: "Middle-Class Families",
          demographic: "Urban/semi-urban, dual income, value-conscious",
          pain: "Balancing quality with affordability for family needs",
          source: "ODC Population Census Data",
          sourceUrl:
            "https://opendevelopmentcambodia.net/topics/population-and-censuses",
        },
      ];

  const channels = isB2B
    ? [
        {
          name: "LinkedIn Cambodia",
          type: "online",
          description:
            "Active professional network with 200K+ Cambodian members, ideal for B2B outreach",
        },
        {
          name: "Cambodia Business Forums",
          type: "online",
          description:
            "Facebook groups like 'Cambodia Business Network' with 50K+ active members",
        },
        {
          name: "Chamber of Commerce Events",
          type: "offline",
          description: "Regular networking events in Phnom Penh and Siem Reap",
        },
        {
          name: "Startup Incubators",
          type: "offline",
          description:
            "Impact Hub, SmallWorld, and university innovation centers",
        },
      ]
    : [
        {
          name: "Facebook Groups",
          type: "online",
          description:
            "Cambodia has 10M+ FB users. Target niche groups related to your sector",
        },
        {
          name: "Telegram Channels",
          type: "online",
          description:
            "Growing platform for communities, deals, and local news sharing",
        },
        {
          name: "Universities & Colleges",
          type: "offline",
          description:
            "RUPP, NUM, and private universities - ideal for student testing",
        },
        {
          name: "Coffee Shops & Co-working",
          type: "offline",
          description:
            "Brown Coffee, Tribe, and local cafes where target users gather",
        },
      ];

  const questions = [
    "Can you walk me through the last time you experienced this problem? What did you do?",
    "What solutions have you tried before? What worked and what didn't?",
    "On a scale of 1-10, how urgent is solving this problem for you right now?",
    "If a solution existed today, what would you be willing to pay for it?",
    "Who else in your network faces this same challenge?",
  ];

  return { confidence, personas, channels, questions };
}

export function InsightDashboard({
  data,
  onValidateAgain,
}: InsightDashboardProps) {
  const [feedback, setFeedback] = useState("");
  const insights = generateInsights(data);

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getConfidenceIcon = (level: string) => {
    switch (level) {
      case "High":
        return <CheckCircle2 className="w-6 h-6 text-green-400" />;
      case "Medium":
        return <AlertCircle className="w-6 h-6 text-yellow-400" />;
      case "Low":
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  function confidenceColor(score: number) {
    if (score >= 75) return "#00C950"; // High
    if (score >= 50) return "#F0B100"; // Medium
    if (score >= 25) return "#00B8DB"; // Low
    return "#2B7FFF"; // Very low
  }

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-background to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mock Data Notice */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <span className="font-semibold">Testing Mode:</span> This dashboard
            displays mock data for testing purposes only.
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="VADATA Logo" className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Your Validation{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-muted-foreground">
            {data.founderType && `${data.founderType} | `} {data.sector}
          </p>
        </div>

        {/* 1. Demand Confidence */}

        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Demand Confidence
            </h3>
          </div>

          <div className="flex items-center gap-4 mb-4">
            {getConfidenceIcon(insights.confidence.level)}

            <div>
              <span
                className={`text-2xl font-bold ${getConfidenceColor(insights.confidence.level)}`}
              >
                {insights.confidence.level}
              </span>
              {/* <span className="text-muted-foreground ml-2">
                ({insights.confidence.score}% confidence score)
              </span> */}
            </div>

            {/* Gauge added */}
            <div className="w-20 h-20">
              <CircularProgressbar
                value={insights.confidence.score}
                text={`${insights.confidence.score}%`}
                styles={buildStyles({
                  pathColor: "url(#gradient)",
                  trailColor: "#eee",
                  textColor: "#000",
                  textSize: "24px",
                })}
              />
              <svg style={{ height: 0 }}>
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on Cambodia economic indicators from DataEF and sector
              analysis, your {data.sector.toLowerCase()} idea shows{" "}
              {insights.confidence.level.toLowerCase()} demand potential.
              {insights.confidence.level === "High" &&
                " The local market shows strong problem urgency and willingness to pay for solutions in this space."}
              {insights.confidence.level === "Medium" &&
                " There is moderate interest, but validation with target users is crucial to confirm product-market fit."}
              {insights.confidence.level === "Low" &&
                " Consider pivoting or conducting deeper research to identify a more urgent pain point."}
            </p>
          </div>
        </div>

        {/* 2. Likely Target Users */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-400">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Likely Target Users
            </h3>
          </div>

          <div className="grid gap-4">
            {insights.personas.map((persona, index) => (
              <div
                key={index}
                className="bg-secondary/30 rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${
                      index === 0
                        ? "from-purple-500 to-pink-500"
                        : index === 1
                          ? "from-pink-500 to-cyan-400"
                          : "from-cyan-400 to-purple-500"
                    }`}
                  >
                    {index === 0 ? (
                      <User className="w-4 h-4 text-white" />
                    ) : index === 1 ? (
                      <Building2 className="w-4 h-4 text-white" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {persona.role}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {persona.demographic}
                    </p>
                    <p className="text-sm text-foreground mt-2">
                      <Zap className="w-3 h-3 inline mr-1 text-yellow-400" />
                      {persona.pain}
                    </p>
                    <a
                      href={persona.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:text-pink-400 mt-2 inline-flex items-center gap-1 transition-colors"
                    >
                      Resource: {persona.source}
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Map-Based Market Fit Visualization */}
        <MarketFitMap sector={data.sector} showRecommendedList={false} />

        {/* 4. Where to Reach Users */}
        <div className="bg-card rounded-2xl p-6 border border-border mt-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Where to Reach Users
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {insights.channels.map((channel, index) => (
              <div
                key={index}
                className="bg-secondary/30 rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  {channel.type === "online" ? (
                    channel.name.includes("Facebook") ? (
                      <Facebook className="w-4 h-4 text-blue-400" />
                    ) : channel.name.includes("Telegram") ? (
                      <MessageCircle className="w-4 h-4 text-cyan-400" />
                    ) : channel.name.includes("LinkedIn") ? (
                      <Briefcase className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                    )
                  ) : channel.name.includes("Universit") ? (
                    <GraduationCap className="w-4 h-4 text-pink-400" />
                  ) : (
                    <Building2 className="w-4 h-4 text-cyan-400" />
                  )}
                  <h4 className="font-semibold text-foreground text-sm">
                    {channel.name}
                  </h4>
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      channel.type === "online"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-cyan-500/20 text-cyan-300"
                    }`}
                  >
                    {channel.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {channel.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Validation Interview Questions */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Validation Interview Questions
            </h3>
          </div>

          <div className="space-y-3">
            {insights.questions.map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4 border border-border/50"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-foreground">{question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. LEAN Business Model Canvas */}
        <LeanCanvas
          idea={data.idea}
          sector={data.sector}
          founderType={data.founderType}
        />

        {/* 7. Feedback Section */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Your Feedback
            </h3>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Share your evaluation of the website or platform. Your feedback
            helps us improve VADATA.
          </p>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What do you think about the insights provided? Any suggestions for improvement?"
            rows={4}
            className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none mb-6"
          />

          {/* Validate Again CTA */}
          <GradientButton
            size="lg"
            onClick={onValidateAgain}
            className="w-full justify-center"
          >
            Validate Again
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
