import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [attachCode, setAttachCode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const codeEditorRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Prepare the message content
    let messageContent = input;
    let hasAttachedCode = false;

    if (attachCode && noteText.trim()) {
      messageContent = `${input} - CODE - "${noteText}"`;
      hasAttachedCode = true;
    }

    const userMessage = {
      sender: "user",
      text: input,
      hasAttachedCode: hasAttachedCode,
      attachedCode: hasAttachedCode ? noteText : null
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: "1234", message: messageContent }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Add a placeholder assistant message
      let assistantMessage = { sender: "assistant", text: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      const updateAssistantMessage = (newText) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: newText,
          };
          return updated;
        });
      };

      let buffer = "";
      let fullResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const chunk = line.slice(6);
            if (chunk.trim() === "end") continue;

            fullResponse += chunk;
            updateAssistantMessage(fullResponse);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, {
        sender: "assistant",
        text: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleCodeEditorKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert tab character
      const newValue = noteText.substring(0, start) + '\t' + noteText.substring(end);
      setNoteText(newValue);

      // Move cursor after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div className={`flex h-screen p-4 gap-4 ${darkMode 
      ? 'bg-gradient-to-br from-gray-900 to-slate-800' 
      : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      {/* Chat Section - Left Half */}
      <div className={`flex flex-col w-1/2 shadow-xl rounded-2xl overflow-hidden ${darkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-slate-100'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-sm relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">Sarthi - Your DSA Coach</h1>
              </div>
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto p-4 ${darkMode 
          ? 'bg-gray-800/50' 
          : 'bg-slate-50/30'}`}>
          {messages.length === 0 ? (
            // Welcome screen
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-white/20">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  How can I help you today?
                </h2>
                <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                  Ask me about coding, debugging, or any technical questions!
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-full space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    {msg.sender === "user" ? (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md border border-blue-200">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md border border-purple-200">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {msg.sender === "user" ? (
                      // User message with bubble
                      <div className="max-w-[85%] ml-auto">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-tr-md shadow-md border border-blue-400/20">
                          <div className="prose prose-invert max-w-none text-white text-sm">
                            <ReactMarkdown
                              components={{
                                code: ({ node, inline, className, children, ...props }) => {
                                  return inline ? (
                                    <code className="bg-blue-400/30 text-blue-100 px-1.5 py-0.5 rounded-lg text-sm font-mono border border-blue-300/30" {...props}>
                                      {children}
                                    </code>
                                  ) : (
                                    <pre className={`${darkMode ? 'bg-gray-900' : 'bg-slate-900'} text-slate-100 p-3 rounded-xl overflow-x-auto shadow-inner border ${darkMode ? 'border-gray-700' : 'border-slate-700'}`}>
                                      <code {...props}>{children}</code>
                                    </pre>
                                  );
                                }
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        </div>

                        {/* Code Attachment for User */}
                        {msg.hasAttachedCode && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-emerald-700">Code Attachment</span>
                              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full border border-emerald-200">
                                {msg.attachedCode.split('\n').length} lines
                              </span>
                            </div>
                            <pre className="text-sm bg-slate-900 text-slate-100 p-3 rounded-xl overflow-x-auto shadow-inner font-mono border border-slate-700">
                              <code>{msg.attachedCode}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Assistant message without bubble
                      <div className={`prose max-w-none text-sm ${darkMode ? 'prose-invert text-gray-200' : 'prose-slate text-slate-800'}`}>
                        <ReactMarkdown
                          components={{
                            code: ({ node, inline, className, children, ...props }) => {
                              return inline ? (
                                <code className={`px-1.5 py-0.5 rounded-lg text-sm font-mono ${
                                  darkMode 
                                    ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                                }`} {...props}>
                                  {children}
                                </code>
                              ) : (
                                <pre className={`${darkMode ? 'bg-gray-900' : 'bg-slate-900'} text-slate-100 p-4 rounded-2xl overflow-x-auto shadow-inner border ${darkMode ? 'border-gray-700' : 'border-slate-700'}`}>
                                  <code {...props}>{children}</code>
                                </pre>
                              );
                            }
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md border border-purple-200">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="ml-3 text-slate-600 text-sm">Sarthi is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`p-6 shadow-sm ${darkMode 
          ? 'bg-gray-800 border-t border-gray-700' 
          : 'bg-white border-t border-slate-200'}`}>
          <div className="max-w-full">
            {/* Attach Code Checkbox */}
            <div className="mb-4">
              <label className={`flex items-center gap-3 text-sm cursor-pointer group transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-gray-200' 
                  : 'text-slate-700 hover:text-slate-800'
              }`}>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={attachCode}
                    onChange={(e) => setAttachCode(e.target.checked)}
                    className="w-4 h-4 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <div className="w-5 h-5 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors border border-slate-200">
                  <svg className="w-3 h-3 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                </div>
                <span className="font-medium">Attach code from editor</span>
                {attachCode && noteText.trim() && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium shadow-sm border border-blue-200">
                    {noteText.split('\n').length} lines ready
                  </span>
                )}
              </label>
            </div>

            <form onSubmit={sendMessage} className="relative">
              <div className={`flex items-end bg-white rounded-2xl shadow-sm transition-all duration-200 border-2 ${
                attachCode && noteText.trim()
                  ? 'border-blue-300 ring-2 ring-blue-100'
                  : 'border-slate-200 hover:border-slate-300 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100'
              }`}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Sarthi..."
                  className="flex-1 resize-none border-none outline-none p-4 rounded-2xl max-h-32 min-h-[52px] placeholder-slate-400"
                  rows="1"
                  disabled={isLoading}
                />
              </div>
            </form>
            <p className="text-xs text-slate-500 text-center mt-3">
              Sarthi can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>

      {/* Notes Section - Right Half */}
      <div className={`flex flex-col w-1/2 shadow-xl rounded-2xl overflow-hidden ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-slate-100'
      }`}>
        {/* Notes Header */}
        <div className={`p-6 shadow-sm ${
          darkMode 
            ? 'bg-gradient-to-r from-gray-800 to-slate-900' 
            : 'bg-gradient-to-r from-slate-700 to-slate-800'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Code Editor</h2>
                <p className="text-slate-300 text-sm">Write and test your code</p>
              </div>
            </div>
            {attachCode && noteText.trim() && (
              <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-2 rounded-xl backdrop-blur-sm border border-emerald-400/30">
                <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm font-medium text-emerald-300">Ready to attach</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes Text Area */}
        <div className={`flex-1 p-6 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-slate-50 to-slate-100'
        }`}>
          <div className="h-full relative">
            <textarea
              ref={codeEditorRef}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleCodeEditorKeyDown}
              placeholder="// Start coding here...
function example() {
  console.log('Hello, Sarthi!');
}"
              className={`w-full h-full resize-none rounded-2xl p-6 outline-none transition-all duration-200 shadow-sm font-mono text-sm leading-relaxed border-2 ${
                darkMode
                  ? attachCode && noteText.trim()
                    ? 'border-emerald-500/30 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900 bg-gray-900 text-gray-100'
                    : 'border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 bg-gray-900 text-gray-100 hover:border-gray-600'
                  : attachCode && noteText.trim()
                    ? 'border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 bg-emerald-50/50'
                    : 'border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 bg-white hover:border-slate-300'
              }`}
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.6'
              }}
            />
            {noteText.trim() && (
              <div className="absolute bottom-4 right-4 bg-slate-800/90 text-white px-3 py-1 rounded-xl text-xs font-mono backdrop-blur-sm border border-slate-600">
                {noteText.split('\n').length} lines, {noteText.length} chars
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}