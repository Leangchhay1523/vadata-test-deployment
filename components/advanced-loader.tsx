"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import logo pieces
import piece1 from "@/public/logo-pieces/1.png"; // top right
import piece2 from "@/public/logo-pieces/2.png"; // down right
import piece3 from "@/public/logo-pieces/3.png"; // down left
import piece4 from "@/public/logo-pieces/4.png"; // top left

interface AdvancedLoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function AdvancedLoader({
  size = "lg",
  message,
  className,
}: AdvancedLoaderProps) {
  const sizeMap = {
    sm: { outer: "w-24 h-24", inner: "w-20 h-20", stroke: "border-3" },
    md: { outer: "w-32 h-32", inner: "w-28 h-28", stroke: "border-4" },
    lg: { outer: "w-40 h-40", inner: "w-36 h-36", stroke: "border-4" },
  };

  const config = sizeMap[size];

  const pieces = [
    { image: piece1, name: "top-right", delay: 0 },
    { image: piece2, name: "down-right", delay: 0.2 },
    { image: piece3, name: "down-left", delay: 0.4 },
    { image: piece4, name: "top-left", delay: 0.6 },
  ];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center",
          config.outer,
        )}
      >
        {/* Rotating border circle */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-transparent",
            config.stroke,
            "border-t-purple-500 border-r-pink-500 border-b-cyan-400 border-l-purple-400",
            "animate-spin",
          )}
        />

        {/* Logo pieces container */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center",
            config.inner,
          )}
        >
          {pieces.map((piece, index) => (
            <div
              key={piece.name}
              className="absolute inset-0"
              style={{
                animation: `fadeInScale 0.6s ease-out forwards`,
                animationDelay: `${piece.delay}s`,
              }}
            >
              <Image
                src={piece.image}
                alt={`Logo piece ${index + 1}`}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {message && (
        <p className="text-foreground font-medium text-sm">{message}</p>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
