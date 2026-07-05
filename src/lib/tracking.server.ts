// Server-only helpers for logging blocked requests, visitor events, and inquiries.
// Imported ONLY from route handlers / server-fn handlers via dynamic import,
// or top-level from other .server.ts files.

import { supabaseAdmin } from "@/integrations/supabase/client.server";

export function extractClientIP(headers: Headers): string | null {
  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

export function extractCountry(headers: Headers): string | null {
  return (
    headers.get("cf-ipcountry") ||
    headers.get("x-vercel-ip-country") ||
    null
  );
}

export function extractCity(headers: Headers): string | null {
  return headers.get("cf-ipcity") || null;
}

interface BlockedRequestInput {
  ip: string | null;
  country: string | null;
  userAgent: string | null;
  path: string;
  referer: string | null;
}

export async function logBlockedRequest(input: BlockedRequestInput) {
  try {
    await supabaseAdmin.from("blocked_requests").insert({
      ip: input.ip,
      country: input.country,
      user_agent: input.userAgent?.slice(0, 500) ?? null,
      path: input.path.slice(0, 500),
      referer: input.referer?.slice(0, 500) ?? null,
    });
  } catch (err) {
    // Never let logging break the response.
    console.error("[blocked_requests] insert failed", err);
  }
}

interface VisitorEventInput {
  ip: string | null;
  country: string | null;
  city: string | null;
  userAgent: string | null;
  path: string;
  referer: string | null;
  language: string | null;
  sessionId: string | null;
}

export async function logVisitorEvent(input: VisitorEventInput) {
  try {
    await supabaseAdmin.from("visitor_events").insert({
      ip: input.ip,
      country: input.country,
      city: input.city,
      user_agent: input.userAgent?.slice(0, 500) ?? null,
      path: input.path.slice(0, 500),
      referer: input.referer?.slice(0, 500) ?? null,
      language: input.language?.slice(0, 50) ?? null,
      session_id: input.sessionId?.slice(0, 100) ?? null,
    });
  } catch (err) {
    console.error("[visitor_events] insert failed", err);
  }
}

interface InquiryInput {
  fullName: string;
  company: string | null;
  email: string;
  phone: string | null;
  productInterest: string | null;
  message: string | null;
  source: string;
  ip: string | null;
  country: string | null;
  userAgent: string | null;
}

export async function insertInquiry(input: InquiryInput) {
  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .insert({
      full_name: input.fullName,
      company: input.company,
      email: input.email,
      phone: input.phone,
      product_interest: input.productInterest,
      message: input.message,
      source: input.source,
      ip: input.ip,
      country: input.country,
      user_agent: input.userAgent?.slice(0, 500) ?? null,
    })
    .select("id, created_at")
    .single();
  if (error) throw error;
  return data;
}
