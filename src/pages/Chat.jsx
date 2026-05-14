import { useState } from "react";
import { MOCK_USERS } from "../data/mockData";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alex",
      text: "Hey team! Standup in 10 mins 🙌",
      time: "9:00 AM"
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Manisha",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="p-6 flex flex-col h-[90vh]">
      <h1 className="text-3xl font-bold mb-6">
        Team Chat
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold">
                {msg.sender.charAt(0)}
              </div>

              <div>
                <p className="font-semibold">
                  {msg.sender}
                </p>

                <p className="text-xs text-gray-500">
                  {msg.time}
                </p>
              </div>
            </div>

            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:bg-slate-900"
        />

        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}