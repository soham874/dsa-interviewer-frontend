import React from 'react';

export default function TopicProgressCards({ darkMode, topicSummary, formatDate, getStrengthColor, getPriorityColor }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {Object.entries(topicSummary).map(([topic, data]) => (
        <div key={topic} className={`${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700' : 'bg-white/70 backdrop-blur-lg border-white/20'} rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} capitalize`}>
              {topic.replace('-', ' ')}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(data.revision_priority)}`}>
              {data.revision_priority} priority
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Strength Level</span>
              <span className={`font-semibold capitalize ${getStrengthColor(data.strength_level)}`}>
                {data.strength_level}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Average Score</span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {data.avg_score}/10
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Problems Attempted</span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {data.attempted}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Next Revision</span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {formatDate(data.next_revision_date)}
              </span>
            </div>

            {data.weak_subtopics && data.weak_subtopics.length > 0 && (
              <div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'} mb-2`}>Areas to Focus:</p>
                <div className="flex flex-wrap gap-2">
                  {data.weak_subtopics.map((subtopic, index) => (
                    <span key={index} className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
                      {subtopic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'} mb-2`}>Difficulty Breakdown:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(data.difficulty_history).map(([difficulty, stats]) => (
                  <div key={difficulty} className="text-center">
                    <p className={`font-medium ${darkMode ? 'text-slate-400' : 'text-gray-500'} capitalize`}>{difficulty}</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.attempted}</p>
                    <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>{stats.avg_score.toFixed(1)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
