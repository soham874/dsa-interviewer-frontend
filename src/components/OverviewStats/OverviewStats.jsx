import React from 'react';
import { User, BookOpen, Target, TrendingUp } from 'lucide-react';

export default function OverviewStats({ darkMode, report, formatDate }) {
  const totalAttempts = Object.values(report.topic_summary).reduce((sum, topic) => sum + topic.attempted, 0);
  const averageScore = (Object.values(report.topic_summary).reduce((sum, topic) => sum + topic.avg_score, 0) / 
    Object.keys(report.topic_summary).length).toFixed(1);

  const stats = [
    {
      icon: User,
      color: darkMode ? 'text-purple-400' : 'text-purple-500',
      label: 'Last Session',
      value: formatDate(report.last_session_date)
    },
    {
      icon: BookOpen,
      color: darkMode ? 'text-blue-400' : 'text-blue-500',
      label: 'Topics Practiced',
      value: Object.keys(report.topic_summary).length
    },
    {
      icon: Target,
      color: darkMode ? 'text-green-400' : 'text-green-500',
      label: 'Total Attempts',
      value: totalAttempts
    },
    {
      icon: TrendingUp,
      color: darkMode ? 'text-pink-400' : 'text-pink-500',
      label: 'Average Score',
      value: averageScore
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`${darkMode ? 'bg-slate-800/50 backdrop-blur-lg border-slate-700' : 'bg-white/70 backdrop-blur-lg border-white/20'} rounded-2xl p-6 border shadow-lg`}>
          <div className="flex items-center space-x-3">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
            <div>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{stat.label}</p>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
