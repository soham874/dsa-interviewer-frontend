import React from 'react';
import { Star, Flame, Skull, Trophy, Clock, Target } from 'lucide-react';

export default function TopicProgressCards({ darkMode, topicSummary, formatDate, getStrengthColor, getPriorityColor }) {

  const getStrengthIcon = (level) => {
    switch(level) {
      case 'strong': return <Trophy className="w-5 h-5" />;
      case 'average': return <Target className="w-5 h-5" />;
      case 'weak': return <Skull className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getStrengthMessage = (level, score) => {
    if (level === 'strong' && score >= 8) return "Absolute beast mode 👑";
    if (level === 'strong') return "You're cooking 🔥";
    if (level === 'average') return "Mid but getting better 📈";
    return "Needs some TLC fr 💀";
  };

  const getPriorityEmoji = (priority) => {
    switch(priority) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '✅';
      default: return '📊';
    }
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          Your <span className="text-violet-400">Topic Mastery</span> Breakdown
        </h2>
        <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Where you're slaying vs where you're getting slayed 📊
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(topicSummary).map(([topic, data]) => (
          <div key={topic} className={`group ${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50' : 'bg-white/80 backdrop-blur-lg border-white/40'} rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1`}>

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  {getStrengthIcon(data.strength_level)}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} capitalize`}>
                    {topic.replace('-', ' ')}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    {getStrengthMessage(data.strength_level, data.avg_score)}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(data.revision_priority)} flex items-center gap-1`}>
                {getPriorityEmoji(data.revision_priority)}
                {data.revision_priority}
              </span>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                    strokeWidth="2"
                  />
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke={data.avg_score >= 7 ? "#10b981" : data.avg_score >= 5 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="2"
                    strokeDasharray={`${data.avg_score * 10}, 100`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {data.avg_score}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    /10
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {data.attempted}
                </p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} font-medium`}>
                  Problems Faced
                </p>
              </div>
              <div className={`text-center p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {formatDate(data.next_revision_date)}
                </p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} font-medium`}>
                  Next Review
                </p>
              </div>
            </div>

            {/* Weak Subtopics */}
            {data.weak_subtopics && data.weak_subtopics.length > 0 && (
              <div className="mb-4">
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'} mb-2 font-medium`}>
                  Skill Issues Detected 🚨
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.weak_subtopics.slice(0, 3).map((subtopic, index) => (
                    <span key={index} className={`px-3 py-1 text-xs rounded-full font-medium ${darkMode ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 'bg-red-100 text-red-600 border border-red-200'}`}>
                      {subtopic}
                    </span>
                  ))}
                  {data.weak_subtopics.length > 3 && (
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      +{data.weak_subtopics.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Difficulty Breakdown */}
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/30 border border-slate-600/30' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-400" />
                <p className={`text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Difficulty Breakdown
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(data.difficulty_history).map(([difficulty, stats]) => (
                  <div key={difficulty} className="text-center">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-slate-600/50' : 'bg-white/80'} mb-1`}>
                      <p className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-gray-500'} capitalize mb-1`}>
                        {difficulty}
                      </p>
                      <p className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {stats.attempted}
                      </p>
                      <p className={`text-xs ${stats.avg_score >= 7 ? 'text-green-400' : stats.avg_score >= 5 ? 'text-yellow-400' : 'text-red-400'} font-bold`}>
                        {stats.avg_score.toFixed(1)}★
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}