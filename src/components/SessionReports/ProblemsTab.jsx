import React from 'react';
import { Star } from 'lucide-react';
import ScoreGauge from './ScoreGauge';

const ProblemsTab = ({ darkMode, questions = [] }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': darkMode 
        ? 'bg-green-500/20 text-green-400 border-green-500/30'
        : 'bg-green-100 text-green-600 border-green-300',
      'Medium': darkMode 
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        : 'bg-yellow-100 text-yellow-600 border-yellow-300',
      'Hard': darkMode 
        ? 'bg-red-500/20 text-red-400 border-red-500/30'
        : 'bg-red-100 text-red-600 border-red-300'
    };
    return colors[difficulty] || colors.Medium;
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
          No Problems in This Session
        </h3>
        <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          This session doesn't have any recorded problems.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className={`${
          darkMode 
            ? 'bg-slate-800/60 border border-slate-700/50' 
            : 'bg-white border border-gray-200'
        } rounded-2xl p-6 backdrop-blur-sm`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2 capitalize`}>
                {question.title_slug?.replace(/-/g, ' ') || 'Unknown Problem'}
              </h3>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg border text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-800'} font-medium`}>
                    {(question.final_score || 0).toFixed(1)}/10
                  </span>
                </div>
              </div>
            </div>
            <ScoreGauge 
              score={question.final_score || 0} 
              size="small" 
              darkMode={darkMode} 
            />
          </div>

          {/* Skill Breakdown */}
          {question.scores && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(question.scores).map(([skill, score]) => (
                <div key={skill} className={`${
                  darkMode 
                    ? 'bg-slate-900/50 border border-slate-800' 
                    : 'bg-gray-50 border border-gray-100'
                } rounded-xl p-3 text-center`}>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} mb-1 capitalize`}>
                    {skill}
                  </p>
                  <p className={`text-lg font-bold ${
                    score >= 7 
                      ? 'text-green-400' 
                      : score >= 5 
                        ? 'text-yellow-400' 
                        : 'text-red-400'
                  }`}>
                    {score}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Feedback */}
          {question.feedback && question.feedback.length > 0 && (
            <div className="mt-4">
              <h4 className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                Feedback:
              </h4>
              <div className={`${
                darkMode 
                  ? 'bg-slate-900/50 border border-slate-800' 
                  : 'bg-gray-50 border border-gray-100'
              } rounded-xl p-3`}>
                <ul className="space-y-1">
                  {question.feedback.map((feedback, idx) => (
                    <li key={idx} className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      • {feedback}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProblemsTab;