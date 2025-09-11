import React, { useState } from 'react';
import { Star, Flame, Skull, Trophy, Clock, Target, ChevronDown, ChevronUp, Zap, TrendingUp, Calendar } from 'lucide-react';

export default function TopicProgressCards({ darkMode, topicSummary, formatDate, getStrengthColor, getPriorityColor }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const getStrengthIcon = (level) => {
    switch(level) {
      case 'strong': return <Trophy className="w-5 h-5" />;
      case 'average': case 'moderate': return <Target className="w-5 h-5" />;
      case 'weak': return <Skull className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getStrengthMessage = (level, score) => {
    if (level === 'strong' && score >= 8) return "Absolute beast mode 👑";
    if (level === 'strong') return "You're cooking 🔥";
    if ((level === 'average' || level === 'moderate')) return "Mid but getting better 📈";
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

  const getScoreColor = (score) => {
    if (score >= 8) return darkMode ? '#10b981' : '#059669'; // green
    if (score >= 6) return darkMode ? '#f59e0b' : '#d97706'; // yellow
    return darkMode ? '#ef4444' : '#dc2626'; // red
  };

  const getPillColor = (score) => {
    if (score >= 8) return darkMode ? 'bg-green-500/20 text-green-400 border-green-500/40' : 'bg-green-100 text-green-700 border-green-300';
    if (score >= 6) return darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return darkMode ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-red-100 text-red-700 border-red-300';
  };

  // Calculate radar chart points
  const topics = Object.entries(topicSummary);
  const maxScore = 10;
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;

  const getRadarPoints = () => {
    const angleStep = (2 * Math.PI) / topics.length;
    return topics.map(([topic, data], index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const radius = (data.avg_score / maxScore) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, topic, data, angle, radius };
    });
  };

  const getRadarPolygonPoints = () => {
    return getRadarPoints().map(point => `${point.x},${point.y}`).join(' ');
  };

  const getRadarAxisLines = () => {
    const angleStep = (2 * Math.PI) / topics.length;
    return topics.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const endX = centerX + maxRadius * Math.cos(angle);
      const endY = centerY + maxRadius * Math.sin(angle);
      return { startX: centerX, startY: centerY, endX, endY };
    });
  };

  const getRadarLabels = () => {
    const angleStep = (2 * Math.PI) / topics.length;
    return topics.map(([topic, data], index) => {
      const angle = index * angleStep - Math.PI / 2;
      const labelRadius = maxRadius + 25;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      return { x, y, topic, data };
    });
  };

  // Stats calculation
  const totalTopics = topics.length;
  const avgScore = topics.reduce((sum, [_, data]) => sum + data.avg_score, 0) / totalTopics;
  const nextRevision = topics.reduce((earliest, [_, data]) => {
    const revisionDate = new Date(data.next_revision_date);
    return earliest === null || revisionDate < earliest.date
      ? { topic: _, date: revisionDate }
      : earliest;
  }, null);

  const handleTopicClick = (topic) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          Your <span className="text-violet-400">Algorithm Arsenal</span> 🗡️
        </h2>
        <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Visual breakdown of where you're slaying vs getting slayed 📊
        </p>
      </div>

      {/* Main Dashboard Card */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-slate-800/60 to-purple-900/20 border-slate-700/50' : 'bg-gradient-to-br from-white to-purple-50/30 border-purple-200/30'} backdrop-blur-sm border rounded-3xl p-8 shadow-xl mb-8`}>

        {/* Radar Chart Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
          {/* Radar Chart */}
          <div className="flex-shrink-0">
            <div className="relative">
              <svg width="300" height="300" className="drop-shadow-lg">
                {/* Background circles */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
                  <circle
                    key={index}
                    cx={centerX}
                    cy={centerY}
                    r={maxRadius * scale}
                    fill="none"
                    stroke={darkMode ? '#374151' : '#e5e7eb'}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                ))}

                {/* Axis lines */}
                {getRadarAxisLines().map((line, index) => (
                  <line
                    key={index}
                    x1={line.startX}
                    y1={line.startY}
                    x2={line.endX}
                    y2={line.endY}
                    stroke={darkMode ? '#475569' : '#d1d5db'}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                ))}

                {/* Data polygon */}
                <polygon
                  points={getRadarPolygonPoints()}
                  fill={darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}
                  stroke={darkMode ? '#a855f7' : '#8b5cf6'}
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Data points */}
                {getRadarPoints().map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill={getScoreColor(point.data.avg_score)}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-8 transition-all duration-200"
                      onClick={() => handleTopicClick(point.topic)}
                    />
                  </g>
                ))}

                {/* Labels */}
                {getRadarLabels().map((label, index) => (
                  <text
                    key={index}
                    x={label.x}
                    y={label.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-sm font-bold ${darkMode ? 'fill-slate-300' : 'fill-gray-700'} cursor-pointer hover:opacity-80`}
                    onClick={() => handleTopicClick(label.topic)}
                  >
                    {label.topic.replace('-', ' ')}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/30' : 'bg-white/60 border-gray-200/50'} border rounded-2xl p-4 text-center backdrop-blur-sm`}>
                <div className={`text-3xl font-black ${darkMode ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                  {totalTopics}
                </div>
                <div className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Topics Practiced
                </div>
              </div>

              <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/30' : 'bg-white/60 border-gray-200/50'} border rounded-2xl p-4 text-center backdrop-blur-sm`}>
                <div className={`text-3xl font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} mb-1`}>
                  {avgScore.toFixed(1)}
                </div>
                <div className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Average Score
                </div>
              </div>

              <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/30' : 'bg-white/60 border-gray-200/50'} border rounded-2xl p-4 text-center backdrop-blur-sm`}>
                <div className={`text-lg font-black ${darkMode ? 'text-orange-400' : 'text-orange-600'} mb-1`}>
                  {nextRevision ? nextRevision.topic.replace('-', ' ') : 'None'}
                </div>
                <div className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Next Revision
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Click any topic or chart point to dive deeper into your performance
              </span>
            </div>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="border-t border-opacity-20 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Quick Topic Overview
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {topics.map(([topic, data]) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`group px-4 py-2 rounded-full border font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${getPillColor(data.avg_score)} ${
                  expandedTopic === topic ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="capitalize">{topic.replace('-', ' ')}</span>
                  <span className="text-xs opacity-80">({data.avg_score})</span>
                  {expandedTopic === topic ?
                    <ChevronUp className="w-3 h-3" /> :
                    <ChevronDown className="w-3 h-3" />
                  }
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Detail Card */}
      {expandedTopic && (
        <div className={`${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50' : 'bg-white/80 backdrop-blur-lg border-white/40'} rounded-2xl p-6 border shadow-lg mb-6 animate-in slide-in-from-top duration-300`}>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                {getStrengthIcon(topicSummary[expandedTopic].strength_level)}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} capitalize`}>
                  {expandedTopic.replace('-', ' ')} Deep Dive 🔍
                </h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {getStrengthMessage(topicSummary[expandedTopic].strength_level, topicSummary[expandedTopic].avg_score)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setExpandedTopic(null)}
              className={`p-2 rounded-full hover:bg-slate-700/50 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Score Circle */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke={darkMode ? "#374151" : "#e5e7eb"}
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke={getScoreColor(topicSummary[expandedTopic].avg_score)}
                      strokeWidth="3"
                      strokeDasharray={`${topicSummary[expandedTopic].avg_score * 10}, 100`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {topicSummary[expandedTopic].avg_score}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      /10
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {topicSummary[expandedTopic].attempted}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} font-medium`}>
                    Problems Faced
                  </p>
                </div>
                <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4" />
                    <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {formatDate(topicSummary[expandedTopic].next_revision_date)}
                    </p>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} font-medium`}>
                    Next Review
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Difficulty Breakdown */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/30 border border-slate-600/30' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <p className={`text-lg font-bold ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    Difficulty Breakdown
                  </p>
                </div>
                <div className="space-y-3">
                  {Object.entries(topicSummary[expandedTopic].difficulty_history).map(([difficulty, stats]) => (
                    <div key={difficulty} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stats.attempted > 0 ? 'bg-gradient-to-r from-purple-400 to-pink-400' : darkMode ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
                        <span className={`font-medium capitalize ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                          {difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                          {stats.attempted} attempts
                        </span>
                        <span className={`font-bold ${stats.avg_score >= 7 ? 'text-green-400' : stats.avg_score >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {stats.avg_score.toFixed(1)}★
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Badge */}
              <div className="text-center">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getPriorityColor(topicSummary[expandedTopic].revision_priority)} inline-flex items-center gap-2`}>
                  {getPriorityEmoji(topicSummary[expandedTopic].revision_priority)}
                  {topicSummary[expandedTopic].revision_priority} Priority
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}