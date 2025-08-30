import React from 'react';
import { Clock, AlertTriangle, Calendar, Zap } from 'lucide-react';

export default function UpcomingRevisions({ darkMode, revisions, formatDate }) {
  if (!revisions || revisions.length === 0) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
            Upcoming <span className="text-violet-400">Reality Checks</span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            No revisions scheduled... sus 🤔
          </p>
        </div>

        <div className={`${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50' : 'bg-white/80 backdrop-blur-lg border-white/40'} rounded-2xl p-8 border shadow-lg text-center`}>
          <Zap className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            You're All Caught Up!
          </p>
          <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Time to practice more topics and build that knowledge base 🧠
          </p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: darkMode ? 'text-green-400 bg-green-500/10 border-green-500/30' : 'text-green-600 bg-green-100 border-green-200',
      medium: darkMode ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' : 'text-yellow-600 bg-yellow-100 border-yellow-200',
      hard: darkMode ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[difficulty] || colors.medium;
  };

  const getDifficultyEmoji = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '😌';
      case 'medium': return '😤';
      case 'hard': return '💀';
      default: return '🤔';
    }
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          Upcoming <span className="text-violet-400">Reality Checks</span>
        </h2>
        <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Time to face your demons (aka the topics you're mid at) 👹
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {revisions.map((revision, index) => (
          <div key={index} className={`group ${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50' : 'bg-white/80 backdrop-blur-lg border-white/40'} rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>

            {/* Header with topic and difficulty */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} capitalize flex items-center gap-2`}>
                  {revision.topic.replace('-', ' ')}
                  <span className="text-lg">
                    {getDifficultyEmoji(revision.difficulty)}
                  </span>
                </h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'} font-medium`}>
                  Time for round 2
                </p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(revision.difficulty)}`}>
                {revision.difficulty}
              </span>
            </div>

            {/* Date Section */}
            <div className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50' : 'bg-gray-50 border-gray-200'} rounded-xl p-4 border`}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                <p className={`text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Scheduled for
                </p>
              </div>
              <p className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {formatDate(revision.date)}
              </p>

              {/* Days until revision */}
              <div className="mt-3 flex items-center gap-2">
                <Clock className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {(() => {
                    const today = new Date();
                    const revisionDate = new Date(revision.date);
                    const diffTime = revisionDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays < 0) return "Overdue! Time to lock in 🔒";
                    if (diffDays === 0) return "Today! No excuses 💪";
                    if (diffDays === 1) return "Tomorrow! Get ready 🎯";
                    return `In ${diffDays} days`;
                  })()}
                </p>
              </div>
            </div>

            {/* Motivation footer */}
            <div className="mt-4 text-center">
              <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-400'} italic`}>
                {revision.difficulty === 'hard' ? '"Pain is temporary, quitting lasts forever"' :
                 revision.difficulty === 'medium' ? '"You got this bestie 💅"' :
                 '"Easy money, easy life"'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}