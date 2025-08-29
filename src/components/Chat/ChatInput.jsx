import React, { useRef, useState } from 'react';
import { Mic, MicOff } from "lucide-react"; // professional icons

export default function ChatInput({
  darkMode,
  input,
  setInput,
  sendMessage,
  handleKeyDown,
  isLoading,
  attachCode,
  setAttachCode,
  noteText,
  textareaRef
}) {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // Start/stop voice input
  const toggleRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput((prev) => prev + (prev ? " " : "") + finalTranscript.trim());
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  return (
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
                onChange={(e) => setAttachCode(!e.target.checked)}
                className="w-4 h-4 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <span className="font-medium">Attach code from editor</span>
            {attachCode && noteText.trim() && (
              <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm border ${
                darkMode
                  ? 'bg-blue-900/50 text-blue-300 border-blue-700'
                  : 'bg-blue-100 text-blue-700 border-blue-200'
              }`}>
                {noteText.split('\n').length} lines ready
              </span>
            )}
          </label>
        </div>

        <form onSubmit={sendMessage} className="relative">
          <div className={`flex items-end rounded-2xl shadow-sm transition-all duration-200 border-2 ${
            darkMode
              ? attachCode && noteText.trim()
                ? 'bg-gray-700 border-blue-500 ring-2 ring-blue-900'
                : 'bg-gray-700 border-gray-600 hover:border-gray-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-900'
              : attachCode && noteText.trim()
                ? 'bg-white border-blue-300 ring-2 ring-blue-100'
                : 'bg-white border-slate-200 hover:border-slate-300 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100'
          }`}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Sarthi..."
              className={`flex-1 resize-none border-none outline-none p-4 rounded-2xl max-h-32 min-h-[52px] ${
                darkMode
                  ? 'bg-transparent text-gray-200 placeholder-gray-400'
                  : 'bg-transparent placeholder-slate-400'
              }`}
              rows="1"
              disabled={isLoading}
            />

            {/* Mic button */}
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-3 m-2 rounded-full transition-colors ${
                isRecording
                  ? "bg-red-500 text-white"
                  : darkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>
        </form>
        <p className={`text-xs text-center mt-3 ${darkMode ? 'text-gray-500' : 'text-slate-500'}`}>
          Sarthi can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
