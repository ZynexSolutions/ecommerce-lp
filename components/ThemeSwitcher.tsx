// components/ThemeSwitcher.tsx
"use client";

import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("auto"); // 'light', 'dark', 'auto'

  // Effect to read initial theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("hs_theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("auto"); // Default to auto if nothing stored
    }
  }, []);

  // Effect to apply the theme class to the <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("hs_theme", "light");
    } else if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("hs_theme", "dark");
    } else {
      // 'auto'
      localStorage.setItem("hs_theme", "auto");
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isSystemDark) {
        root.classList.remove("light");
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    }
  }, [theme]);

  // Optional: Add a simple UI to change the theme
  // You can place this button somewhere in your Header or Footer
  // const handleThemeChange = (newTheme: string) => {
  //   setTheme(newTheme);
  // };
  // return (
  //   <div>
  //     <button onClick={() => handleThemeChange('light')}>Light</button>
  //     <button onClick={() => handleThemeChange('dark')}>Dark</button>
  //     <button onClick={() => handleThemeChange('auto')}>Auto</button>
  //     <span>Current: {theme}</span>
  //   </div>
  // );

  // Since the original script only runs once on load, we might not need
  // a visible UI component, just the logic running in the layout.
  // Return null if no UI is needed from this specific component.
  return null;
};

// Function to run the initial theme check on load (similar to original script)
// This should be called once when the application mounts.
export const applyInitialTheme = () => {
  const html = document.documentElement; // Use documentElement for <html>
  const storedTheme = localStorage.getItem("hs_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isLight =
    storedTheme === "light" || (storedTheme === "auto" && !prefersDark);
  const isDark =
    storedTheme === "dark" || (storedTheme === "auto" && prefersDark);

  if (isLight && html.classList.contains("dark")) {
    html.classList.remove("dark");
    html.classList.add("light"); // Ensure light is added if needed
  } else if (isDark && html.classList.contains("light")) {
    html.classList.remove("light");
    html.classList.add("dark");
  } else if (isDark && !html.classList.contains("dark")) {
    html.classList.add("dark");
    if (html.classList.contains("light")) html.classList.remove("light"); // Clean up
  } else if (isLight && !html.classList.contains("light")) {
    html.classList.add("light");
    if (html.classList.contains("dark")) html.classList.remove("dark"); // Clean up
  }
  // If no stored theme ('auto' or null) and system matches default (light), no class needed initially by default Tailwind setup
};

export default ThemeSwitcher; // Exporting the component, even if it returns null
