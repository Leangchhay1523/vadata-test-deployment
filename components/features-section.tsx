import Image from "next/image";
import { Map, Gauge, BarChart3 } from "lucide-react";

// random image paths first (replace with your real images later)
const featureImages = [
  "map-nobg.png",
  "confidence-nobg.png",
  "demographics.png",
];

const features = [
  {
    title: "Market Size Map",
    description:
      "See where demand is strongest across Cambodia. Explore market size by location so you can focus on the right cities and provinces.",
    icon: Map,
    gradient: "from-purple-500 to-pink-500",
    image: featureImages[0],
  },
  {
    title: "Demand Confidence Score",
    description:
      "Get a confidence score for your idea based on real signals like search interest, income levels, and customer urgency in Cambodia.",
    icon: Gauge,
    gradient: "from-pink-500 to-cyan-400",
    image: featureImages[1],
  },
  {
    title: "Customer Demographics",
    description:
      "Identify your ideal customer personas with demographic insights including urban/rural distribution, income sensitivity, and tech familiarity.",
    icon: BarChart3,
    gradient: "from-cyan-400 to-purple-500",
    image: featureImages[2],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Validate Fast
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            VADATA provides Cambodia-specific insights grounded in reliable
            local data sources
          </p>
        </div>

        {/* 3 rows */}
        <div className="space-y-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isReverse = index % 2 === 1; // 2nd row reversed

            return (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start md:items-center justify-between m-0`}
              >
                {/* Feature card */}
                <div
                  className={`${
                    isReverse ? "md:order-2" : "md:order-1"
                  } group relative bg-card rounded-2xl p-8 border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative gradient line */}
                  <div
                    className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                </div>

                {/* Image side */}
                <div
                  className={`${isReverse ? "md:order-1" : "md:order-2"} relative flex justify-center`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="object-contain scale-80"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
