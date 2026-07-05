import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

// Countries to block (ISO 3166-1 alpha-2). CN = Mainland China.
// HK/MO/TW are NOT blocked. Add them here if desired.
const BLOCKED_COUNTRIES = new Set(["CN"]);

const geoBlockMiddleware = createMiddleware().server(async ({ next, request }) => {
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    "";
  if (country && BLOCKED_COUNTRIES.has(country.toUpperCase())) {
    return new Response(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Access Restricted</title><meta name="robots" content="noindex"><style>body{font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;background:#0b0b0b;color:#fff;text-align:center;padding:24px}main{max-width:480px}h1{font-size:22px;margin:0 0 12px}p{opacity:.7;font-size:14px;line-height:1.6}</style></head><body><main><h1>Access Restricted</h1><p>This website is not available in your region.<br/>本网站在您所在的地区暂不可用。</p></main></body></html>`,
      { status: 403, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [geoBlockMiddleware, errorMiddleware],
}));

