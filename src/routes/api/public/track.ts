import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const TrackSchema = z.object({
  path: z.string().trim().min(1).max(500),
  referer: z.string().trim().max(500).optional().nullable(),
  language: z.string().trim().max(50).optional().nullable(),
  sessionId: z.string().trim().max(100).optional().nullable(),
});

export const Route = createFileRoute("/api/public/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(null, { status: 204 });
        }
        const parsed = TrackSchema.safeParse(body);
        if (!parsed.success) return new Response(null, { status: 204 });

        const { extractClientIP, extractCountry, extractCity, logVisitorEvent } =
          await import("@/lib/tracking.server");

        await logVisitorEvent({
          ip: extractClientIP(request.headers),
          country: extractCountry(request.headers),
          city: extractCity(request.headers),
          userAgent: request.headers.get("user-agent"),
          path: parsed.data.path,
          referer: parsed.data.referer ?? request.headers.get("referer"),
          language:
            parsed.data.language ?? request.headers.get("accept-language")?.split(",")[0] ?? null,
          sessionId: parsed.data.sessionId ?? null,
        });

        return new Response(null, { status: 204 });
      },
    },
  },
});
