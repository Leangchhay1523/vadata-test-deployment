import { VadataLogoWithText } from "./vadata-logo";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Send,
} from "lucide-react";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  // { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  // { name: "Contact", href: "#contact" },
];

const earlyAccessLink = { name: "Get Early Access", href: "#early-access" };

const socialLinks = [
  { icon: Mail, href: "mailto:vadata.ai@gmail.com", label: "Facebook" },
  {
    icon: Send,
    href: "tg://resolve?domain=RankwillixRavis",
    label: "Twitter",
  },
  // { icon: Linkedin, href: "#", label: "LinkedIn" },
  // { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-background to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col gap-2">
            <VadataLogoWithText />
            {/* <p className="text-muted-foreground hover:text-foreground">
              Find them, Locate them, Understand them
            </p> */}
          </div>

          {/* Links */}
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
            <a
              href={earlyAccessLink.href}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              {earlyAccessLink.name}
            </a>
          </nav>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-full"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 VADATA. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent font-medium">
              Cambodian Founders
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
