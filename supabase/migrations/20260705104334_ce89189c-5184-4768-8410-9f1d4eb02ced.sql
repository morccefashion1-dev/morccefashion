
-- Blocked requests (geo-block audit log)
CREATE TABLE public.blocked_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ip text,
  country text,
  user_agent text,
  path text,
  referer text
);
GRANT ALL ON public.blocked_requests TO service_role;
ALTER TABLE public.blocked_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_blocked_requests_created ON public.blocked_requests (created_at DESC);
CREATE INDEX idx_blocked_requests_country ON public.blocked_requests (country);

-- Visitor events (page-view tracking)
CREATE TABLE public.visitor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ip text,
  country text,
  city text,
  user_agent text,
  path text NOT NULL,
  referer text,
  language text,
  session_id text
);
GRANT ALL ON public.visitor_events TO service_role;
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_visitor_events_created ON public.visitor_events (created_at DESC);
CREATE INDEX idx_visitor_events_session ON public.visitor_events (session_id);

-- Contact form submissions (leads)
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  product_interest text,
  message text,
  source text,
  ip text,
  country text,
  user_agent text,
  notified_at timestamptz,
  autoreply_sent_at timestamptz,
  digest_sent_at timestamptz
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_contact_submissions_created ON public.contact_submissions (created_at DESC);
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions (email);
