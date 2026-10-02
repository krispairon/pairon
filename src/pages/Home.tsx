import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

const MARQUEE_ITEMS = [
  "PERSONAL TRAINING",
  "NUTRITION COACHING",
  "CERTIFIED PROFESSIONALS",
  "HOUSTON TX",
  "COMPATIBILITY MATCHING",
  "GOAL-DRIVEN RESULTS",
  "PAIRON",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

function GridBackground() {
  return (
    <div className="grid-bg" aria-hidden="true">
      <div className="grid-fade-top" />
      <div className="grid-fade-bottom" />
    </div>
  );
}

function CrimsonSlash() {
  return (
    <div className="slash-wrapper" aria-hidden="true">
      <div className="slash-line" />
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string;

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [light, setLight] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ timestamp: new Date().toISOString(), name, email, role }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="page-root" data-theme={light ? "light" : "dark"}>
      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo">Pairon</span>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setLight(!light)}
            aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
            data-testid="button-theme-toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={light ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                {light ? <MoonIcon /> : <SunIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#signup" className="nav-cta">Join the Beta</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" ref={heroRef}>
        <GridBackground />
        <CrimsonSlash />

        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="hero-overline"
          >
            The Tinder for Personal Training + Nutrition
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="hero-headline"
          >
            Find Your Perfect<br />
            <span className="hero-headline-accent">Match.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="hero-sub"
          >
            Pairon connects you with certified trainers and nutritionists matched to your goals, budget, and lifestyle — not just whoever is closest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="hero-actions"
          >
            <a href="#signup" className="btn-primary" data-testid="button-hero-cta">
              Join the Beta
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="hero-badge">Launching in Houston</span>
          </motion.div>
        </motion.div>

        {/* STATS BAR */}
        <motion.div
          className="stats-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {[
            { value: "500+", label: "Certified Coaches" },
            { value: "94%", label: "Match Satisfaction" },
            { value: "1", label: "Platform. Everything." },
          ].map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <Marquee />
      </div>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="section-inner">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="section-overline">The Process</p>
            <h2 className="section-title">Three steps.<br />One perfect match.</h2>
          </motion.div>

          <motion.div
            className="how-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {[
              {
                num: "01",
                title: "Tell Us Your Goals",
                body: "Answer a quick intake quiz covering your fitness ambitions, dietary preferences, and lifestyle constraints. Takes under 3 minutes.",
              },
              {
                num: "02",
                title: "Get Matched",
                body: "Your compatibility score surfaces the absolute best-fit coaches — based on data, availability, and coaching style. Not proximity.",
              },
              {
                num: "03",
                title: "Start Coaching",
                body: "Access workouts, custom meal plans, and direct check-ins — all in one place. No switching apps, no chasing invoices.",
              },
            ].map((card) => (
              <motion.div key={card.num} className="how-card" variants={fadeUp}>
                <div className="how-card-num">{card.num}</div>
                <div className="how-card-body">
                  <h3 className="how-card-title">{card.title}</h3>
                  <p className="how-card-text">{card.body}</p>
                </div>
                <div className="how-card-accent" aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section who-section">
        <div className="section-inner">
          <motion.p
            className="section-overline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Who It's For
          </motion.p>

          <div className="who-grid">
            <motion.div
              className="who-card who-card--clients"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="who-tag">For Clients</div>
              <h2 className="who-title">Your goals.<br />Your match.</h2>
              <ul className="who-list">
                {[
                  { head: "Lifestyle-First Matching", body: "Find a trainer who actually fits your schedule, goals, and how you train — not just your zip code." },
                  { head: "Aligned Nutrition", body: "Get a nutritionist dialed into your exact dietary needs, health targets, and budget." },
                  { head: "All-In-One Platform", body: "Workouts, meal plans, and check-ins in one place. No more patchwork apps." },
                ].map((item) => (
                  <li key={item.head} className="who-item">
                    <span className="who-item-dot" />
                    <div>
                      <strong className="who-item-head">{item.head}</strong>
                      <p className="who-item-body">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="who-card who-card--pros"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="who-tag who-tag--pro">For Pros</div>
              <h2 className="who-title">Less hustle.<br />Better clients.</h2>
              <ul className="who-list">
                {[
                  { head: "Pre-Qualified Leads", body: "Reach clients who are ready to commit and already match your coaching style." },
                  { head: "Algorithm-Driven Growth", body: "Let the compatibility engine fill your calendar — spend less time on cold outreach." },
                  { head: "Automatic Payments", body: "Get paid on time, every time. No invoicing, no chasing, no exceptions." },
                ].map((item) => (
                  <li key={item.head} className="who-item">
                    <span className="who-item-dot" />
                    <div>
                      <strong className="who-item-head">{item.head}</strong>
                      <p className="who-item-body">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BETA SIGNUP */}
      <section id="signup" className="section signup-section">
        <div className="signup-glow" aria-hidden="true" />
        <div className="signup-grid-overlay" aria-hidden="true" />

        <motion.div
          className="signup-inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.p className="section-overline" variants={fadeUp}>Early Access</motion.p>
          <motion.h2 className="signup-title" variants={fadeUp}>Be First.</motion.h2>
          <motion.p className="signup-sub" variants={fadeUp}>
            We're launching in Houston. Get early access before we open to the public.
          </motion.p>

          <motion.div variants={fadeUp}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="signup-form"
                  exit={{ opacity: 0, y: -10 }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="signup-input"
                    data-testid="input-name"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="signup-input"
                    data-testid="input-email"
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="signup-input"
                    data-testid="input-role"
                  >
                    <option value="" disabled>I am a…</option>
                    <option value="Client">Client — looking for a trainer / nutritionist</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Nutritionist">Nutritionist</option>
                  </select>
                  {error && <p className="signup-error" style={{ color: "#B71C1C", fontSize: "0.85rem" }}>{error}</p>}
                  <button type="submit" className="btn-primary" disabled={submitting} data-testid="button-request-access">
                    {submitting ? "Submitting…" : "Request Access"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="signup-confirm"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="#B71C1C" strokeWidth="1.5" />
                    <path d="M6 10l3 3 5-5" stroke="#B71C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're on the list. We'll be in touch.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-logo">Pairon</span>
        <span className="footer-divider" aria-hidden="true" />
        <span className="footer-copy">© 2026</span>
        <span className="footer-divider" aria-hidden="true" />
        <span className="footer-tagline">Built in Houston.</span>
      </footer>
    </div>
  );
}
