import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SESSION_KEY = "morcce_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/**
 * Fires a fire-and-forget POST to /api/public/track on every client-side
 * route change (and initial mount). Silent on failure.
 */
export function VisitorTracker() {
  const pathname = useRouterState({
    select: (s) => {
      // Runtime type guard: never let a non-string (object, undefined) flow
      // through — string coercion of TanStack Router's parsed `search` object
      // throws "Cannot convert object to primitive value" during SSR.
      const loc = s.location as unknown as {
        href?: unknown;
        pathname?: unknown;
      };
      if (typeof loc.href === "string") return loc.href;
      if (typeof loc.pathname === "string") return loc.pathname;
      return "/";
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof pathname !== "string") return;
    const body = JSON.stringify({
      path: pathname,
      referer: typeof document.referrer === "string" ? document.referrer || null : null,
      language: typeof navigator.language === "string" ? navigator.language : null,
      sessionId: getSessionId(),
    });
    try {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon && navigator.sendBeacon("/api/public/track", blob)) return;
    } catch {
      /* fall through to fetch */
    }
    fetch("/api/public/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* ignore */
    });
  }, [pathname]);


  return null;
}
