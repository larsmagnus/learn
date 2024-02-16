"use client";

import React, { type ReactNode } from "react";
import reportAccessibility from "@/utils/reportAccessibility";
import { useInterval } from "@/hooks/useInterval";

/**
 * Check for accessibility violations in non-prod environments.
 */
export const AccessibilityProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const shouldRun =
    typeof window !== "undefined" && process.env.NODE_ENV !== "production";

  /**
   * Audit the page on router changes, or if the DOM updates on fast-refresh.
   *
   * @note This is a workaround until `@axe-core/react` supports React 18 fully
   * @see https://github.com/dequelabs/axe-core-npm/issues/92
   *
   * @note For a simpler solution, you can use `useEffect` and `usePathname`
   * to rerun on router pathname changes instead of on a set interval
   */
  useInterval(
    () => {
      reportAccessibility(React);
    },
    // Delay in milliseconds or null to stop it
    shouldRun ? 1000 : null
  );

  return <>{children}</>;
};

export default AccessibilityProvider;
