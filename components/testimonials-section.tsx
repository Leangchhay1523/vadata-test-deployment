import { Quote } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "VADATA helped me identify exactly who to talk to first. Within a week, I had validated my F&B concept with real feedback from Phnom Penh locals.",
    name: "Sokha Meas",
    role: "Founder, FreshBite Cambodia",
    avatar: "SM",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "As a student entrepreneur, I had no idea where to start. VADATA gave me confidence scores and specific locations to test my edtech idea.",
    name: "Rithy Chhan",
    role: "Student Founder, EduKhmer",
    avatar: "RC",
    gradient: "from-pink-500 to-cyan-400",
  },
  {
    quote:
      "The Cambodia-specific insights are invaluable. No other tool understands our local market like VADATA does.",
    name: "Leakhena Sar",
    role: "CEO, Agritech Solutions",
    avatar: "LS",
    gradient: "from-cyan-400 to-purple-500",
  },
  {
    quote:
      "VADATA helped me connect with the right suppliers and customers fast. It saved weeks of trial and error.",
    name: "Pisey Mao",
    role: "Founder, Urban Bites Cambodia",
    avatar: "PM",
    gradient: "from-purple-400 to-pink-300",
  },
  {
    quote:
      "The insights on local behavior were spot-on. I could validate my business idea without wasting resources.",
    name: "Sareth Nop",
    role: "Co-Founder, SkillUp Cambodia",
    avatar: "SN",
    gradient: "from-pink-300 to-cyan-400",
  },

  {
    quote:
      "VADATA made it simple to find the right audience. My launch in Phnom Penh was a success.",
    name: "Chan Dara",
    role: "Founder, Taste of Cambodia",
    avatar: "CD",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "The data-driven approach gave me clarity I couldn’t get anywhere else.",
    name: "Sopheak Lim",
    role: "Co-Founder, LearnKhmer",
    avatar: "SL",
    gradient: "from-pink-500 to-cyan-400",
  },
  {
    quote:
      "Understanding local preferences has never been easier thanks to VADATA.",
    name: "Rin Chhay",
    role: "CEO, AgroTech Hub",
    avatar: "RC2",
    gradient: "from-cyan-400 to-purple-500",
  },
  {
    quote: "Quick, insightful, and perfectly tailored to Cambodia’s market.",
    name: "Vannak Sok",
    role: "Entrepreneur, FreshStart",
    avatar: "VS",
    gradient: "from-purple-400 to-pink-300",
  },
];

export function TestimonialsSection() {
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const currentXRef = useRef(0);

  // Start infinite scroll animation - using 3 copies, animate to -33.33% and reset
  const startAnimation = async (fromX: number = currentXRef.current) => {
    // We have 3 copies of testimonials, so one full set is 33.33%
    const targetX = -33.33;
    const distance = Math.abs(targetX - fromX);
    const fullDistance = 33.33;

    // Calculate duration based on remaining distance to maintain constant speed
    const duration = (distance / fullDistance) * 6; // 6 seconds for full scroll

    // Animate to -33.33% (one complete set)
    await controls.start({
      x: `${targetX}%`,
      transition: { duration, ease: "linear" },
    });

    // Instantly reset to 0% - seamless because content is identical
    controls.set({ x: "0%" });
    currentXRef.current = 0;

    // Continue animation if not hovering
    if (!isHovering) {
      startAnimation(0);
    }
  };

  useEffect(() => {
    if (!isHovering) {
      startAnimation();
    }
    // Cleanup function
    return () => {
      controls.stop();
    };
  }, [isHovering]);

  const handleHoverStart = () => {
    setIsHovering(true);
    controls.stop();
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    // Resume animation from current position
    const currentElement = document.querySelector(
      ".testimonial-track",
    ) as HTMLElement;
    if (currentElement) {
      const transform = window.getComputedStyle(currentElement).transform;
      if (transform && transform !== "none") {
        const matrix = new DOMMatrix(transform);
        const containerWidth = currentElement.parentElement?.offsetWidth || 0;
        const currentXPercent = (matrix.m41 / containerWidth) * 100;
        currentXRef.current = currentXPercent;
        // Normalize to 0% to -33.33% range
        while (currentXRef.current <= -33.33) {
          currentXRef.current += 33.33;
        }
      }
    }
  };

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-900/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Cambodian Founders
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what early-stage founders are saying about VADATA
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-8 testimonial-track"
            animate={controls}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            initial={{ x: 0 }}
          >
            {testimonials
              .concat(testimonials)
              .concat(testimonials)
              .concat(testimonials)
              .map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full md:min-w-[33.333%] bg-card rounded-2xl p-8 border border-border hover:border-purple-500/30 transition-all duration-300"
                >
                  {/* Quote icon */}
                  <div
                    className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${testimonial.gradient} mb-6`}
                  >
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  {/* Quote text */}
                  <p className="text-foreground leading-relaxed mb-8">
                    {`"${testimonial.quote}"`}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
