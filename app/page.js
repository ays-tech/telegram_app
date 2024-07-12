// pages/index.js
"use client";
import { useState , useEffect} from 'react';
import { FaUserFriends, FaChartBar, FaTasks, FaHandPointer } from 'react-icons/fa';
import TapToEarnTab from '../components/TapToEarnTab';
import TaskTab from '../components/TaskTab';
import StatsTab from '../components/StatsTab';
import ReferralsTab from '../components/ReferralTab';
import Head from 'next/head';
import Script from 'next/script';
import Spinner from '../components/Spinner';

export default function Home() {
  const [activeTab, setActiveTab] = useState('tapToEarn');
  const [loading, setLoading] = useState(true); // Initially set loading to true

  // Example: Simulate data fetching with useEffect
  // You can remove this useEffect if you are not fetching data
  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (simulating data fetching completion)
    }, 2000);
  }, []); // Empty dependency array means this effect runs once after initial render

  const renderTabContent = () => {
    if (loading) {
      return <Spinner />;
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
      <Head>
        <title>TSBot Mini App</title>
      </Head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <div className="tab-content">
        {/* Render tabs based on current activeTab */}
        {renderTabContent()}
      </div>
      {/* Bottom navigation for tab selection */}
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
          <FaHandPointer size={24} />
          <span className="text-xs mt-1">Tap</span>
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
