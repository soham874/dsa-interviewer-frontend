import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import SessionReportsHeader from './SessionReportsHeader';
import SessionNavigator from './SessionNavigator';
import TabNavigation from './TabNavigation';
import OverviewTab from './OverviewTab';
import ProblemsTab from './ProblemsTab';
import SkillsTab from './SkillsTab';
import RecommendedTopics from './RecommendedTopics';
import LoadingSpinner from '../common/LoadingSpinner';

const SessionReports = ({ darkMode }) => {
  const [sessionReports, setSessionReports] = useState([]);
  const [currentSession, setCurrentSession] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchSessionReports = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/session_reports`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setSessionReports(data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load session reports');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionReports();
  }, []);

  const handleSessionChange = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (direction === 'next' && currentSession < sessionReports.length - 1) {
      setCurrentSession(prev => prev + 1);
    } else if (direction === 'prev' && currentSession > 0) {
      setCurrentSession(prev => prev - 1);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-50'} py-16`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-50'} py-16`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`${darkMode ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-200'} border rounded-2xl p-8 max-w-md mx-auto`}>
            <div className="text-6xl mb-4">💀</div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'} mb-2`}>
              Something Went Wrong
            </h2>
            <p className={`${darkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionReports || sessionReports.length === 0) {
    return (
      <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-50'} py-16`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white border-gray-200'} border rounded-2xl p-8 max-w-md mx-auto`}>
            <div className="text-6xl mb-4">📊</div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              No Battle Reports Yet
            </h2>
            <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Complete a coding session to see your performance analytics!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentReport = sessionReports[currentSession];

  return (
    <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <SessionReportsHeader darkMode={darkMode} />

        <SessionNavigator
          darkMode={darkMode}
          currentSession={currentSession}
          totalSessions={sessionReports.length}
          currentReport={currentReport}
          formatDate={formatDate}
          onSessionChange={handleSessionChange}
          isAnimating={isAnimating}
        />

        <TabNavigation
          darkMode={darkMode}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {selectedTab === 'overview' && (
            <OverviewTab
              darkMode={darkMode}
              currentReport={currentReport}
              sessionReports={sessionReports}
              currentSession={currentSession}
              formatDate={formatDate}
            />
          )}
          {selectedTab === 'problems' && (
            <ProblemsTab
              darkMode={darkMode}
              questions={currentReport.questions}
            />
          )}
          {selectedTab === 'skills' && (
            <SkillsTab
              darkMode={darkMode}
              strengths={currentReport.strengths}
              weakConcepts={currentReport.weak_concepts}
            />
          )}
        </div>

        <RecommendedTopics
          darkMode={darkMode}
          topics={currentReport.recommended_topics}
        />
      </div>
    </div>
  );
};

export default SessionReports;