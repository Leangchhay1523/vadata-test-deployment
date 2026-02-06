"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { VadataLogoWithText } from "./vadata-logo";
import { GradientButton } from "./gradient-button";
import { Globe, User, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  // { name: "Pricing", href: "/#pricing" },
  { name: "Testimonials", href: "/#testimonials" },
  // { name: "Contact Us", href: "/#contact" },
];

const earlyAccessLink = { name: "Get Early Access", href: "/#early-access" };

export function Header({ onValidateClick }: { onValidateClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (href === "/") {
      // Home button - navigate to home
      router.push("/");
    } else if (isHomePage) {
      // On home page, scroll to section directly
      const hash = href.split("#")[1];
      if (hash) {
        // Scroll directly without using window.location.hash
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            console.warn(`Element with id "${hash}" not found`);
          }
        }, 0);
      }
    } else {
      // On other pages, navigate to home with hash
      router.push(href);
    }

    setMobileMenuOpen(false);
  };

  const handleValidate = () => {
    if (isHomePage && onValidateClick) {
      onValidateClick();
    } else {
      router.push("/#validate");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div onClick={(e) => handleNavClick("/", e)}>
            <VadataLogoWithText />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href={earlyAccessLink.href}
              onClick={(e) => handleNavClick(earlyAccessLink.href, e)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              {earlyAccessLink.name}
            </a>
          </nav>

          {/* Right side icons and CTA */}
          <div className="flex items-center gap-4">
            {/* <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-5 h-5" />
            </button> */}

            <ThemeSwitcher />

            {/* User */}
            {/* <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </button> */}

            <GradientButton
              size="sm"
              onClick={handleValidate}
              className="hidden sm:inline-flex"
            >
              Validate Now
            </GradientButton>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={earlyAccessLink.href}
                onClick={(e) => handleNavClick(earlyAccessLink.href, e)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 inline-block"
              >
                {earlyAccessLink.name}
              </a>
              <GradientButton
                size="sm"
                onClick={handleValidate}
                className="sm:hidden w-full"
              >
                Validate Now
              </GradientButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
