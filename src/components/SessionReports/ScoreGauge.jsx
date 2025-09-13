import React from 'react';

const ScoreGauge = ({ score, size = "large", darkMode = true }) => {
  const radius = size === "large" ? 45 : 30;
  const strokeWidth = size === "large" ? 8 : 5;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  const getGaugeColor = () => {
    if (score >= 8) return '#10b981';
    if (score >= 6.5) return '#f59e0b';
    return '#ef4444';
  };

  const getBackgroundStroke = () => {
    return darkMode ? '#374151' : '#e5e7eb';
  };

  return (
    <div className="relative">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke={getBackgroundStroke()}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={getGaugeColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${size === "large" ? 'text-2xl' : 'text-lg'} font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default ScoreGauge;