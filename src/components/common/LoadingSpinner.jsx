import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/10 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Main loading container */}
      <div className="relative z-10 text-center">
        {/* Spinning loader */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-purple-200/20 rounded-full"></div>
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 border-r-pink-400 rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse">
            Loading
          </h2>

          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>

          <p className="text-slate-300 text-sm opacity-75 animate-pulse delay-300">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;