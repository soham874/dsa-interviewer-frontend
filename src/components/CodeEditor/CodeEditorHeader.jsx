import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { Home, Clock, Timer } from 'lucide-react';

export default function CodeEditorHeader({ noteText, attachCode, onBackToHome }) {
  const [sessionTime, setSessionTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  const formatSessionTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrentTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/logout`, { method: "POST", credentials: "include" });
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Code Editor</h2>
{/*           <p className="text-slate-300 text-sm">Write your code here</p> */}
        </div>
      </div>

      {/* Separator */}
              <div className="w-px h-6 bg-white/20"></div>

      {/* Center - Compact Time Displays */}
      <div className="flex items-center gap-6">
        {/* Session Timer */}
        <div className="flex flex-col items-center text-white">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-purple-300" />
            <span className="font-mono text-lg font-bold">
              {formatSessionTime(sessionTime)}
            </span>
          </div>
          <span className="text-xs text-purple-300 uppercase">Session</span>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-white/20"></div>

        {/* Current Time */}
        <div className="flex flex-col items-center text-white">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-300" />
            <span className="font-mono text-lg font-bold">
              {formatCurrentTime(currentTime)}
            </span>
          </div>
          <span className="text-xs text-blue-300 uppercase">Local Time</span>
        </div></div>
{/* Separator */}
        <div className="w-px h-6 bg-white/20"></div>
      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {attachCode && noteText.trim() && (
          <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-emerald-400/30">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-300">Ready</span>
          </div>
        )}

        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 border border-cyan-400/20 hover:border-cyan-400/40"
          title="Back to Homepage"
        >
          <Home className="w-4 h-4" />
          Home
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-200 border border-red-400/20 hover:border-red-400/40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}