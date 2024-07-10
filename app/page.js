'use client';
import { useEffect, useState } from 'react';
import { FaUserFriends, FaChartBar, FaTasks, FaHandPointer } from 'react-icons/fa';
import TapToEarnTab from '../components/TapToEarnTab';
import TaskTab from '../components/TaskTab';
import StatsTab from '../components/StatsTab';
import ReferralsTab from '../components/ReferralTab'; // Corrected import
import Head from 'next/head';
import Script from 'next/script';
import Spinner from '../components/Spinner'; // Import the Spinner component

export default function Home() {
  const [activeTab, setActiveTab] = useState('tapToEarn');
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const [initData, setInitData] = useState(null); // Store init data

  useEffect(() => {
    // Simulating data fetching delay for demonstration purposes
    const fetchData = async () => {
      setLoading(true);
      // Replace with actual data fetching logic if needed
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    if (loading) {
      return <Spinner />; // Show spinner while loading
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
