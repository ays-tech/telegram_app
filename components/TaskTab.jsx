// components/TaskTab.jsx
"use client";
import React, { useState } from 'react';

export default function TaskTab() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [socialTasksCompleted, setSocialTasksCompleted] = useState({
    twitterFollow: false,
    instagramFollow: false,
    pinterestLike: false,
    pinterestRetweet: false,
    redditFollow: false,
    boughtTokens: false,
  });

  const handleLogin = () => {
    setLoggedIn(true);
    // Logic for rewarding daily login
    // Example: Reward points, increase streak, etc.
  };

  const handleSocialTask = (task) => {
    switch (task) {
      case 'twitterFollow':
        setSocialTasksCompleted({ ...socialTasksCompleted, twitterFollow: true });
        // Logic for rewarding Twitter follow task
        break;
      case 'instagramFollow':
        setSocialTasksCompleted({ ...socialTasksCompleted, instagramFollow: true });
        // Logic for rewarding Instagram follow task
        break;
      case 'pinterestLike':
        setSocialTasksCompleted({ ...socialTasksCompleted, pinterestLike: true });
        // Logic for rewarding Pinterest like task
        break;
      case 'pinterestRetweet':
        setSocialTasksCompleted({ ...socialTasksCompleted, pinterestRetweet: true });
        // Logic for rewarding Pinterest retweet task
        break;
      case 'redditFollow':
        setSocialTasksCompleted({ ...socialTasksCompleted, redditFollow: true });
        // Logic for rewarding Reddit follow task
        break;
      case 'buyTokens':
        setSocialTasksCompleted({ ...socialTasksCompleted, boughtTokens: true });
        // Logic for rewarding token purchase task
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">Tasks</h2>

      <div className="mb-8">
        {!loggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In for Daily Reward
          </button>
        ) : (
          <p className="text-green-500">Daily login reward claimed!</p>
        )}
      </div>

      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Social Media Tasks</h3>
        <ul>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Follow $TSBot on Twitter:</span>
            {!socialTasksCompleted.twitterFollow ? (
              <button
                onClick={() => handleSocialTask('twitterFollow')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Follow
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Follow $TSBot on Instagram:</span>
            {!socialTasksCompleted.instagramFollow ? (
              <button
                onClick={() => handleSocialTask('instagramFollow')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Follow
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Like $TSBot's pinned post on Pinterest:</span>
            {!socialTasksCompleted.pinterestLike ? (
              <button
                onClick={() => handleSocialTask('pinterestLike')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Like
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Retweet $TSBot's pinned post on Pinterest:</span>
            {!socialTasksCompleted.pinterestRetweet ? (
              <button
                onClick={() => handleSocialTask('pinterestRetweet')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Retweet
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Follow $TSBot on Reddit:</span>
            {!socialTasksCompleted.redditFollow ? (
              <button
                onClick={() => handleSocialTask('redditFollow')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Follow
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Buy $TSBot tokens:</span>
            {!socialTasksCompleted.boughtTokens ? (
              <button
                onClick={() => handleSocialTask('buyTokens')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Buy Tokens
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
