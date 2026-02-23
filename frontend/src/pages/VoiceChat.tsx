import { useState } from "react";
import CitizenLayout from "../components/CitizenLayout";
import { motion } from "framer-motion";
import { Mic, Send } from "lucide-react";

export default function VoiceChat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello. I'm here to assist you in filing your report. Please describe the incident in your own words.",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { sender: "user", text: input },
      {
        sender: "ai",
        text: "Thank you. Can you specify the location and approximate time of the incident?",
      },
    ]);

    setInput("");
  };

  return (
    <CitizenLayout>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            AI-Guided Incident Reporting
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Your conversation is encrypted and confidential.
          </p>
        </div>

        {/* Safe Mode Banner */}
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] p-4 rounded-md mb-6">
          Safe Mode Enabled — This session is private and protected.
        </div>

        {/* Chat Window */}
        <div className="bg-white border border-gray-200 rounded-md p-6 h-[400px] overflow-y-auto space-y-4">

          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-[#0F766E] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3 mt-6">
          <button className="p-3 bg-gray-100 rounded-md hover:bg-gray-200">
            <Mic size={18} />
          </button>

          <input
            type="text"
            placeholder="Describe the incident..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F766E]"
          />

          <button
            onClick={handleSend}
            className="p-3 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58]"
          >
            <Send size={18} />
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-xs text-gray-400">
          In case of immediate danger, please contact emergency services directly.
        </div>

      </div>
    </CitizenLayout>
  );
}