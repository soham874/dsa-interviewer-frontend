import React from 'react';

const SessionReportsHeader = ({ darkMode }) => {
  return (
    <div className="text-center mb-8">
      <h1 className={`text-4xl font-black ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'} mb-4`}>
        Coding Battle Reports ⚔️
      </h1>
      <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
        Track your detailed performance in the last 3 sessions
      </p>
    </div>
  );
};

export default SessionReportsHeader;