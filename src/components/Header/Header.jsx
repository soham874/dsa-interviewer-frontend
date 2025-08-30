import React from 'react';
import { BarChart3, Sun, Moon } from 'lucide-react';

export default function Header({ darkMode, onDarkModeToggle }) {
  return (
    <header className={`${darkMode ? 'bg-slate-800/80 backdrop-blur-lg border-slate-700' : 'bg-white/80 backdrop-blur-lg border-gray-200'} border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-lg flex items-center justify-center`}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Learning Progress
            </h1>
          </div>
          <button
            onClick={onDarkModeToggle}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
