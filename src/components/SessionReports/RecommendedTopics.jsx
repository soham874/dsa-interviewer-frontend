import React from 'react';

const RecommendedTopics = ({ darkMode, topics = [] }) => {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 text-center">
      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
        🎯 Recommended Focus Areas
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((topic, index) => (
          <span
            key={index}
            className={`px-4 py-2 ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 text-purple-700'
            } rounded-xl font-medium transition-all duration-200 hover:scale-105`}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTopics;