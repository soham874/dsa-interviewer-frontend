import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [threadId] = useState("1234"); // fixed thread for demo
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Call backend (streaming)
    const response = await fetch("http://localhost:8080/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thread_id: threadId, message: input }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let botMsg = { sender: "bot", text: "" };

    setMessages((prev) => [...prev, botMsg]); // placeholder bot msg

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((l) => l.startsWith("data:"));
      for (let line of lines) {
        const data = line.replace("data: ", "").trim();
        if (data && data !== "end") {
          botMsg.text += data;
          setMessages((prev) =>
            prev.map((m, i) =>
              i === prev.length - 1 ? { ...botMsg } : m
            )
          );
        }
      }
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gray-100">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-white text-gray-800 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div className="p-4 border-t flex">
        <input
          className="flex-1 p-2 rounded-lg border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
