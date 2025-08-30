import React, { useState, useEffect } from 'react';
import { Rocket, Star, Code2, Sparkles } from 'lucide-react';
import App from '../../App';
import { API_BASE_URL } from '../../config';
import { Brain, Sun, Moon, LogOut } from 'lucide-react';

export default function FirstTimeUser({ darkMode }) {
  const [currentView, setCurrentView] = useState('login');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (currentView === 'App') {
    return <App/>;
  }

  const handleStartSession = () => {
    if (isMobile) {
      return; // Don't start session on mobile
    }
    setCurrentView('App');
  };

    const handleLogout = async () => {
        await fetch(`${API_BASE_URL}/logout`, { method: "POST", credentials: "include" });
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} flex items-center justify-center p-4 relative overflow-hidden`}>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className={`relative z-10 max-w-4xl w-full ${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50' : 'bg-white/80 backdrop-blur-lg border-white/40'} rounded-3xl p-8 md:p-12 border shadow-2xl text-center`}>
        {/* Logout Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 text-sm text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all duration-300 border border-red-400/20 hover:border-red-400/40 transform hover:scale-105"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">Peace Out</span>
          </button>
        </div>

        {/* Hero Icon */}
        <div className="relative mb-8">
          <div className={`w-32 h-32 mx-auto ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-full flex items-center justify-center relative overflow-hidden`}>
            <Rocket className="w-16 h-16 text-white animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 animate-pulse"></div>
          </div>
          <div>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className={`text-5xl md:text-6xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Welcome to Your <span className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Glow Up</span> Era!
        </h1>

        <p className={`text-xl md:text-2xl mb-4 ${darkMode ? 'text-slate-300' : 'text-gray-600'} font-medium`}>
          Time to transform from code newbie to absolute unit 🚀
        </p>

        <p className={`text-lg mb-12 ${darkMode ? 'text-slate-400' : 'text-gray-500'} max-w-2xl mx-auto`}>
          Start grinding to unlock your personalized dashboard. We'll track every W, every L, and create your custom redemption arc plan. No cap 📈
        </p>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className={`${darkMode ? 'bg-slate-700/30 border-slate-600/30' : 'bg-gray-50/80 border-gray-200'} rounded-2xl p-6 border`}>
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Track Your Stats</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>See exactly where you're slaying and where you need work</p>
          </div>

          <div className={`${darkMode ? 'bg-slate-700/30 border-slate-600/30' : 'bg-gray-50/80 border-gray-200'} rounded-2xl p-6 border`}>
            <Code2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>LeetCode Integration</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Build your LC profile while getting interview-ready</p>
          </div>

          <div className={`${darkMode ? 'bg-slate-700/30 border-slate-600/30' : 'bg-gray-50/80 border-gray-200'} rounded-2xl p-6 border`}>
            <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Adaptive Learning</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>AI that remembers your weak spots and fixes them</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center">
          {isMobile ? (
            <div className={`${darkMode ? 'bg-orange-900/20 border-orange-800/50' : 'bg-orange-100 border-orange-200'} border rounded-2xl p-6 mb-6 max-w-md`}>
              <div className="text-center">
                <span className="text-4xl mb-3 block">📱❌</span>
                <p className={`font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'} mb-2`}>
                  Bruh, seriously?
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                  You can't code on a phone bestie. Get on a real computer and come back when you're ready to lock in 💻
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartSession}
              className={`group px-12 py-5 ${
                darkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
              } text-white rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden`}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Start Your Villain Arc
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          )}

          <p className={`text-sm text-gray-1000 mt-4 max-w-md`}>
            {isMobile ?
              "Mobile coding hits different (and not in a good way) 📵" :
              "Built on LeetCode • Progress tracked forever • Zero fake encouragement ✨"
            }
          </p>
        </div>
      </div>
    </div>
  );
}