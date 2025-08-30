import React from 'react';
import { BarChart3, Sun, Moon } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { useTheme } from '../common/ThemeProvider';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();

    const handleLogout = async () => {
        await fetch(`${API_BASE_URL}/logout`, { method: "POST", credentials: "include" });
        localStorage.clear();  // if you stored anything client-side
        sessionStorage.clear(); // if you stored anything in session
        window.location.reload();
      };

  return (
    <header className={`${darkMode ? 'bg-slate-800/80 backdrop-blur-lg border-slate-700' : 'bg-white/80 backdrop-blur-lg border-gray-200'} border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-10 h-10 ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-lg flex items-center justify-center`}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} ml-3`}>
              Learning Progress
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} ml-3`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-200 border border-red-400/20 hover:border-red-400/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
