import React, { useState } from 'react';
import { Clock, AlertTriangle, Calendar, Zap, ChevronRight, Target, Flame, ArrowRight, Bell } from 'lucide-react';

export default function UpcomingRevisions({ darkMode, revisions, formatDate }) {
  const [hoveredRevision, setHoveredRevision] = useState(null);

  if (!revisions || revisions.length === 0) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
            Your <span className="text-violet-400">Grind Schedule</span> 📅
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
    if (days <= 7) return 'upcoming';
    return 'future';
  };

  const getUrgencyColor = (urgencyLevel) => {
    const colors = {
      overdue: darkMode ? 'bg-gradient-to-r from-red-600/80 to-red-500/80 border-red-400/50' : 'bg-gradient-to-r from-red-500 to-red-400 border-red-300',
      urgent: darkMode ? 'bg-gradient-to-r from-orange-600/80 to-amber-500/80 border-orange-400/50' : 'bg-gradient-to-r from-orange-500 to-amber-400 border-orange-300',
      soon: darkMode ? 'bg-gradient-to-r from-yellow-600/80 to-yellow-500/80 border-yellow-400/50' : 'bg-gradient-to-r from-yellow-500 to-yellow-400 border-yellow-300',
      upcoming: darkMode ? 'bg-gradient-to-r from-blue-600/80 to-indigo-500/80 border-blue-400/50' : 'bg-gradient-to-r from-blue-500 to-indigo-400 border-blue-300',
      future: darkMode ? 'bg-gradient-to-r from-purple-600/80 to-violet-500/80 border-purple-400/50' : 'bg-gradient-to-r from-purple-500 to-violet-400 border-purple-300'
    };
    return colors[urgencyLevel] || colors.future;
  };

  const getTimelineMessage = (days) => {
    if (days < 0) return { text: "Overdue! Time to lock in", emoji: "🔒", intensity: "high" };
    if (days === 0) return { text: "Today! No excuses", emoji: "💪", intensity: "high" };
    if (days === 1) return { text: "Tomorrow! Get ready", emoji: "🎯", intensity: "medium" };
    if (days <= 3) return { text: `${days} days left`, emoji: "⚡", intensity: "medium" };
    if (days <= 7) return { text: `${days} days to prepare`, emoji: "📚", intensity: "low" };
    return { text: `${days} days away`, emoji: "📆", intensity: "low" };
  };

  // Group revisions by urgency and sort
  const sortedRevisions = [...revisions]
    .map(revision => ({
      ...revision,
      daysUntil: getDaysUntil(revision.date),
      urgencyLevel: getUrgencyLevel(getDaysUntil(revision.date))
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const urgentRevisions = sortedRevisions.filter(r => r.urgencyLevel === 'overdue' || r.urgencyLevel === 'urgent');
  const upcomingRevisions = sortedRevisions.filter(r => r.urgencyLevel !== 'overdue' && r.urgencyLevel !== 'urgent');

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          Your <span className="text-violet-400">Grind Schedule</span> 📅
        </h2>
        <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Time to face your demons and level up your weak spots 👹
        </p>
      </div>

      {/* Urgent Revisions Alert */}
      {urgentRevisions.length > 0 && (
        <div className={`${darkMode ? 'bg-gradient-to-r from-red-900/40 to-orange-900/40 border-red-500/30' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'} border rounded-2xl p-6 mb-8 backdrop-blur-sm`}>
          <div className="flex items-start gap-4">
            <div className={`${darkMode ? 'bg-red-500/20' : 'bg-red-100'} p-3 rounded-full flex-shrink-0`}>
              <AlertTriangle className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-black ${darkMode ? 'text-red-300' : 'text-red-700'} mb-2`}>
                🚨 Urgent Action Needed!
              </h3>
              <p className={`${darkMode ? 'text-red-200' : 'text-red-600'} mb-4`}>
                You have {urgentRevisions.length} topic{urgentRevisions.length > 1 ? 's' : ''} that need immediate attention!
              </p>
              <div className="flex flex-wrap gap-2">
                {urgentRevisions.map((revision, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm font-bold ${darkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-200 text-red-800'}`}>
                    {revision.topic.replace('-', ' ')} {getDifficultyEmoji(revision.difficulty)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline View */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-slate-800/60 to-purple-900/20 border-slate-700/50' : 'bg-gradient-to-br from-white to-purple-50/30 border-purple-200/30'} backdrop-blur-sm border rounded-3xl p-8 shadow-xl`}>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`${darkMode ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30' : 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300'} border rounded-2xl p-3`}>
              <Calendar className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Revision Timeline
              </h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {sortedRevisions.length} topics queued for practice
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              Stay consistent! 💪
            </span>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {sortedRevisions.map((revision, index) => {
            const timelineMsg = getTimelineMessage(revision.daysUntil);
            const isHovered = hoveredRevision === index;

            return (
              <div
                key={index}
                className={`group relative transition-all duration-300 ${isHovered ? 'scale-102' : ''}`}
                onMouseEnter={() => setHoveredRevision(index)}
                onMouseLeave={() => setHoveredRevision(null)}
              >
                {/* Timeline connector line */}
                {index < sortedRevisions.length - 1 && (
                  <div className={`absolute left-8 top-16 w-0.5 h-8 ${darkMode ? 'bg-slate-600' : 'bg-gray-300'} z-0`}></div>
                )}

                <div className={`relative z-10 flex items-center gap-6 p-4 rounded-2xl border transition-all duration-300 ${
                  isHovered
                    ? getUrgencyColor(revision.urgencyLevel) + ' text-white transform translate-x-2'
                    : darkMode
                      ? 'bg-slate-800/50 border-slate-700/50 hover:border-purple-500/30'
                      : 'bg-white/60 border-gray-200/50 hover:border-purple-300/50'
                }`}>

                  {/* Timeline dot */}
                  <div className={`relative flex-shrink-0 w-4 h-4 rounded-full transition-all duration-300 ${
                    isHovered
                      ? 'bg-white'
                      : revision.urgencyLevel === 'overdue' || revision.urgencyLevel === 'urgent'
                        ? 'bg-gradient-to-r from-red-400 to-orange-400'
                        : 'bg-gradient-to-r from-purple-400 to-pink-400'
                  }`}>
                    {(revision.urgencyLevel === 'overdue' || revision.urgencyLevel === 'urgent') && !isHovered && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-orange-400 animate-pulse"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                    {/* Topic info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className={`text-lg font-bold capitalize transition-colors ${
                          isHovered ? 'text-white' : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {revision.topic.replace('-', ' ')}
                        </h4>
                        <span className="text-lg">
                          {getDifficultyEmoji(revision.difficulty)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border transition-colors ${
                          isHovered
                            ? 'bg-white/20 text-white border-white/30'
                            : getDifficultyColor(revision.difficulty)
                        }`}>
                          {revision.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className={`w-4 h-4 ${isHovered ? 'text-white/80' : darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                        <span className={`font-medium ${isHovered ? 'text-white/90' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          {formatDate(revision.date)}
                        </span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        isHovered
                          ? 'bg-white/20 backdrop-blur-sm'
                          : revision.urgencyLevel === 'overdue' || revision.urgencyLevel === 'urgent'
                            ? darkMode ? 'bg-red-500/20 border border-red-400/30' : 'bg-red-100 border border-red-200'
                            : darkMode ? 'bg-slate-700/50' : 'bg-gray-100'
                      }`}>
                        <span className="text-lg">{timelineMsg.emoji}</span>
                        <span className={`text-sm font-bold ${
                          isHovered ? 'text-white' :
                          revision.urgencyLevel === 'overdue' || revision.urgencyLevel === 'urgent'
                            ? darkMode ? 'text-red-300' : 'text-red-700'
                            : darkMode ? 'text-slate-300' : 'text-gray-700'
                        }`}>
                          {timelineMsg.text}
                        </span>
                      </div>

                      {isHovered && (
                        <ChevronRight className="w-5 h-5 text-white animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer motivation */}
        <div className="mt-8 text-center">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30' : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200'}`}>
            <Target className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              Consistency breeds excellence. Let's get this bread! 🍞
            </span>
            <Flame className={`w-5 h-5 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}