import React, { useState, useRef, useEffect } from "react";

// Simple chat UI with a mock AI response. Replace the placeholder
// with your API call when integrating a real assistant.
export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [
      ...msgs,
      { from: "user", text: input },
      { from: "ai", text: "[AI response placeholder]" }
    ]);
    setInput("");
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[70vh] bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 rounded-3xl shadow-xl border border-[#2d3440] p-6">
      <h2 className="text-2xl font-semibold text-blue-200 mb-4 tracking-tight">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-xl max-w-[80%] text-base ${msg.from === "ai" ? "bg-blue-900/40 text-blue-200 self-start" : "bg-blue-600 text-white self-end ml-auto"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-lg bg-[#181c24] text-blue-100 border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask me anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
