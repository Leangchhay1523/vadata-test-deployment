"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const handleClick = () => {
    const targetTheme = isDark ? "light" : "dark";
    setTheme(targetTheme);
    localStorage.setItem("theme", targetTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full hover:bg-gray-200"
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      style={{ visibility: mounted ? "visible" : "hidden" }}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
