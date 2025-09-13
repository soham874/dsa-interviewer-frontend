import React from 'react';
import { BarChart3, Code, Brain } from 'lucide-react';

const TabNavigation = ({ darkMode, selectedTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'problems', label: 'Problems', icon: Code },
    { id: 'skills', label: 'Skills', icon: Brain }
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className={`flex ${
        darkMode 
          ? 'bg-slate-800/60 border border-slate-700/50' 
          : 'bg-white/60 border border-gray-200/50'
      } rounded-2xl p-1 backdrop-blur-sm`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedTab === tab.id
                ? darkMode
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-purple-500 text-white shadow-lg'
                : darkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;