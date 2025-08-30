import React from 'react';
import { Brain, Sun, Moon, LogOut } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { useTheme } from '../common/ThemeProvider';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/logout`, { method: "POST", credentials: "include" });
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <header className={`${darkMode ? 'bg-slate-900/90 backdrop-blur-lg border-slate-700/50' : 'bg-white/90 backdrop-blur-lg border-gray-200/50'} border-b sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Sarthi
                </h1>
                <p className="text-xs text-purple-400 font-medium -mt-1">Your Progress HQ</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700'
              } transform hover:scale-105`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2 text-sm text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all duration-300 border border-red-400/20 hover:border-red-400/40 transform hover:scale-105"
            >
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Peace Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}