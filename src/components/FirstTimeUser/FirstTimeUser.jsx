import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import App from '../../App';

export default function FirstTimeUser({ darkMode }) {

    const [currentView, setCurrentView] = useState('login');
    if (currentView === 'App') {
            return <App/>;
          }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} flex items-center justify-center p-4`}>
      <div className={`max-w-2xl w-full ${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700' : 'bg-white/70 backdrop-blur-lg border-white/20'} rounded-3xl p-8 border shadow-2xl text-center`}>
        <div className={`w-24 h-24 mx-auto mb-6 ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-full flex items-center justify-center`}>
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Welcome to Your Learning Journey!
        </h1>
        <p className={`text-xl mb-8 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          Start practicing to generate your personalized progress report and unlock insights about your learning patterns.
        </p>
        <div className="flex flex-col items-center justify-center mt-8">
                  <button
                    onClick={() => setCurrentView('App')}
                    className={`px-8 py-4 ${
                      darkMode
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    } text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
                  >
                    Begin your session
                  </button>
                </div>
      </div>
    </div>
  );
}
