import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function UpcomingRevisions({ darkMode, revisions, formatDate }) {
  return (
    <div className={`${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700' : 'bg-white/70 backdrop-blur-lg border-white/20'} rounded-2xl p-6 border shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Upcoming Revisions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {revisions.map((revision, index) => (
          <div key={index} className={`${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-4 border hover:shadow-md transition-all duration-300`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} capitalize`}>
                {revision.topic.replace('-', ' ')}
              </h3>
              <Clock className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
            </div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'} mb-1`}>
              {formatDate(revision.date)}
            </p>
            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              {revision.difficulty} level
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
