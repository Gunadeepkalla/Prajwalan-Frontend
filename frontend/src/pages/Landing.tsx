import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  MessageSquareText,
  BarChart3,
  FilePlus2,
  Search,
  LogIn,
  EyeOff,
  Star,
  Lock,
} from "lucide-react";

import BlurText from "../components/ui/BlurText";
import SpotlightCard from "../components/ui/SpotlightCard";
import Navbar from "../components/Navbar";

/* ─────────── helpers ─────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/* ─────────────────────────────── */
export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen text-[#111827] overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      {/* ══ HERO — light with soft blobs ══ */}
      <section
        className="relative min-h-screen flex flex-col justify-center text-[#111827] px-4 sm:px-6 pt-24 md:pt-32 pb-20"
        style={{
          background:
            "linear-gradient(150deg, #EEF4FF 0%, #F5F8FF 40%, #FDF6EE 100%)",
        }}
      >
        {/* decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-28 w-[520px] h-[520px] rounded-full blur-[110px] opacity-30" style={{ background: "#BFCFFF" }} />
          <div className="absolute -top-16 right-0 w-[380px] h-[380px] rounded-full blur-[100px] opacity-20" style={{ background: "#C4A4F8" }} />
          <div className="absolute bottom-10 left-1/3 w-[320px] h-[320px] rounded-full blur-[90px] opacity-20" style={{ background: "#FFD5B0" }} />
        </div>

        {/* faint dot pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#2355D4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* badge */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-white border border-blue-100 text-[#2355D4] px-4 py-2 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2355D4] animate-pulse" />
              AI-Powered Civic Safety Platform
            </span>
          </motion.div>

          {/* headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.07] tracking-tight max-w-4xl">
            <BlurText text="Report Safely." delay={0.06} />
            <br />
            <BlurText text="Be Heard." delay={0.06} className="text-[#6B7280]" />
            <br />
            <BlurText
              text="Stay Protected."
              delay={0.06}
              className="bg-gradient-to-r from-[#E06426] to-[#F59E0B] bg-clip-text text-transparent"
            />
          </h1>

          {/* sub */}
          <motion.p
            {...fadeUp(0.8)}
            className="mt-8 text-[#4B5563] text-lg max-w-2xl leading-relaxed"
          >
            A privacy-first digital reporting platform designed to reduce fear,
            remove stigma, and simplify access to law enforcement services —
            for every citizen.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(1)} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/report"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg,#2355D4 0%,#1D4ED8 100%)",
                boxShadow: "0 0 28px rgba(35,85,212,0.55)",
              }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 rounded-xl" />
              <FilePlus2 size={17} />
              Start Secure Report
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-[#CBD5E1] text-[#374151] hover:border-[#2355D4] hover:text-[#2355D4] hover:bg-blue-50 transition-all duration-200 w-full sm:w-auto"
            >
              <Search size={17} />
              Access Dashboard
            </Link>
          </motion.div>

          {/* trust row */}
          <motion.div
            {...fadeUp(1.1)}
            className="mt-12 flex flex-wrap items-center gap-6 text-xs text-[#9CA3AF] font-medium"
          >
            {[
              { icon: <Lock size={12} />, label: "End-to-End Encrypted" },
              { icon: <EyeOff size={12} />, label: "Anonymous Filing" },
              { icon: <Star size={12} />, label: "4.9 / 5 Citizen Rating" },
              { icon: <ShieldCheck size={12} />, label: "GDPR Compliant" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="text-[#2355D4]">{icon}</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#9CA3AF] text-xs"
        >
          <span>scroll</span>
          <span className="w-px h-8 bg-[#CBD5E1]" />
        </motion.div>
      </section>

      {/* ══ TRUST STRIP ══ */}
      <section
        style={{ background: "linear-gradient(135deg,#1B3A6B 0%,#2355D4 100%)" }}
        className="text-white py-10 md:py-12"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {[
            { icon: <Lock size={22} />, label: "End-to-End Encrypted" },
            { icon: <EyeOff size={22} />, label: "Anonymous Filing" },
            { icon: <ShieldCheck size={22} />, label: "GDPR Compliant" },
            { icon: <MessageSquareText size={22} />, label: "AI-Guided Support" },
          ].map(({ icon, label }, i) => (
            <motion.div key={label} {...fadeUp(0.1 * i)} className="flex flex-col items-center gap-2">
              <span className="text-blue-200">{icon}</span>
              <span className="text-sm font-medium text-blue-100">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ QUICK ACCESS CARDS ══ */}
      <section className="bg-[#F8F5F0] py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-[#E06426] mb-3">
              Quick Access
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827]">
              What would you like to do?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickCard
              icon={<FilePlus2 size={22} />}
              iconBg="bg-blue-50 text-[#2355D4]"
              title="File New Report"
              description="Use AI-guided conversation to securely report incidents with step-by-step support."
              link="/report"
              linkLabel="Start Report"
              accentColor="#2355D4"
              delay={0.1}
            />
            <QuickCard
              icon={<BarChart3 size={22} />}
              iconBg="bg-orange-50 text-[#E06426]"
              title="Track Complaint"
              description="Monitor the live progress and status of your previously submitted reports."
              link="/dashboard"
              linkLabel="View Dashboard"
              accentColor="#E06426"
              delay={0.2}
            />
            <QuickCard
              icon={<LogIn size={22} />}
              iconBg="bg-violet-50 text-violet-600"
              title="Officer Login"
              description="Secure access to the operational case management dashboard for law enforcement."
              link="/officer/login"
              linkLabel="Officer Access"
              accentColor="#7C3AED"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ══ WHY SECTION ══ */}
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-[#2355D4] mb-3">
              The Problem
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827]">
              Why Many Incidents Go Unreported
            </h2>
            <p className="mt-4 text-[#6B7280] text-sm max-w-xl mx-auto leading-relaxed">
              Understanding the barriers that prevent citizens from speaking
              up — and how we break them.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<EyeOff size={20} />}
              accent="#E06426"
              title="Fear of Physical Visits"
              description="Traditional reporting methods feel intimidating or unsafe for vulnerable individuals."
              delay={0.1}
            />
            <ProblemCard
              icon={<MessageSquareText size={20} />}
              accent="#2355D4"
              title="Social Stigma"
              description="Victims hesitate to report due to fear of judgment or social consequences."
              delay={0.2}
            />
            <ProblemCard
              icon={<Lock size={20} />}
              accent="#7C3AED"
              title="Complex Processes"
              description="Manual paperwork and procedural delays discourage timely and effective reporting."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="bg-[#F8F5F0] py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-[#E06426] mb-3">
              Simple Process
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827]">
              Simple, Guided Process
            </h2>
            <p className="mt-4 text-[#6B7280] text-sm max-w-xl mx-auto leading-relaxed">
              Three clear steps — that's all it takes to safely connect with the right authority.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* connector line */}
            <div
              aria-hidden
              className="hidden md:block absolute top-[2.6rem] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,#2355D4 20%,#E06426 80%,transparent)",
              }}
            />
            <StepCard
              step="01"
              color="#2355D4"
              title="Describe the Incident"
              description="Share what happened in your own words — our AI listens without judgment."
              delay={0.1}
            />
            <StepCard
              step="02"
              color="#E06426"
              title="AI Structures Your Report"
              description="The system organises your complaint into a clear, official format automatically."
              delay={0.2}
            />
            <StepCard
              step="03"
              color="#7C3AED"
              title="Secure Submission"
              description="Your report is encrypted and forwarded safely to the relevant authority."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-3xl overflow-hidden px-5 sm:px-8 md:px-10 py-10 md:py-16 text-center"
            style={{
              background: "linear-gradient(150deg,#EEF4FF 0%,#E8EDFF 50%,#F5F0FF 100%)",
              border: "1px solid #D4DEF8",
            }}
          >
            {/* decorative blobs inside banner */}
            <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-[70px] opacity-40" style={{ background: "#BFCFFF" }} />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-[70px] opacity-30" style={{ background: "#FFD5B0" }} />
            </div>
            <div className="relative">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2355D4] mb-4">
                Ready to act?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-[#111827]">
                Your voice matters.
                <br />
                <span className="bg-gradient-to-r from-[#E06426] to-[#F59E0B] bg-clip-text text-transparent">Make it heard.</span>
              </h2>
              <p className="mt-5 text-[#4B5563] max-w-lg mx-auto text-sm leading-relaxed">
                Join thousands of citizens using our secure platform to connect
                with law enforcement — quickly, confidentially, and without fear.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3.5 rounded-xl font-semibold text-white hover:-translate-y-0.5 transition-all duration-200 text-center"
                  style={{
                    background: "linear-gradient(135deg,#2355D4,#1D4ED8)",
                    boxShadow: "0 4px 18px rgba(35,85,212,0.35)",
                  }}
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 rounded-xl font-semibold border border-[#CBD5E1] text-[#374151] hover:border-[#2355D4] hover:text-[#2355D4] hover:bg-white transition-all duration-200 text-center">
                
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-[#F1F5F9] text-[#4B5563] px-4 sm:px-6 py-12 md:py-16 border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
                  style={{ background: "linear-gradient(135deg,#2355D4,#1D4ED8)" }}
                >
                  P
                </span>
                <p className="text-[#111827] font-bold text-lg">Prajwalan</p>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                AI-powered civic safety platform strengthening public access
                to law enforcement through secure digital infrastructure.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 sm:gap-12 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-[#111827] font-bold text-xs uppercase tracking-wider">
                  Platform
                </span>
                {["File Report", "Track Complaint", "Officer Portal"].map((l) => (
                  <a key={l} href="#" className="hover:text-[#2355D4] transition-colors">
                    {l}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[#111827] font-bold text-xs uppercase tracking-wider">
                  Legal
                </span>
                {["Privacy Policy", "Terms of Use", "Help Center"].map((l) => (
                  <a key={l} href="#" className="hover:text-[#2355D4] transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-center text-[#9CA3AF]">
            © {new Date().getFullYear()} Prajwalan — AI Secure Reporting. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════
   Sub-components
═══════════════════════════════ */

function QuickCard({
  icon,
  iconBg,
  title,
  description,
  link,
  linkLabel,
  accentColor,
  delay,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  accentColor: string;
  delay?: number;
}) {
  return (
    <motion.div {...(fadeUp(delay ?? 0))}>
      <SpotlightCard
        spotlightColor={`${accentColor}18`}
        className="group h-full p-7 rounded-2xl border border-[#E8E3DB] hover:border-[#D4CDC4] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}>
          {icon}
        </div>
        <h3 className="text-[#111827] font-bold text-lg mb-2">{title}</h3>
        <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: accentColor }}
        >
          {linkLabel}
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}

function ProblemCard({
  icon,
  accent,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  accent: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      {...(fadeUp(delay ?? 0))}
      className="p-7 bg-white border border-[#E8E0D8] rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${accent}15`, color: accent }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-[#111827] mb-2">{title}</h3>
      <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StepCard({
  step,
  color,
  title,
  description,
  delay,
}: {
  step: string;
  color: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      {...(fadeUp(delay ?? 0))}
      className="relative p-7 bg-white border border-[#E8E0D8] rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-sm mb-5"
        style={{
          background: `linear-gradient(135deg,${color},${color}cc)`,
          boxShadow: `0 4px 18px ${color}55`,
        }}
      >
        {step}
      </div>
      <h3 className="font-bold text-[#111827] mb-2">{title}</h3>
      <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}