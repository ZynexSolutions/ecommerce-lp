// components/PrelineInitializer.tsx
"use client";

import { useEffect } from "react";

// Add type declaration for Preline's static methods
declare global {
  interface Window {
    HSStaticMethods: {
      autoInit: () => void;
    };
  }
}

export default function PrelineInitializer() {
  useEffect(() => {
    // Import and initialize Preline
    const initPreline = async () => {
      try {
        const { HSStaticMethods } = await import("preline/preline");

        // Initialize all components
        HSStaticMethods.autoInit();

        // Optional: Add a global reinit function for dynamic updates
        window.HSStaticMethods = HSStaticMethods;
      } catch (error) {
        console.error("Error initializing Preline:", error);
      }
    };

    // Initialize when the component mounts
    initPreline();

    // Optional: Handle dynamic content updates
    const observer = new MutationObserver((mutations) => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
      console.log(mutations);
    });

    // Start observing the entire document for changes in the DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
