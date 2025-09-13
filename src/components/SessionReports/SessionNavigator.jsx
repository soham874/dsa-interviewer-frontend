import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SessionNavigator = ({ 
  darkMode, 
  currentSession, 
  totalSessions, 
  currentReport, 
  formatDate, 
  onSessionChange, 
  isAnimating 
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <button
        onClick={() => onSessionChange('prev')}
        disabled={currentSession === 0 || isAnimating}
        className={`p-2 rounded-xl ${
          darkMode 
            ? 'bg-slate-800 border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700' 
            : 'bg-white border border-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
        } transition-colors`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="text-center">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Session {currentSession + 1} of {totalSessions}
        </h2>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          {formatDate(currentReport.created_at)}
        </p>
      </div>
      
      <button
        onClick={() => onSessionChange('next')}
        disabled={currentSession === totalSessions - 1 || isAnimating}
        className={`p-2 rounded-xl ${
          darkMode 
            ? 'bg-slate-800 border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700' 
            : 'bg-white border border-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
        } transition-colors`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SessionNavigator;