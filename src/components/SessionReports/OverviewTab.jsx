import React from 'react';
import { Target, BookOpen, Flame, TrendingUp } from 'lucide-react';
import ScoreGauge from './ScoreGauge';

const OverviewTab = ({ 
  darkMode, 
  currentReport, 
  sessionReports, 
  currentSession, 
  formatDate 
}) => {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${
          darkMode 
            ? 'bg-slate-800/60 border border-slate-700/50' 
            : 'bg-white border border-gray-200'
        } rounded-2xl p-6 text-center backdrop-blur-sm`}>
          <div className="flex justify-center mb-3">
            <ScoreGauge score={currentReport.overall_score} size="small" darkMode={darkMode} />
          </div>
          <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Overall Score
          </h3>
        </div>
        
        <div className={`text-center ${
          darkMode
            ? 'bg-slate-800/60 border border-slate-700/50'
            : 'bg-white border border-gray-200'
        } rounded-2xl p-6 backdrop-blur-sm`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentReport.questions?.length || 0}
            </span>
          </div>
          <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Problems Solved
          </h3>
        </div>

        <div className={`text-center ${
          darkMode 
            ? 'bg-slate-800/60 border border-slate-700/50' 
            : 'bg-white border border-gray-200'
        } rounded-2xl p-6 backdrop-blur-sm`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentReport.topics_attempted?.length || 0}
            </span>
          </div>
          <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Topics Covered
          </h3>
        </div>

        <div className={`text-center ${
          darkMode 
            ? 'bg-slate-800/60 border border-slate-700/50' 
            : 'bg-white border border-gray-200'
        } rounded-2xl p-6 backdrop-blur-sm`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentReport.strengths?.length || 0}
            </span>
          </div>
          <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Strengths Found
          </h3>
        </div>
      </div>

      {/* Progress Evolution */}
      <div className={`${
        darkMode 
          ? 'bg-slate-800/60 border border-slate-700/50' 
          : 'bg-white border border-gray-200'
      } rounded-2xl p-6 backdrop-blur-sm`}>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
          <TrendingUp className="w-5 h-5 text-green-400" />
          Progress Evolution
        </h3>
        <div className="flex items-center justify-between">
          {sessionReports.slice(0, 5).map((report, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${
                index === currentSession
                  ? 'border-purple-400 bg-purple-500/20'
                  : darkMode
                    ? 'border-slate-600 bg-slate-800'
                    : 'border-gray-300 bg-gray-100'
              }`}>
                <span className={`text-sm font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {report.overall_score.toFixed(1)}
                </span>
              </div>
              <p className={`text-xs text-center ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {formatDate(report.created_at)}
              </p>
            </div>
          ))}
          {sessionReports.length > 5 && (
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center mb-2 ${
                darkMode ? 'border-slate-600' : 'border-gray-300'
              }`}>
                <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  +{sessionReports.length - 5}
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                more
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;