import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useTheme } from '../common/ThemeProvider';

export default function ChatSection({
  messages,
  isLoading,
  input,
  setInput,
  sendMessage,
  handleKeyDown,
  attachCode,
  setAttachCode,
  noteText,
  textareaRef,
  chatEndRef
}) {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className={`flex flex-col w-1/2 shadow-xl rounded-2xl overflow-hidden backdrop-blur-lg ${darkMode
      ? 'bg-slate-800/50 border border-slate-700/50'
      : 'bg-white/80 border border-white/40'}`}>
      <ChatHeader />

      {/* Chat Messages */}
      <div className={`flex-1 overflow-y-auto p-4 ${darkMode
        ? 'bg-slate-800/30'
        : 'bg-slate-50/30'}`}>
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          darkMode={darkMode}
        />
        <div ref={chatEndRef} />
      </div>

      <ChatInput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
        attachCode={attachCode}
        setAttachCode={setAttachCode}
        noteText={noteText}
        textareaRef={textareaRef}
      />
    </div>
  );
}
