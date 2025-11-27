// Bot.jsx

import React, { useState } from "react";

const messagesDemo = [
  { type: "bot", text: "👋 Hi Akash! How can I help you today?" },
  { type: "user", text: "Show me some cool chatbot UI ideas." },
  { type: "bot", text: "Sure! 😎 Here’s a modern, glassy chat interface. Try sending a message below!" },
];

export default function Bot() {
  const [messages, setMessages] = useState(messagesDemo);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { type: "bot", text: `🤖 You said: "${input}". How else can I help?` },
      ]);
    }, 700);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800 py-8 px-4">
      <div className="relative w-full max-w-lg mx-auto rounded-3xl shadow-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 flex flex-col h-[32rem]">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-indigo-200 tracking-wide drop-shadow-sm">
            🤖 Cool Bot Chat
          </h1>
          <p className="text-indigo-300 text-sm mt-1">Powered by React & TailwindCSS</p>
        </header>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 pb-5">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} mb-2`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-xl text-base ${
                  msg.type === "bot"
                    ? "bg-indigo-600 bg-opacity-70 text-white mr-auto"
                    : "bg-white/80 text-indigo-900 ml-auto"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute left-0 right-0 bottom-0 p-5 bg-gradient-to-t from-black/30 to-transparent rounded-b-3xl">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-xl bg-white/80 text-gray-800 focus:outline-none shadow-inner"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
