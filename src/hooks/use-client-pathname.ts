import { useState, useEffect } from "react";

/**
 * Returns the current pathname (window.location.pathname) only on the client.
 * On the server, returns null to avoid hydration mismatches.
 */
export function useClientPathname(): string | null {
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
}
