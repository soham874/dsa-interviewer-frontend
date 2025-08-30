import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../common/ThemeProvider';

export default function ChatHeader() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-sm relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Sarthi - Your DSA Coach</h1>
          </div>
        </div>
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      </div>
    </div>
  );
}
