import { useState, useRef, useEffect } from "react";
import CitizenLayout from "../components/CitizenLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  ShieldCheck,
  Lock,
  Zap,
  PhoneCall,
  Volume2,
} from "lucide-react";
import SpotlightCard from "../components/ui/SpotlightCard";

/* ── tiny typing indicator ── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-teal-500 inline-block"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ── live waveform bars ── */
function Waveform() {
  const heights = [4, 10, 16, 10, 6, 14, 8, 12, 4, 10];
  return (
    <div className="flex items-end gap-[3px] h-5">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-teal-400 inline-block"
          animate={{ height: [h, h * 1.8, h] }}
          transition={{ duration: 0.5 + i * 0.07, repeat: Infinity, ease: "easeInOut" }}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

const AI_REPLIES = [
  "Thank you. Can you specify the location and approximate time of the incident?",
  "Understood. Were there any witnesses present at the scene?",
  "I've noted that. Do you have any supporting evidence such as photos or video?",
  "Your report has been registered. A case officer will follow up within 24 hours.",
];

export default function VoiceChat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "ai",
      text: "Hello. I'm your AI-guided incident reporting assistant. Please describe the incident in your own words — I'll help you file an accurate report.",
    },
  ]);
  const [input, setInput] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [typing, setTyping] = useState(false);
  const replyIndex = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = AI_REPLIES[replyIndex.current % AI_REPLIES.length];
      replyIndex.current += 1;
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 1600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <CitizenLayout>
      <div className="max-w-3xl mx-auto space-y-5">

        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F766E] via-[#0e6b7c] to-[#134e7a] p-7 text-white shadow-lg">
          {/* subtle animated blobs */}
          {[
            { size: 220, top: -60, left: -60, color: "rgba(255,255,255,0.06)", dur: 14 },
            { size: 160, top: 20, right: -40, color: "rgba(255,255,255,0.04)", dur: 18 },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: b.size,
                height: b.size,
                background: b.color,
                top: b.top,
                left: (b as any).left,
                right: (b as any).right,
              }}
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -15, 0] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <div className="relative flex items-start gap-4">
            {/* icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Bot size={24} className="text-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold tracking-tight">AI-Guided Incident Reporting</h1>
                <span className="flex items-center gap-1 text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                  <Zap size={10} /> LIVE
                </span>
              </div>
              <p className="text-sm text-white/70">Speak or type — our AI will guide you step-by-step through your report.</p>

              {/* stat chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { icon: <ShieldCheck size={12} />, label: "End-to-End Encrypted" },
                  { icon: <Lock size={12} />, label: "Confidential Session" },
                  { icon: <Volume2 size={12} />, label: "Voice Enabled" },
                ].map((chip) => (
                  <span key={chip.label} className="flex items-center gap-1.5 text-[11px] bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">
                    {chip.icon} {chip.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Chat Window ── */}
        <SpotlightCard
          className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          spotlightColor="rgba(15,118,110,0.07)"
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/80">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Assistant — online
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <ShieldCheck size={13} className="text-teal-500" />
              Secure channel
            </div>
          </div>

          {/* messages */}
          <div className="p-5 h-[360px] overflow-y-auto space-y-4 bg-[#fafafa]">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-xs md:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-[#0F766E] to-[#0e6b7c] text-white rounded-br-sm"
                        : "bg-white text-gray-700 border border-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-sm">
                      <User size={14} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm shadow-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* input bar */}
          <div className="px-4 py-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3">

              {/* mic button */}
              <div className="relative flex-shrink-0">
                {micActive && (
                  <>
                    {[1, 2].map((r) => (
                      <motion.span
                        key={r}
                        className="absolute inset-0 rounded-full border-2 border-teal-400"
                        animate={{ scale: [1, 1.5 + r * 0.3], opacity: [0.5, 0] }}
                        transition={{ duration: 1.2, delay: r * 0.3, repeat: Infinity }}
                      />
                    ))}
                  </>
                )}
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    micActive
                      ? "bg-teal-500 text-white shadow-teal-200 shadow-md"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {micActive ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
              </div>

              {/* waveform or input */}
              <div className="flex-1 relative">
                {micActive ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl">
                    <Waveform />
                    <span className="text-xs text-teal-600 font-medium">Listening…</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Describe the incident…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all"
                  />
                )}
              </div>

              {/* send */}
              <button
                onClick={handleSend}
                disabled={!input.trim() && !micActive}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0F766E] to-[#0e6b7c] text-white flex items-center justify-center shadow-sm hover:shadow-teal-200 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </SpotlightCard>

        {/* ── Emergency Banner ── */}
        <div className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50 px-5 py-3 text-sm text-rose-700">
          <PhoneCall size={16} className="flex-shrink-0 text-rose-500" />
          <span>
            <span className="font-semibold">Immediate danger?</span> Call emergency services immediately —{" "}
            <span className="font-semibold">112</span> (India) or your local emergency number.
          </span>
        </div>

      </div>
    </CitizenLayout>
  );
}