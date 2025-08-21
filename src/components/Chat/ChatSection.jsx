import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatSection({
  darkMode,
  setDarkMode,
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
  return (
    <div className={`flex flex-col w-1/2 shadow-xl rounded-2xl overflow-hidden ${darkMode
      ? 'bg-gray-800 border border-gray-700'
      : 'bg-white border border-slate-100'}`}>
      <ChatHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Chat Messages */}
      <div className={`flex-1 overflow-y-auto p-4 ${darkMode
        ? 'bg-gray-800/50'
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
