"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      enableColorScheme={false}
      storageKey="vadata-theme"
      forcedTheme={undefined}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
