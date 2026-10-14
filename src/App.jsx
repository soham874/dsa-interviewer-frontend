import React, { useState, useRef, useEffect, useCallback } from "react";
import ChatSection from './components/Chat/ChatSection';
import CodeEditor from './components/CodeEditor/CodeEditor';
import { API_BASE_URL } from './config';
import { useTheme } from './components/common/ThemeProvider';
import { readEventStream } from './utils/eventStream';

// Version 2 of the chat stream sends JSON events, including question cards
const STREAM_PROTOCOL = 2;

// Bounds for the code editor pane, as a percent of the chat + editor row
const MIN_EDITOR_WIDTH = 30;
const MAX_EDITOR_WIDTH = 70;

const newId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

const REQUEST_ERRORS = {
  401: "Your sign-in has expired. Please log in again.",
  404: "This session could not be found for your account.",
  409: "Sarthi is still replying to your previous message. Please wait a moment.",
};

// Converts a transcript message from the backend into the shape the chat renders
const fromTranscript = (msg) => {
  if (msg.role === 'user') {
    return {
      id: newId(),
      sender: 'user',
      text: msg.content,
      hasAttachedCode: Boolean(msg.code),
      attachedCode: msg.code || null,
    };
  }
  return {
    id: newId(),
    sender: 'assistant',
    kind: msg.question ? 'question_card' : 'text',
    question: msg.question || null,
    text: msg.content,
  };
};

export default function App({ sessionId }) {
  const [sessionUuid, setSessionUuid] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [attachCode, setAttachCode] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const codeEditorRef = useRef(null);
  const noteTextRef = useRef(noteText);
  const panesRef = useRef(null);
  const [editorWidth, setEditorWidth] = useState(50); // percent of the panes row
  const { darkMode } = useTheme();

  noteTextRef.current = noteText;

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

  // Stable, so memoised messages do not re-render when the editor changes
  const handleUseStarterCode = useCallback((starterCode) => {
    const current = noteTextRef.current.trim();
    if (current && current !== starterCode.trim()
      && !window.confirm("Replace the code in the editor with the starter code?")) {
      return;
    }
    setNoteText(starterCode);
  }, []);

  const appendAssistantMessage = (text) => {
    setMessages((prev) => [...prev, { id: newId(), sender: "assistant", text, timestamp: now() }]);
  };

  // Load session details
  const loadSessionDetails = async (uuid) => {
    try {
      setIsLoadingSession(true);
      const response = await fetch(`${API_BASE_URL}/sessions/${uuid}/transcript`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((data.messages || []).map(fromTranscript));
      } else {
        console.error('Failed to load session details:', response.status);
        if (REQUEST_ERRORS[response.status]) {
          setMessages([{ id: newId(), sender: "assistant", text: REQUEST_ERRORS[response.status] }]);
        }
      }
    } catch (error) {
      console.error("Error loading session details:", error);
    } finally {
      setIsLoadingSession(false);
    }
  };

  useEffect(() => {
    // Initialize session and load details
    let newUuid = sessionId;
    if (newUuid === null) {
      newUuid = crypto.randomUUID();
    }
    setSessionUuid(newUuid);
    localStorage.setItem('session_uuid', newUuid);

    // Load session details after setting the UUID
    loadSessionDetails(newUuid);
  }, [sessionId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const code = attachCode && noteText.trim() ? noteText : null;

    setMessages((prev) => [...prev, {
      id: newId(),
      sender: "user",
      text: input,
      hasAttachedCode: Boolean(code),
      attachedCode: code,
      timestamp: now()
    }]);
    setInput("");
    setIsLoading(true);
    setStatusText("");

    // The assistant message that streamed text is appended to; a question card starts a new one
    let textMessageId = null;

    const appendText = (text) => {
      if (!textMessageId) {
        const id = newId();
        textMessageId = id;
        setMessages((prev) => [...prev, { id, sender: "assistant", text, timestamp: now() }]);
        return;
      }
      const id = textMessageId;
      setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, text: msg.text + text } : msg)));
    };

    const handleEvent = (name, data) => {
      if (name === "token") {
        setStatusText("");
        appendText(JSON.parse(data).text);
      } else if (name === "question") {
        textMessageId = null;
        const question = JSON.parse(data);
        setMessages((prev) => [...prev, {
          id: newId(), sender: "assistant", kind: "question_card", question, text: "", timestamp: now()
        }]);
      } else if (name === "status") {
        setStatusText(JSON.parse(data).text);
      } else if (name === "error") {
        textMessageId = null;
        appendAssistantMessage(JSON.parse(data).message);
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          session_id: localStorage.getItem('session_uuid'),
          message: input,
          code,
          protocol: STREAM_PROTOCOL,
        }),
      });

      if (!response.ok) {
        appendAssistantMessage(REQUEST_ERRORS[response.status] || "Sorry, I encountered an error. Please try again.");
        return;
      }

      await readEventStream(response, handleEvent);
    } catch (error) {
      console.error("Error:", error);
      appendAssistantMessage("Sorry, I encountered an error. Please try again.");
    } finally {
      setStatusText("");
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

  const clampEditorWidth = (pct) => Math.min(MAX_EDITOR_WIDTH, Math.max(MIN_EDITOR_WIDTH, pct));

  // Drag the divider to resize the editor; the chat pane takes the remaining width
  const startResize = (e) => {
    e.preventDefault();
    const rowWidth = panesRef.current.getBoundingClientRect().width;
    const startX = e.clientX;
    const startWidth = editorWidth;
    const onMove = (ev) => {
      setEditorWidth(clampEditorWidth(startWidth + ((startX - ev.clientX) / rowWidth) * 100));
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleResizeKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setEditorWidth((w) => clampEditorWidth(w + 2));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setEditorWidth((w) => clampEditorWidth(w - 2));
    }
  };

  return (
        <div className={`h-screen p-4 ${darkMode
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
      : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50'}`}>
      <div ref={panesRef} className="flex h-full">
      <ChatSection
        messages={messages}
        isLoading={isLoading}
        isLoadingSession={isLoadingSession}
        statusText={statusText}
        onUseStarterCode={handleUseStarterCode}
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
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize code editor"
        aria-valuenow={Math.round(editorWidth)}
        aria-valuemin={MIN_EDITOR_WIDTH}
        aria-valuemax={MAX_EDITOR_WIDTH}
        tabIndex={0}
        onPointerDown={startResize}
        onKeyDown={handleResizeKeyDown}
        onDoubleClick={() => setEditorWidth(50)}
        title="Drag to resize, double-click to reset"
        className="group flex-shrink-0 w-4 flex items-center justify-center cursor-col-resize outline-none"
      >
        <div className={`w-1 h-16 rounded-full transition-colors group-hover:bg-blue-500 group-focus-visible:bg-blue-500 ${
          darkMode ? 'bg-slate-600' : 'bg-slate-300'
        }`} />
      </div>
      <CodeEditor
        width={editorWidth}
        noteText={noteText}
        setNoteText={setNoteText}
        attachCode={attachCode}
        handleCodeEditorKeyDown={handleCodeEditorKeyDown}
      />
      </div>
    </div>
  );
}