import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const InquirySchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  company: z.string().trim().max(200).optional().nullable(),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(60).optional().nullable(),
  productInterest: z.string().trim().max(300).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
  source: z.enum(["contact-section", "floating-inquiry"]).default("floating-inquiry"),
});

export const Route = createFileRoute("/api/public/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid_json" }, { status: 400 });
        }

        const parsed = InquirySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "validation_failed", issues: parsed.error.issues },
            { status: 400 },
          );
        }
        const data = parsed.data;

        const { extractClientIP, extractCountry, insertInquiry } = await import(
          "@/lib/tracking.server"
        );

        try {
          const inserted = await insertInquiry({
            fullName: data.fullName,
            company: data.company ?? null,
            email: data.email,
            phone: data.phone ?? null,
            productInterest: data.productInterest ?? null,
            message: data.message ?? null,
            source: data.source,
            ip: extractClientIP(request.headers),
            country: extractCountry(request.headers),
            userAgent: request.headers.get("user-agent"),
          });
          return Response.json({ ok: true, id: inserted.id }, { status: 201 });
        } catch (err) {
          console.error("[inquiry] insert failed", err);
          return Response.json({ error: "server_error" }, { status: 500 });
        }
      },
    },
  },
});
