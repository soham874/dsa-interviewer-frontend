import React from 'react';
import { Calendar, BookOpen, Target, TrendingUp, Zap } from 'lucide-react';

export default function OverviewStats({ darkMode, report, formatDate }) {
  const totalAttempts = Object.values(report.topic_summary).reduce((sum, topic) => sum + topic.attempted, 0);
  const averageScore = (Object.values(report.topic_summary).reduce((sum, topic) => sum + topic.avg_score, 0) /
    Object.keys(report.topic_summary).length).toFixed(1);

  const stats = [
    {
      icon: Calendar,
      color: darkMode ? 'text-purple-400' : 'text-purple-500',
      bgColor: darkMode ? 'bg-purple-500/10' : 'bg-purple-100',
      label: 'Last Grind Session',
      value: formatDate(report.last_session_date),
      subtitle: 'Keep the streak alive 🔥'
    },
    {
      icon: BookOpen,
      color: darkMode ? 'text-blue-400' : 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-500/10' : 'bg-blue-100',
      label: 'Topics Unlocked',
      value: Object.keys(report.topic_summary).length,
      subtitle: 'Gotta catch \'em all 🎯'
    },
    {
      icon: Target,
      color: darkMode ? 'text-green-400' : 'text-green-500',
      bgColor: darkMode ? 'bg-green-500/10' : 'bg-green-100',
      label: 'Problems Conquered',
      value: totalAttempts,
      subtitle: 'Each one makes you stronger 💪'
    },
    {
      icon: TrendingUp,
      color: darkMode ? 'text-pink-400' : 'text-pink-500',
      bgColor: darkMode ? 'bg-pink-500/10' : 'bg-pink-100',
      label: 'Average Score',
      value: `${averageScore}/10`,
      subtitle: averageScore >= 7 ? 'Absolute unit 👑' : 'Room for growth 📈'
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          Your <span className="text-purple-400">Main Character</span> Stats
        </h2>
        <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          These numbers don't lie (unlike your resume) 📊
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`group ${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50' : 'bg-white/80 backdrop-blur-lg border-white/40'} rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 ${stat.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'} font-medium uppercase tracking-wider mb-1`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                {stat.value}
              </p>
              <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-400'} font-medium`}>
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}