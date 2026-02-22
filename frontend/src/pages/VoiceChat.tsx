import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Send, Mic, Paperclip } from "lucide-react";
import { useState } from "react";

export default function VoiceChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello. I'm here to help you report your incident safely. How can I assist you today?" }
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { sender: "user", text: input },
      { sender: "ai", text: "Thank you. I'm structuring your complaint. Please provide more details if necessary." }
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <div className="pt-32 px-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            AI Guided Reporting
          </h1>
          <p className="text-sm text-[#64748B]">
            Your conversation is secure and confidential.
          </p>
        </div>

        {/* Chat Container */}
<div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">

  {/* Chat Header */}
  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#F1F5F9]">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-sm font-semibold">
        AI
      </div>
      <div>
        <p className="text-sm font-medium">AI Reporting Assistant</p>
        <p className="text-xs text-gray-500">Secure • Confidential • Guided</p>
      </div>
    </div>

    <span className="text-xs text-[#0F766E] font-medium">
      Active Session
    </span>
  </div>

  {/* Messages */}
  <div className="p-6 h-[420px] overflow-y-auto space-y-4 bg-[#F8FAFC]">

    {messages.map((msg, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-[70%] p-3 rounded-md text-sm ${
          msg.sender === "user"
            ? "ml-auto bg-gray-200"
            : "bg-[#E6FFFA] border border-[#B2F5EA]"
        }`}
      >
        {msg.text}
      </motion.div>
    ))}

  </div>

  {/* Input Area */}
  <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center gap-3">
    <button className="text-gray-400 hover:text-gray-600">
      <Paperclip size={18} />
    </button>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      placeholder="Describe your incident..."
      className="flex-1 text-sm bg-[#F1F5F9] border border-gray-200 rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#0F766E]"
    />
    <button className="text-gray-400 hover:text-gray-600">
      <Mic size={18} />
    </button>
    <button
      onClick={handleSend}
      className="bg-[#0F766E] text-white p-2 rounded-md hover:bg-[#0D6B64]"
    >
      <Send size={16} />
    </button>
  </div>
</div>

      </div>
    </div>
  );
}