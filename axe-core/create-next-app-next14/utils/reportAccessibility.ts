"use client";
import type React from "react";

/**
 * Tests the application with the axe-core accessibility testing library.
 * Results will show in the DevTools console.
 * @see https://github.com/dequelabs/axe-core
 * @param App - Entry point React instance
 * @param config - Configures the format of the data used by axe. Can be used to add new rules.
 */
export const reportAccessibility = async (
  App: typeof React,
  config?: Record<string, unknown>
): Promise<void> => {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    const axe = await import("@axe-core/react");
    const ReactDOM = await import("react-dom");

    axe.default(App, ReactDOM, 1000, config);
  }
};

export default reportAccessibility;
