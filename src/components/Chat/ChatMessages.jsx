import React from 'react';
import MarkdownRenderer from '../common/MarkdownRenderer';

export default function ChatMessages({ messages, isLoading, darkMode }) {
  if (messages.length === 0) {
    return (
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
    );
  }

  return (
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
              <div className="max-w-[85%] ml-auto">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-tr-md shadow-md border border-blue-400/20">
                  <div className="prose prose-invert max-w-none text-white text-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:my-2 prose-blockquote:my-2 prose-hr:my-4">
                    <MarkdownRenderer content={msg.text} darkMode={true} />
                  </div>
                </div>

                {/* Code Attachment for User */}
                {msg.hasAttachedCode && (
                  <div className={`mt-3 p-4 rounded-2xl shadow-sm border ${
                    darkMode
                      ? 'bg-gradient-to-r from-emerald-900/50 to-blue-900/50 border-emerald-700/50'
                      : 'bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>Code Attachment</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        darkMode
                          ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700'
                          : 'bg-emerald-100 text-emerald-600 border-emerald-200'
                      }`}>
                        {msg.attachedCode.split('\n').length} lines
                      </span>
                    </div>
                    <pre className={`text-sm p-3 rounded-xl overflow-x-auto shadow-inner font-mono border ${
                      darkMode
                        ? 'bg-gray-900 text-gray-100 border-gray-700'
                        : 'bg-slate-900 text-slate-100 border-slate-700'
                    }`}>
                      <code>{msg.attachedCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className={`prose max-w-none text-sm ${
                darkMode
                  ? 'prose-invert text-gray-200 prose-headings:text-gray-100 prose-a:text-blue-400 prose-strong:text-gray-100 prose-li:marker:text-gray-400'
                  : 'prose-slate text-slate-800 prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900'
              } prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:my-2 prose-blockquote:my-2 prose-hr:my-4`}>
                <MarkdownRenderer content={msg.text} darkMode={darkMode} />
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
            <span className={`ml-3 text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Sarthi is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
}
