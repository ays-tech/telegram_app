'use client'
// pages/index.js
import { useEffect, useState } from 'react';
import { FaUserFriends, FaChartBar, FaTasks, FaHandPointer } from 'react-icons/fa';
import TapToEarnTab from '../components/TapToEarnTab';
import TaskTab from '../components/TaskTab';
import StatsTab from '../components/StatsTab';
import ReferralsTab from '../components/ReferalTab'; // Corrected import
import { retrieveLaunchParams } from '@telegram-apps/sdk';

export default function Home() {
  const [activeTab, setActiveTab] = useState('tapToEarn');
  const [authorized, setAuthorized] = useState(false);
  const [initData, setInitData] = useState(null); // Store init data

  useEffect(() => {
    const { initDataRaw } = retrieveLaunchParams();

    fetch('/api/auth', { // Pointing to the serverless function
      method: 'POST',
      headers: {
        Authorization: `tma ${initDataRaw}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming response is JSON
    })
    .then(data => {
      // Handle response data
      setInitData(data);
      setAuthorized(true);
    })
    .catch(error => {
      console.error('Error during fetch:', error);
      setAuthorized(false);
    });
  }, []);

  const renderTabContent = () => {
    if (!authorized) {
      return <div>Loading...</div>; // Show a loading state or a message
    }
    
    switch (activeTab) {
      case 'referrals':
        return <ReferralsTab />;
      case 'tasks':
        return <TaskTab />;
      case 'stats':
        return <StatsTab />;
      default:
        return <TapToEarnTab />;
    }
  };

  return (
    <div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
      <div className="bottom-navigation flex justify-around bg-gray-800 p-4 fixed bottom-0 left-0 right-0">
        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex items-center justify-center flex-col text-white ${activeTab === 'referrals' ? 'text-blue-500' : ''}`}
        >
          <FaUserFriends size={24} />
          <span className="text-xs mt-1">Referrals</span>
        </button>
        <button
          onClick={() => setActiveTab('tapToEarn')}
          className={`flex items-center justify-center flex-col text-white ${activeTab === 'tapToEarn' ? 'text-blue-500' : ''}`}
        >
          <FaHandPointer size={24} /> {/* Icon for Tap to Earn */}
          <span className="text-xs mt-1">Tap</span> {/* Updated text to 'Tap' */}
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center justify-center flex-col text-white ${activeTab === 'tasks' ? 'text-blue-500' : ''}`}
        >
          <FaTasks size={24} />
          <span className="text-xs mt-1">Tasks</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center justify-center flex-col text-white ${activeTab === 'stats' ? 'text-blue-500' : ''}`}
        >
          <FaChartBar size={24} />
          <span className="text-xs mt-1">Stats</span>
        </button>
      </div>
    </div>
  );
}
