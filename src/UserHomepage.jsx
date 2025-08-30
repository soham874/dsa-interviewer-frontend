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


export default function UserHomepage() {
  const [currentView, setCurrentView] = useState('login');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme(); // Use theme from context

  useEffect(() => {
      const fetchReport = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_BASE_URL}/user_report`, {
            method: 'GET',
            credentials: 'include', // This is important to include cookies
            headers: {
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            if (response.status === 400) {
              // User not logged in
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
        high: darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
        medium: darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
        low: darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
      };
      return colors[priority] || colors.medium;
    };

    const LoadingSpinner = () => (
      <div className={`fixed inset-0 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              <div className={`absolute inset-0 border-4 ${darkMode ? 'border-purple-200/20' : 'border-purple-300/30'} rounded-full`}></div>
              <div className={`absolute inset-0 border-4 border-transparent ${darkMode ? 'border-t-purple-400 border-r-pink-400' : 'border-t-purple-500 border-r-pink-500'} rounded-full animate-spin`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-3 h-3 ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-full animate-pulse`}></div>
              </div>
            </div>
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'} animate-pulse`}>
            Loading Your Progress
          </h2>
        </div>
      </div>
    );

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
          <div className={`${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg p-6 text-center`}>
            <p className={`${darkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Header darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OverviewStats 
          darkMode={darkMode} 
          report={report} 
          formatDate={formatDate} 
        />
        
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

        <div className="flex flex-col items-center justify-center mt-8">
          <button
            onClick={() => setCurrentView('App')}
            className={`px-8 py-4 ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            } text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
          >
            Begin your session
          </button>
        </div>
      </main>
    </div>
  );
}
