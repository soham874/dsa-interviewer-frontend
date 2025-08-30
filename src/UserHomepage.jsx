import { API_BASE_URL } from './config';
import { useState } from 'react';
import App from './App'

export default function UserHomepage() {

    const [currentView, setCurrentView] = useState('login');

      if (currentView === 'App') {
        return <App/>;
      }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">User Home Page</h1>
      <button
        onClick={() => setCurrentView('App')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Begin your session
      </button>
    </div>
  );
}
