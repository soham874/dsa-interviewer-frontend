import React, { useState, useRef, useEffect } from "react";
import ChatSection from './components/Chat/ChatSection';
import CodeEditor from './components/CodeEditor/CodeEditor';
import { API_BASE_URL } from './config';
import { useTheme } from './components/common/ThemeProvider';

export default function App() {
  const [sessionUuid, setSessionUuid] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [attachCode, setAttachCode] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const codeEditorRef = useRef(null);
  const { darkMode } = useTheme();

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

  useEffect(() => {
    // Refresh token on page reload
    const newUuid = crypto.randomUUID();
    setSessionUuid(newUuid);
    localStorage.setItem('session_uuid', newUuid);
  }, []);

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

      const session_uuid_val = localStorage.getItem('session_uuid');

      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ session_uuid: session_uuid_val, message: messageContent }),
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

        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE messages (separated by \n\n)
        let parts = buffer.split('\n\n');

        // Keep the last part in buffer (might be incomplete)
        buffer = parts.pop() || "";

        // Process complete SSE messages
        for (const part of parts) {
          if (part.trim() === '') continue;

          const lines = part.split('\n');
          let eventType = null;
          let dataLines = [];

          for (const line of lines) {
            if (line.startsWith('event: ')) {
              eventType = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
              dataLines.push(line.slice(6));
            }
          }

          // Handle the data
          if (dataLines.length > 0) {
            // Join all data lines for this SSE message
            const data = dataLines.join('\n');

            if (eventType === 'end' || data.trim() === 'end') {
              // Stream ended
              break;
            } else {
              // Regular data chunk - handle escaped newlines
              let chunk = data;
              if (data.includes('\\n')) {
                chunk = data.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
              }
              fullResponse += chunk;
              updateAssistantMessage(fullResponse);
            }
          }
        }
      }

      // Process any remaining data in buffer
      if (buffer.trim()) {
        const lines = buffer.split('\n');
        let dataLines = [];

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            dataLines.push(line.slice(6));
          }
        }

        if (dataLines.length > 0) {
          const data = dataLines.join('\n');
          let chunk = data;
          if (data.includes('\\n')) {
            chunk = data.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
          }
          fullResponse += chunk;
          updateAssistantMessage(fullResponse);
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

      // Modern approach that preserves native undo
      e.target.setRangeText('\t', e.target.selectionStart, e.target.selectionEnd, 'end');

      // Trigger the onChange event manually since setRangeText doesn't
      const event = new Event('input', { bubbles: true });
      e.target.dispatchEvent(event);
    }
  };

  return (
        <div className={`flex h-screen p-4 gap-4 ${darkMode
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
      : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50'}`}>
      <ChatSection
        messages={messages}
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        handleKeyDown={handleKeyDown}
        attachCode={attachCode}
        setAttachCode={setAttachCode}
        noteText={noteText}
        textareaRef={textareaRef}
        chatEndRef={chatEndRef}
      />
      <CodeEditor
        noteText={noteText}
        setNoteText={setNoteText}
        attachCode={attachCode}
        handleCodeEditorKeyDown={handleCodeEditorKeyDown}
      />
    </div>
  );
}