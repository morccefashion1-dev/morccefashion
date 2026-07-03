import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck, Factory, Users, Package, Sparkles, PenTool,
  Box, Truck, Mail, Phone, MapPin, MessageCircle, ArrowRight,
  CheckCircle2, Award, Globe2, Layers, Menu, X, Send,
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import heroBg from "@/assets/luxury-designer-display-stockcake.jpg.asset.json";
import workshop4 from "@/assets/workshop4.jpg.asset.json";
import workshop5 from "@/assets/workshop5.jpg.asset.json";
import workshop8 from "@/assets/workshop8.jpg.asset.json";
import workshop10 from "@/assets/workshop10.jpg.asset.json";
import workshop12 from "@/assets/workshop12.jpg.asset.json";
import workshop17 from "@/assets/workshop17.jpg.asset.json";
import productHandbags from "@/assets/Ladies_Handbags.jpg.asset.json";
import productWallets from "@/assets/Wallets_Purses.jpg.asset.json";
import productBelts from "@/assets/Belts.jpg.asset.json";
import productAccessories from "@/assets/Fashion_Accessories.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MORCCE Fashion — OEM/ODM Handbag & Leather Goods Manufacturer" },
      { name: "description", content: "MORCCE Fashion Co., Limited — OEM/ODM handbag, wallet and belt factory in Guangzhou, China. Trusted by global brands since 2006." },
      { property: "og:title", content: "MORCCE Fashion — OEM/ODM Handbag Manufacturer" },
      { property: "og:description", content: "Reputed manufacturer of ladies' bags, wallets, belts and fashion accessories. 200+ employees, 100,000 pcs monthly capacity." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Products", href: "#products" },
  { label: "OEM / ODM", href: "#process" },
  { label: "Factory", href: "#factory" },
  { label: "Certifications", href: "#certs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header open={open} setOpen={setOpen} />
      <Hero />
      <TrustBar />
      <Products />
      <Process />
      <Factory1 />
      <Capabilities />
      <Certs />
      <About />
      <Clients />
      <Contact />
      <Footer />
      <FloatingInquiry />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary-foreground">
            <span className="font-display text-lg font-bold" style={{ color: "var(--color-primary)" }}>M</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">MORCCE</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Fashion Co., Ltd</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-secondary/80 transition hover:text-[color:var(--color-primary-deep)]">{n.label}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex btn-primary" style={{ padding: "0.6rem 1.25rem" }}>
          Inquiry Now <ArrowRight className="h-4 w-4" />
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2" style={{ padding: "0.6rem 1.25rem" }}>Inquiry Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img src={heroBg.url} alt="MORCCE handbag manufacturing workshop" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-5 py-28 md:py-40">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> BSCI/SEDEX/FAMA AUDIT VERIFIED SUPPLIER · SINCE 2006
        </span>
        <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
          Your Trusted OEM / ODM<br />
          <span style={{ color: "var(--color-primary)" }}>Handbag & Leather Goods</span> Manufacturer
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
          MORCCE Fashion Co., Limited — Guangzhou-based factory with 200+ skilled staff producing ladies' bags,
          wallets, belts and fashion accessories for global retail fast fashion brands.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary">Get a Quote <ArrowRight className="h-4 w-4" /></a>
          <a href="#products" className="btn-outline">Browse Products</a>
        </div>
        <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/20 pt-8 md:grid-cols-4">
          {[
            { k: "20+", v: "Years Experience" },
            { k: "200+", v: "Employees" },
            { k: "100,000", v: "Pcs / Month" },
            { k: "500", v: "MOQ per style" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-2xl font-bold text-white md:text-3xl">{s.k}</div>
              <div className="text-xs uppercase tracking-widest text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust bar ---------------- */
function TrustBar() {
  const items = ["PEPKOR", "SMYK", "LPP S.A.", "TOP SECRET", "NEW LOOK", "FOREVER 21", "PINK WOMAN", "NICI"];
  return (
    <section className="border-b border-border bg-secondary py-6">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-white/60">Trusted by global retail brands</div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((i) => (
            <span key={i} className="font-display text-lg font-semibold text-white/85">{i}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products ---------------- */
function Products() {
  const cats = [
    { title: "Ladies' Handbags", desc: "Tote, shoulder, crossbody & clutch bags in PU / genuine leather.", img: productHandbags },
    { title: "Wallets & Purses", desc: "Bi-fold, tri-fold, long wallets and card holders.", img: productWallets },
    { title: "Belts", desc: "Fashion belts, leather belts, woven & braided styles.", img: productBelts },
    { title: "Fashion Accessories", desc: "Cosmetic bags, manicure sets, phone/iPad cases, hair accessories, jewelry.", img: productAccessories },
  ];
  return (
    <section id="products" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHead eyebrow="Product Categories" title="Complete handbag/wallet/belt & fashion accessory range" sub="Four core product lines, all backed by in-house sample development and quality control." />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <article key={c.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="aspect-square overflow-hidden sm:aspect-[4/3]">
              <img src={c.img.url} alt={c.title} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--color-primary-deep)" }}>
                Request catalog <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
function Process() {
  const steps = [
    { icon: PenTool, title: "01 · Design Brief", desc: "Share sketches, tech-packs or reference samples. Our team reviews feasibility within 24h." },
    { icon: Layers, title: "02 · Sample Development&price confirmation", desc: "Pre-production sample ready in 7–10 days. Material, hardware & color matched." },
    { icon: Box, title: "03 · Bulk Production&Strict quality inspection", desc: "MOQ 500 pcs / color / style. In-line QC at every workshop across 5 floors." },
    { icon: Truck, title: "04 · Delivery", desc: "30–35 days after PP approval. FOB Yantian / HK / Shanghai / Ningbo / Xiamen etc..." },
  ];
  return (
    <section id="process" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="OEM / ODM Workflow" title="From design to shipment — a clear, tracked path" sub="A visual, transparent process that mirrors how global brands actually source with us." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: "var(--color-primary)" }}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Factory gallery ---------------- */
function Factory1() {
  const shots = [
    { img: workshop4, label: "1F · Bag Packing Workshop" },
    { img: workshop5, label: "2F · Belt Workshop" },
    { img: workshop8, label: "2F · Belt Workshop" },
    { img: workshop10, label: "4F · Bag Workshop" },
    { img: workshop12, label: "5F · Painting Workshop" },
    { img: workshop17, label: "Foreign Trade Office" },
  ];
  return (
    <section id="factory" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHead eyebrow="Inside the Factory" title="5000m² workshop, 200+ experienced workers, two integrated production line" sub="Cutting, sewing, painting, belt lines, packing and foreign-trade sample rooms — all under one roof in Guangzhou.And the most important - we located in Shiling town which is 3kms far away from the largest pu/leather fabric market in the world." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shots.map((s) => (
          <figure key={s.label} className="group relative overflow-hidden rounded-xl">
            <img src={s.img.url} alt={s.label} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Capabilities ---------------- */
function Capabilities() {
  const rows = [
    { icon: Factory, k: "Location", v: "Guangzhou, Guangdong, China (HQ & showroom in Shenzhen)" },
    { icon: Users, k: "Team", v: "200+ skilled workers across cutting, sewing, painting & QC" },
    { icon: Package, k: "Monthly Capacity", v: "100,000 pcs across bags, wallets, belts & accessories" },
    { icon: Layers, k: "MOQ", v: "500 pcs per color / per style" },
    { icon: Sparkles, k: "Sample Lead Time", v: "7–10 days from confirmed tech-pack" },
    { icon: Truck, k: "Delivery", v: "30–35 days after pre-production sample approval" },
    { icon: Globe2, k: "Incoterms", v: "FOB Yantian / HK / Shanghai / Ningbo / Xiamen" },
    { icon: ShieldCheck, k: "Payment", v: "30% deposit · 70% T/T against copy of B/L" },
  ];
  return (
    <section className="bg-secondary py-24 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--color-primary)" }}>Manufacturing Snapshot</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Built to run brand-grade production, at scale.</h2>
            <p className="mt-4 max-w-lg text-white/70">
              Every specification a buyer checks before placing an order — capacity, MOQ, lead time,
              logistics, payment — laid out clearly, no back-and-forth.
            </p>
            <a href="#contact" className="mt-8 btn-primary">Talk to sales <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.k} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--color-primary)" }}>
                  <r.icon className="h-4 w-4 text-white" />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-white/60">{r.k}</div>
                <div className="mt-1 text-sm font-medium text-white">{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Certs ---------------- */
function Certs() {
  const certs = [
    { name: "BSCI", desc: "Social compliance audit" },
    { name: "Sedex", desc: "Ethical trade membership (SMETA)" },
    { name: "ISO 9001", desc: "Quality management system" },
    { name: "REACH", desc: "Chemical & material compliance" },
  ];
  return (
    <section id="certs" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHead eyebrow="Certifications & Compliance" title="Audit-ready for international retail" sub="We work with buyers whose compliance teams demand documented, third-party verified factories." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certs.map((c) => (
          <div key={c.name} className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--color-primary)" }}>
              <Award className="h-7 w-7 text-white" />
            </div>
            <div className="mt-5 font-display text-lg font-bold">{c.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const pts = [
    "In-house R&D, sampling and mold development",
    "Unique, innovative design with trend-driven collections",
    "Strict multi-stage quality control across every workshop",
    "Competitive pricing thanks to vertical production",
  ];
  return (
    <section id="about" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--color-primary-deep)" }}>About MORCCE</div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">A reputed first-class manufacturer of ladies' bags, wallets & belts.</h2>
          <p className="mt-5 text-muted-foreground">
            Morcce Fashion Co., Limited has been established since 2006. Our factory is located in Guangzhou, China,
            with a foreign sales department and showroom in Shenzhen. We have proven expertise in product design,
            development, research, testing and manufacturing — extending from bags and wallets to manicure sets,
            cosmetic bags, phone / iPad cases, costume jewelry and hair accessories.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our goal is total customer satisfaction. Professional manufacturing systems, a rigorous QC process,
            on-time delivery and years of experience are what keep our partners growing with us.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {pts.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--color-primary)" }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Clients ---------------- */
function Clients() {
  const clients = ["PEPKOR", "SMYK", "LPP S.A.", "KOMEX S.A.", "TOP SECRET", "NEW LOOK", "GATE WEAR", "NICI", "PINK WOMAN", "DIVA", "FOREVER 21"];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHead eyebrow="Cooperation" title="Selected brand partners" sub="Long-term OEM/ODM cooperation with retailers and brands across Europe, Africa and the Americas." />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {clients.map((c) => (
          <div key={c} className="rounded-xl border border-border bg-card px-4 py-6 text-center font-display text-sm font-semibold text-secondary/80 transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary-deep)]">
            {c}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="bg-secondary py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2">
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--color-primary)" }}>Inquiry Now</div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Send your tech-pack or reference — we reply within 24h.</h2>
          <p className="mt-4 text-white/70">Reach our foreign trade team directly. All new-project inquiries are handled by Alex Chau.</p>
          <div className="mt-8 space-y-4 text-sm">
            <ContactRow icon={Users} label="Contact person" value="Alex Chau" />
            <ContactRow icon={Mail} label="Email" value="alex.chau@morcce.com" href="mailto:alex.chau@morcce.com" />
            <ContactRow icon={Phone} label="Tel" value="+86-755-86058574 ext. 811" />
            <ContactRow icon={MessageCircle} label="Mobile / WhatsApp" value="+86-134-8017-6296" />
            <ContactRow icon={MapPin} label="Factory" value="Guangzhou, Guangdong, China&nbsp;" />
            <ContactRow icon={Globe2} label="Website" value="www.morcce.com" />
          </div>
        </div>
        <form className="rounded-2xl bg-white p-8 text-secondary shadow-2xl" onSubmit={(e) => e.preventDefault()}>
          <h3 className="font-display text-xl font-bold">Request a quotation</h3>
          <div className="mt-6 grid gap-4">
            <Field label="Full name" placeholder="Your name" />
            <Field label="Company" placeholder="Company name" />
            <Field label="Email" type="email" placeholder="you@company.com" />
            <Field label="Product interest" placeholder="e.g. PU tote bags, leather belts…" />
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea rows={4} placeholder="Quantity, materials, target price, delivery…" className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]" />
            </div>
            <button className="btn-primary mt-2 w-full">Send inquiry <ArrowRight className="h-4 w-4" /></button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input {...rest} className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]" />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const Body = (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--color-primary)" }}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-white/60">{label}</div>
        <div className="text-white">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block transition hover:opacity-80">{Body}</a> : Body;
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} MORCCE Fashion Co., Limited. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#products" className="hover:text-[color:var(--color-primary-deep)]">Products</a>
          <a href="#factory" className="hover:text-[color:var(--color-primary-deep)]">Factory</a>
          <a href="#contact" className="hover:text-[color:var(--color-primary-deep)]">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating inquiry form ---------------- */
function FloatingInquiry() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", product: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.name} — ${form.product || "MORCCE"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nProduct Interest: ${form.product}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:alex.chau@morcce.com?subject=${subject}&body=${body}`, "_blank");
    setOpen(false);
    setForm({ name: "", company: "", email: "", product: "", message: "" });

    toast.success("Inquiry sent successfully!", {
      description: (
        <div className="mt-1 space-y-1 text-sm">
          <p>Our team will reply within 24 hours.</p>
          <p>
            You can also reach us directly via{" "}
            <a href="mailto:alex.chau@morcce.com" className="underline" style={{ color: "var(--color-primary-deep)" }}>email</a>
            {" "}or{" "}
            <a href="https://wa.me/8613480176296" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary-deep)" }}>WhatsApp (+86-134-8017-6296)</a>.
          </p>
        </div>
      ),
      duration: 8000,
    });
  };

  const Field = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
        onChange={(e) => setForm((f) => ({ ...f, [rest.name!]: e.target.value }))}
        value={(form as any)[rest.name!] || ""}
      />
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Inquiry"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:-translate-y-0.5"
          style={{ background: "var(--color-primary-deep)" }}
        >
          <MessageCircle className="h-4 w-4" /> Inquiry Now
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-xl">Inquiry Now</SheetTitle>
          <SheetDescription>Fill in the form and we will reply within 24 hours.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Full name *" name="name" placeholder="Your name" required />
          <Field label="Company" name="company" placeholder="Company name" />
          <Field label="Email *" name="email" type="email" placeholder="you@company.com" required />
          <Field label="Product interest *" name="product" placeholder="e.g. PU tote bags, leather belts…" required />
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Quantity, materials, target price, delivery…"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn-primary mt-2 w-full">
            <Send className="h-4 w-4" /> Send inquiry
          </button>
          <div className="pt-2 text-center text-xs text-muted-foreground">
            Or contact directly:{" "}
            <a href="mailto:alex.chau@morcce.com" className="underline hover:text-[color:var(--color-primary-deep)]">alex.chau@morcce.com</a>
            {" · "}
            <a href="https://wa.me/8613480176296" target="_blank" rel="noopener noreferrer" className="underline hover:text-[color:var(--color-primary-deep)]">WhatsApp</a>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

/* ---------------- Section head ---------------- */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--color-primary-deep)" }}>{eyebrow}</div>
      <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}
