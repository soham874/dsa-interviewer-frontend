import React, { useRef } from 'react';
import CodeEditorHeader from './CodeEditorHeader';
import { useTheme } from '../common/ThemeProvider';

export default function CodeEditor({
  noteText,
  setNoteText,
  attachCode,
  handleCodeEditorKeyDown
}) {
  const { darkMode } = useTheme();
  const codeEditorRef = useRef(null);

  return (
    <div className={`flex flex-col w-1/2 shadow-xl rounded-2xl overflow-hidden ${
      darkMode
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-slate-100'
    }`}>
      {/* Header */}
      <div className={`p-6 shadow-sm ${
        darkMode
          ? 'bg-gradient-to-r from-gray-800 to-slate-900'
          : 'bg-gradient-to-r from-slate-700 to-slate-800'
      } text-white`}>
        <CodeEditorHeader noteText={noteText} attachCode={attachCode} />
      </div>

      {/* Editor Area */}
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
class Solution(){
    public static void main(String[] args){
        System.out.println(&quot;Hello Sarthi!&quot;);
    }
}
"
            className={`w-full h-full resize-none rounded-2xl p-6 outline-none transition-all duration-200 shadow-sm font-mono text-sm leading-relaxed border-2 ${
              darkMode
                ? attachCode && noteText.trim()
                  ? 'border-emerald-500/30 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900 bg-gray-900 text-gray-100 placeholder-gray-500'
                  : 'border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 bg-gray-900 text-gray-100 hover:border-gray-600 placeholder-gray-500'
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
            <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-xl text-xs font-mono backdrop-blur-sm border ${
              darkMode
                ? 'bg-slate-800/90 text-white border-slate-600'
                : 'bg-white/90 text-slate-700 border-slate-300'
            }`}>
              {noteText.split('\n').length} lines, {noteText.length} chars
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
