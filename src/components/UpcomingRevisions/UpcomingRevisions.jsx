import React, { useState } from 'react';
import { Clock, AlertTriangle, Calendar, ChevronRight, ChevronDown, Target } from 'lucide-react';

export default function UpcomingRevisions({ darkMode, revisions, formatDate }) {
  const [expandedItem, setExpandedItem] = useState(null);

  if (!revisions || revisions.length === 0) {
    return (
      <div className="mb-8">
        <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200'} rounded-2xl p-6 border text-center`}>
          <Target className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            No Revisions Scheduled
          </h3>
          <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Practice more topics to build your schedule 🚀
          </p>
        </div>
      </div>
    );
  }

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const revisionDate = new Date(dateString);
    const diffTime = revisionDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyLevel = (days) => {
    if (days < 0) return 'overdue';
    if (days <= 1) return 'urgent';
    if (days <= 3) return 'soon';
    return 'upcoming';
  };

  const getUrgencyColor = (urgencyLevel) => {
    const colors = {
      overdue: 'text-red-500 bg-red-500/10',
      urgent: 'text-orange-500 bg-orange-500/10',
      soon: 'text-yellow-500 bg-yellow-500/10',
      upcoming: darkMode ? 'text-purple-400 bg-purple-500/10' : 'text-purple-600 bg-purple-100'
    };
    return colors[urgencyLevel] || colors.upcoming;
  };

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  const getTimeText = (days) => {
    if (days < 0) return `${Math.abs(days)}d overdue`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days}d left`;
  };

  // Sort and process revisions
  const processedRevisions = revisions
    .map(revision => ({
      ...revision,
      daysUntil: getDaysUntil(revision.date),
      urgencyLevel: getUrgencyLevel(getDaysUntil(revision.date))
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const urgentCount = processedRevisions.filter(r => r.urgencyLevel === 'overdue' || r.urgencyLevel === 'urgent').length;

  return (
    <div className="mb-8">
      <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200'} rounded-2xl border overflow-hidden`}>

        {/* Header */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Revision Schedule
                </h3>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {processedRevisions.length} topics queued
                </p>
              </div>
            </div>

            {urgentCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-bold">{urgentCount}</span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {['overdue', 'urgent', 'soon', 'upcoming'].map(level => {
              const count = processedRevisions.filter(r => r.urgencyLevel === level).length;
              if (count === 0) return null;

              return (
                <div key={level} className={`text-center p-2 sm:p-3 rounded-xl ${getUrgencyColor(level)}`}>
                  <div className="text-lg sm:text-xl font-bold">{count}</div>
                  <div className="text-xs font-medium capitalize">{level}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revision List */}
        <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          {processedRevisions.slice(0, 5).map((revision, index) => {
            const isExpanded = expandedItem === index;
            const urgencyColor = getUrgencyColor(revision.urgencyLevel);

            return (
              <div key={index}>
                <button
                  onClick={() => setExpandedItem(isExpanded ? null : index)}
                  className={`w-full p-3 sm:p-4 flex items-center justify-between hover:bg-opacity-50 transition-colors ${
                    darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'
                  } ${index !== processedRevisions.length - 1 && !isExpanded ? `border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}` : ''}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getDifficultyIcon(revision.difficulty)}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        revision.urgencyLevel === 'overdue' || revision.urgencyLevel === 'urgent'
                          ? 'bg-red-500 animate-pulse'
                          : 'bg-gray-400'
                      }`}></div>
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <h4 className={`font-semibold capitalize truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {revision.topic.replace('-', ' ')}
                      </h4>
                      <div className="flex items-center gap-3 text-xs sm:text-sm">
                        <span className={`font-medium ${urgencyColor.split(' ')[0]}`}>
                          {getTimeText(revision.daysUntil)}
                        </span>
                        <span className={darkMode ? 'text-slate-400' : 'text-gray-500'}>
                          {formatDate(revision.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${urgencyColor}`}>
                      {revision.difficulty}
                    </span>
                    {isExpanded ?
                      <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-400'}`} /> :
                      <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                    }
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className={`px-3 sm:px-4 pb-3 sm:pb-4 ${darkMode ? 'bg-slate-800/30' : 'bg-gray-50'} border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                    <div className="ml-8 sm:ml-10">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                        <div className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Status:</span> {revision.urgencyLevel}
                        </div>
                        <div className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Days:</span> {revision.daysUntil >= 0 ? `${revision.daysUntil} left` : `${Math.abs(revision.daysUntil)} overdue`}
                        </div>
                      </div>

                      {revision.urgencyLevel === 'overdue' && (
                        <div className="mt-2 p-2 bg-red-500/10 text-red-500 rounded text-xs">
                          ⚠️ This topic needs immediate attention!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {processedRevisions.length > 5 && (
            <div className={`p-3 text-center text-sm ${darkMode ? 'text-slate-400 bg-slate-800/30' : 'text-gray-500 bg-gray-50'}`}>
              +{processedRevisions.length - 5} more topics scheduled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}