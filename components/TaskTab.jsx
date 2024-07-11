import React, { useState } from 'react';

const TASKS_CONFIG = [
  {
    id: 'twitterFollow',
    label: 'Follow $TSBot on Twitter',
    url: 'https://twitter.com/turbosignals',
    actionText: 'Follow',
  },

  
  {
    id: 'instagramFollow',
    label: 'Follow $TSBot on Instagram',
    url: 'https://www.instagram.com/turbosignalstrading/',
    actionText: 'Follow',
  },
  {
    id: 'telegramJoin',
    label: 'Join $TSBot Telegram group',
    actionText: 'Join',
    customAction: true, // Special case for custom action
  },
  {
    id: 'twitterRetweet',
    label: 'Retweet $TSBot\'s tweet',
    url: 'https://twitter.com/turbosignals/status/1808800471437414713?s=52&t=aFmrCA95ZOgooiaYjEAooA',
    actionText: 'Retweet',
  },
  {
    id: 'redditFollow',
    label: 'Follow $TSBot on Reddit',
    url: 'https://www.reddit.com/r/turbosignals/',
    actionText: 'Follow',
  },
  {
    id: 'buyTokens',
    label: 'Buy $TSBot tokens',
    actionText: 'Buy Tokens',
    customAction: true, // Special case for custom action
  },
];

export default function TaskTab() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState({});
  const [socialTasksCompleted, setSocialTasksCompleted] = useState({});

  const handleLogin = () => {
    setLoggedIn(true);
    // Logic for rewarding daily login
    // Example: Reward points, increase streak, etc.
  };

  const handleSocialTask = (task) => {
    setIsLoading((prevLoading) => ({ ...prevLoading, [task.id]: true }));

    if (task.customAction) {
      if (task.id === 'telegramJoin') {
        checkTelegramJoinStatus(task);
      } else if (task.id === 'buyTokens') {
        // Logic for rewarding token purchase task
        completeTask(task.id);
      }
    } else {
      window.open(task.url, '_blank');
      setTimeout(() => {
        completeTask(task.id);
      }, 10000); // 10 seconds delay
    }
  };

  const completeTask = (taskId) => {
    setIsLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    setSocialTasksCompleted((prevTasks) => ({ ...prevTasks, [taskId]: true }));
  };

  const checkTelegramJoinStatus = (task) => {
    // Simulating checking if user has joined Telegram group
    const hasJoinedTelegram = true; // Replace with actual logic to check membership

    if (hasJoinedTelegram) {
      completeTask(task.id);
      window.open('https://t.me/turbosignalscommunity', '_blank'); // Open Telegram group link if joined
    } else {
      alert('Please join the Telegram group to complete this task.');
      setIsLoading((prevLoading) => ({ ...prevLoading, [task.id]: false }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Complete the Challenges, Earn the Rewards!</h2>
      </div>

      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Social Media Tasks</h3>
        <ul>
          {TASKS_CONFIG.map((task) => (
            <li key={task.id} className="flex items-center justify-between py-2 border-b border-gray-700">
              <span className="font-semibold">{task.label}:</span>
              {!socialTasksCompleted[task.id] ? (
                isLoading[task.id] ? (
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-blue-500 border-t-transparent"></div>
                ) : (
                  <button
                    onClick={() => handleSocialTask(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    {task.actionText}
                  </button>
                )
              ) : (
                <span className="text-green-500 animate-fade-in">✔️</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
