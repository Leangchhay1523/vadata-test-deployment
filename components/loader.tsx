import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/logo.png";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "pulse" | "dots";
  className?: string;
}

export function Loader({
  size = "md",
  variant = "spinner",
  className,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const dotSizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  if (variant === "spinner") {
    return (
      <div className={cn(sizeClasses[size], "relative", className)}>
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "border-2 border-transparent",
            "border-t-purple-500 border-r-pink-500 border-b-cyan-400",
            "animate-spin",
          )}
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={cn(
          sizeClasses[size],
          "rounded-full",
          "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400",
          "animate-pulse",
          className,
        )}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <div
          className={cn(
            dotSizeClasses[size],
            "rounded-full bg-purple-500 animate-bounce",
          )}
          style={{ animationDelay: "0s" }}
        />
        <div
          className={cn(
            dotSizeClasses[size],
            "rounded-full bg-pink-500 animate-bounce",
          )}
          style={{ animationDelay: "0.15s" }}
        />
        <div
          className={cn(
            dotSizeClasses[size],
            "rounded-full bg-cyan-400 animate-bounce",
          )}
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    );
  }

  return null;
}

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children?: React.ReactNode;
}

export function LoadingOverlay({
  isLoading,
  message = "Loading...",
  children,
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl p-8 border border-border shadow-xl flex flex-col items-center gap-4">
        <Loader size="lg" variant="spinner" />
        <p className="text-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}

// Inline loading component
interface InlineLoaderProps {
  message?: string;
}

export function InlineLoader({ message = "Loading..." }: InlineLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader size="lg" variant="spinner" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

// Logo loader component with rotating circle
interface LogoLoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function LogoLoader({
  size = "lg",
  message,
  className,
}: LogoLoaderProps) {
  const sizeMap = {
    sm: { outer: "w-24 h-24", inner: "w-16 h-16", stroke: "border-4" },
    md: { outer: "w-32 h-32", inner: "w-24 h-24", stroke: "border-4" },
    lg: { outer: "w-40 h-40", inner: "w-32 h-32", stroke: "border-4" },
  };

  const config = sizeMap[size];

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

        {/* Logo in center */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full",
            config.inner,
          )}
        >
          <Image
            src={logo}
            alt="VADATA"
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
      </div>

      {message && (
        <p className="text-foreground font-medium text-sm">{message}</p>
      )}
    </div>
  );
}
