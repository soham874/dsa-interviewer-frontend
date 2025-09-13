import React from 'react';
import { Shield, AlertTriangle, Zap, Target } from 'lucide-react';

const SkillsTab = ({ darkMode, strengths = [], weakConcepts = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths */}
      <div className={`${
        darkMode 
          ? 'bg-slate-800/60 border border-slate-700/50' 
          : 'bg-white border border-gray-200'
      } rounded-2xl p-6 backdrop-blur-sm`}>
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Power-Ups Unlocked
        </h3>
        {strengths.length > 0 ? (
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 ${
                darkMode 
                  ? 'bg-green-500/10 border border-green-500/20' 
                  : 'bg-green-50 border border-green-200'
              } rounded-xl`}>
                <Zap className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className={`text-sm ${
                  darkMode ? 'text-green-300' : 'text-green-700'
                }`}>
                  {strength}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">💪</div>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              No strengths identified yet
            </p>
          </div>
        )}
      </div>

      {/* Weaknesses */}
      <div className={`${
        darkMode 
          ? 'bg-slate-800/60 border border-slate-700/50' 
          : 'bg-white border border-gray-200'
      } rounded-2xl p-6 backdrop-blur-sm`}>
        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Areas to Level Up
        </h3>
        {weakConcepts.length > 0 ? (
          <div className="space-y-3">
            {weakConcepts.map((weakness, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 ${
                darkMode 
                  ? 'bg-red-500/10 border border-red-500/20' 
                  : 'bg-red-50 border border-red-200'
              } rounded-xl`}>
                <Target className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className={`text-sm ${
                  darkMode ? 'text-red-300' : 'text-red-700'
                }`}>
                  {weakness}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🎯</div>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              No weak areas identified
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsTab;