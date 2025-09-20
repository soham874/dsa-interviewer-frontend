// Add this component to your UserHomepage.jsx

import { Play, Clock, Calendar, AlertCircle, Smartphone } from 'lucide-react';

const IncompleteSessionsSection = ({ darkMode, incompleteSessions, formatDate, onResumeSession }) => {
  if (!incompleteSessions || incompleteSessions.length === 0) {
    return null;
  }

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const sessionDate = new Date(dateString);
    const diffInHours = Math.floor((now - sessionDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  return (
    <div className="mb-8">
      <div className={`${darkMode ? 'bg-gradient-to-br from-slate-800/60 to-orange-900/20 border-slate-700/50' : 'bg-gradient-to-br from-white to-orange-50/30 border-orange-200/30'} backdrop-blur-sm border rounded-3xl p-6 md:p-8 shadow-xl`}>
        <div className="flex items-start gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/30' : 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-300'} border rounded-2xl p-3 flex-shrink-0`}>
            <AlertCircle className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h2 className={`text-xl md:text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Unfinished Business
              </h2>
              <Clock className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm md:text-base mb-4`}>
              You've got {incompleteSessions.length} incomplete session{incompleteSessions.length > 1 ? 's' : ''} waiting for you to come back and finish what you started 💪
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {incompleteSessions.map((session, index) => (
            <div
              key={session.session_id}
              className={`${darkMode ? 'bg-slate-800/50 border-slate-700/30 hover:bg-slate-700/50' : 'bg-white/60 border-gray-200/50 hover:bg-gray-50/80'} border rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg group`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-red-500 animate-pulse' : index === 1 ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                    <h3 className={`font-bold text-base sm:text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Session #{index + 1}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
                      {index === 0 ? 'Most Recent' : 'Pending'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {formatDate(session.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {getTimeAgo(session.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

{window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? null : (
                  <button
                    onClick={() => onResumeSession(session.session_id)}
                    className={`group/btn flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                      darkMode
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white shadow-lg hover:shadow-orange-500/25'
                        : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg hover:shadow-orange-500/25'
                    }`}
                  >
                    <Play className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                    <span className="font-bold">Resume</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-slate-800/30' : 'bg-gray-100/50'}`}>
          <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'} text-center`}>
            💡 Pro tip: Finishing incomplete sessions helps maintain your learning momentum
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncompleteSessionsSection;