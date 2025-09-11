import { API_BASE_URL } from './config';
import App from './App';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import FirstTimeUser from './components/FirstTimeUser/FirstTimeUser';
import Header from './components/Header/Header';
import OverviewStats from './components/OverviewStats/OverviewStats';
import TopicProgressCards from './components/TopicProgress/TopicProgressCards';
import UpcomingRevisions from './components/UpcomingRevisions/UpcomingRevisions';
import { useTheme } from './components/common/ThemeProvider';
import { Rocket, Smartphone, Lock, Sparkles, MessageSquare, TrendingUp, Zap } from 'lucide-react';

export default function UserHomepage() {
  const [currentView, setCurrentView] = useState('login');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/user_report`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('User not logged in');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          setReport(data[0]);
        } else {
          setIsFirstTime(true);
        }
      } catch (err) {
        setError(err.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStrengthColor = (level) => {
    const colors = {
      strong: darkMode ? 'text-green-400' : 'text-green-600',
      average: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      weak: darkMode ? 'text-red-400' : 'text-red-600'
    };
    return colors[level] || colors.average;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200',
      medium: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[priority] || colors.medium;
  };

  const LoadingSpinner = () => (
    <div className={`fixed inset-0 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} flex items-center justify-center`}>
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className={`absolute inset-0 border-4 ${darkMode ? 'border-purple-200/20' : 'border-purple-300/30'} rounded-full`}></div>
            <div className={`absolute inset-0 border-4 border-transparent ${darkMode ? 'border-t-purple-400 border-r-pink-400' : 'border-t-purple-500 border-r-pink-500'} rounded-full animate-spin`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-4 h-4 ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-full animate-pulse`}></div>
            </div>
          </div>
        </div>
        <h2 className={`text-3xl font-black ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'} animate-pulse mb-2`}>
          Loading Your Stats
        </h2>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Calculating your current power level... 🔮
        </p>
      </div>
    </div>
  );

  const StartSessionButton = ({ className = "", size = "default" }) => {
    const baseClasses = `group ${
      darkMode
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
    } text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden`;

    const sizeClasses = size === "compact"
      ? "px-6 py-3 text-base"
      : "px-10 py-5 text-xl";

    if (isMobile) {
      return (
        <div className={`${darkMode ? 'bg-orange-900/20 border-orange-800/50' : 'bg-orange-100 border-orange-200'} border rounded-2xl p-6 text-center ${className}`}>
          <div className="mb-3">
            <Smartphone className="w-12 h-12 mx-auto text-orange-400 mb-2" />
            <Lock className="w-6 h-6 mx-auto text-red-400" />
          </div>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'} mb-2`}>
            Yo, Hold Up! 🛑
          </h3>
          <p className={`${darkMode ? 'text-orange-300' : 'text-orange-700'} text-sm mb-1`}>
            You really thought you could code on a phone?
          </p>
          <p className={`text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
            Get on a laptop/desktop and come back 💻✨
          </p>
        </div>
      );
    }

    return (
      <button
        onClick={handleStartSession}
        className={`${baseClasses} ${sizeClasses} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-3">
          <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-black">
            {size === "compact" ? "Start Session" : "Continue Your Villain Arc"}
          </span>
          <Sparkles className="w-4 h-4 group-hover:animate-spin" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </button>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
        <div className={`${darkMode ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-200'} border rounded-2xl p-8 text-center max-w-md`}>
          <div className="text-6xl mb-4">💀</div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'} mb-2`}>
            Something Went Wrong
          </h2>
          <p className={`${darkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
        </div>
      </div>
    );
  }

  if (currentView === 'App') {
    return <App />;
  }

  if (isFirstTime || !report) {
    return <FirstTimeUser darkMode={darkMode} />;
  }

  const handleStartSession = () => {
    if (isMobile) {
      return;
    }
    setCurrentView('App');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Header darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top CTA Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-center lg:text-left">
              <h1 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'} mb-2`}>
                Welcome Back, Warrior!
              </h1>
              <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Ready to demolish some algorithms? Let's get this bread 🍞
              </p>
            </div>
            <div className="flex-shrink-0">
              <StartSessionButton size="compact" />
            </div>
          </div>
        </div>

        <OverviewStats
          darkMode={darkMode}
          report={report}
          formatDate={formatDate}
        />

        {/* Overall Feedback Section */}
        {report.overall_feedback && (
          <div className="mb-8">
            <div className={`${darkMode ? 'bg-gradient-to-br from-slate-800/60 to-purple-900/20 border-slate-700/50' : 'bg-gradient-to-br from-white to-purple-50/30 border-purple-200/30'} backdrop-blur-sm border rounded-3xl p-6 md:p-8 shadow-xl`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`${darkMode ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30' : 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300'} border rounded-2xl p-3 flex-shrink-0`}>
                  <MessageSquare className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      What Sarthi thinks about you ...
                    </h2>
                    <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/30' : 'bg-white/60 border-gray-200/50'} border rounded-2xl p-4 backdrop-blur-sm`}>
                    <p className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} leading-relaxed text-base`}>
                      {report.overall_feedback}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Zap className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      AI-powered insights to fuel your growth 🚀
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <TopicProgressCards
          darkMode={darkMode}
          topicSummary={report.topic_summary}
          formatDate={formatDate}
          getStrengthColor={getStrengthColor}
          getPriorityColor={getPriorityColor}
        />

        <UpcomingRevisions
          darkMode={darkMode}
          revisions={report.revision_schedule_overview.upcoming_revisions}
          formatDate={formatDate}
        />

        {/* Bottom Enhanced CTA Section */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Ready to <span className="text-purple-400">Lock In?</span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-8`}>
            Time to put those skills to the test and level up your game 🎮
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <StartSessionButton />

          {!isMobile && (
            <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-gray-400'} mt-4`}>
              Time to show these algorithms who's boss 😤
            </p>
          )}
        </div>
      </main>
    </div>
  );
}