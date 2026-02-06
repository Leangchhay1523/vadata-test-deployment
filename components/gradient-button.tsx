"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  showArrow?: boolean
  size?: "sm" | "md" | "lg"
}

export function GradientButton({
  children,
  className,
  onClick,
  type = "button",
  showArrow = true,
  size = "md",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative group inline-flex items-center gap-2 font-semibold text-white rounded-full",
        "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400",
        "hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300",
        "hover:scale-105 active:scale-95",
        sizeClasses[size],
        className
      )}
    >
      {children}
      {showArrow && (
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  )
}
