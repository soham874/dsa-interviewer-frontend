import React from 'react';

export default function CodeEditorHeader({ noteText, attachCode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold">Code Editor</h2>
          <p className="text-slate-300 text-sm">Write your code here</p>
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
  );
}
