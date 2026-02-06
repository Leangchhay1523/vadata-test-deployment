import Image from "next/image";
import logo from "@/public/logo.png";

export function VadataLogo({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="purplePink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="pinkCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="cyanPurple" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      {/* Top left piece */}
      <path
        d="M30 15 L50 50 L20 50 Q10 50 15 38 L30 15 Q35 8 40 15"
        fill="url(#cyanPurple)"
      />
      {/* Top right piece */}
      <path
        d="M70 15 Q75 8 80 15 L95 45 Q100 55 90 55 L50 55 L70 15"
        fill="url(#purplePink)"
      />
      {/* Bottom piece */}
      <path
        d="M25 60 L75 60 L60 85 Q55 95 45 95 Q35 95 40 85 L25 60"
        fill="url(#pinkCyan)"
      />
    </svg>
  );
}

export function VadataLogoWithText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* <VadataLogo className="w-10 h-10" /> */}
      <Image src={logo} alt="VADATA Logo" className="w-10 h-10" />
      <span className="text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
        VADATA
      </span>
    </div>
  );
}
