import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content, darkMode }) {
  return (
    <ReactMarkdown
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          // Force inline for single-line code without language specification
          const match = /language-(\w+)/.exec(className || '');
          const isInline = inline || (!match && !String(children).includes('\n'));

          return isInline ? (
            <code className={`px-1 py-0.5 mx-0.5 rounded text-sm font-mono ${
              darkMode
                ? 'bg-gray-700 text-gray-200'
                : 'bg-slate-100 text-slate-800'
            }`} {...props}>
              {children}
            </code>
          ) : (
            <pre className={`${darkMode ? 'bg-gray-900' : 'bg-slate-900'} text-slate-100 p-4 rounded-2xl overflow-x-auto shadow-inner border ${darkMode ? 'border-gray-700' : 'border-slate-700'} relative my-4`}>
              {match && (
                <div className="absolute right-4 top-4 text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {match[1]}
                </div>
              )}
              <code className={className} {...props}>{children}</code>
            </pre>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className={`border-l-4 pl-4 ${
            darkMode
              ? 'border-gray-700 bg-gray-800/50'
              : 'border-slate-300 bg-slate-50'
          } rounded-r-lg py-2 pr-4`}>
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className={`min-w-full border ${
              darkMode ? 'border-gray-700' : 'border-slate-200'
            }`}>
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className={`px-4 py-2 text-left ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-slate-100 border-slate-200'
          } border`}>
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className={`px-4 py-2 ${
            darkMode
              ? 'border-gray-700'
              : 'border-slate-200'
          } border`}>
            {children}
          </td>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}