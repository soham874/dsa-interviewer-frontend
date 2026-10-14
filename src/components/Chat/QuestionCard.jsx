import React from 'react';
import { ClipboardCopy } from 'lucide-react';
import MarkdownRenderer from '../common/MarkdownRenderer';

export default function QuestionCard({ question, darkMode, onUseStarterCode }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-md border ${
      darkMode ? 'bg-gray-900/60 border-gray-700' : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
          Question {question.number} of {question.total}
        </div>
        <h3 className="text-lg font-bold leading-snug">{question.title}</h3>
      </div>

      <div className="p-5">
        {/* Problem statement */}
        <div className={`prose max-w-none text-sm ${
          darkMode
            ? 'prose-invert text-gray-200 prose-strong:text-gray-100'
            : 'prose-slate text-slate-800 prose-strong:text-slate-900'
        } prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-pre:my-2`}>
          <MarkdownRenderer content={question.markdown} darkMode={darkMode} />
        </div>

        {/* Starter code */}
        {question.starter_code && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Starter code (Java)
              </span>
              <button
                type="button"
                onClick={() => onUseStarterCode(question.starter_code)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  darkMode
                    ? 'text-blue-300 bg-blue-500/10 border-blue-400/30 hover:bg-blue-500/20'
                    : 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <ClipboardCopy className="w-4 h-4" />
                Copy to editor
              </button>
            </div>
            <pre className={`text-sm p-4 rounded-xl overflow-x-auto font-mono border ${
              darkMode ? 'bg-gray-950 text-gray-100 border-gray-800' : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}>
              <code>{question.starter_code}</code>
            </pre>
          </div>
        )}

        <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
          Read the question, then walk me through your approach before you write any code.
        </p>
      </div>
    </div>
  );
}
