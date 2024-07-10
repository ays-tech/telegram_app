import React, { useState } from 'react';

export default function TaskTab() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [socialTasksCompleted, setSocialTasksCompleted] = useState({
    twitterFollow: false,
    instagramFollow: false,
    telegramJoin: false,
    twitterRetweet: false,
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
        window.open('https://twitter.com/turbosignals', '_blank'); // Example: Open Twitter page in a new tab
        break;
      case 'instagramFollow':
        setSocialTasksCompleted({ ...socialTasksCompleted, instagramFollow: true });
        window.open('https://www.instagram.com/turbosignalscommunity/', '_blank'); // Example: Open Instagram page in a new tab
        break;
      case 'telegramJoin':
        // Logic to check if user has joined Telegram group
        checkTelegramJoinStatus();
        break;
      case 'twitterRetweet':
        setSocialTasksCompleted({ ...socialTasksCompleted, twitterRetweet: true });
        window.open('https://twitter.com/turbosignals/status/1808800471437414713?s=52&t=aFmrCA95ZOgooiaYjEAooA', '_blank'); // Example: Open Twitter retweet link in a new tab
        break;
      case 'redditFollow':
        setSocialTasksCompleted({ ...socialTasksCompleted, redditFollow: true });
        window.open('https://www.reddit.com/r/turbosignals/', '_blank'); // Example: Open Reddit page in a new tab
        break;
      case 'buyTokens':
        setSocialTasksCompleted({ ...socialTasksCompleted, boughtTokens: true });
        // Logic for rewarding token purchase task
        break;
      default:
        break;
    }
  };

  const checkTelegramJoinStatus = () => {
    // Simulating checking if user has joined Telegram group
    const hasJoinedTelegram = true; // Replace with actual logic to check membership

    if (hasJoinedTelegram) {
      setSocialTasksCompleted({ ...socialTasksCompleted, telegramJoin: true });
      window.open('https://t.me/turbosignalscommunity', '_blank'); // Open Telegram group link if joined
    } else {
      alert('Please join the Telegram group to complete this task.');
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
                className="task-button"
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
                className="task-button"
              >
                Follow
              </button>
            ) : (
              <span className="text-green-500">Completed!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Join $TSBot Telegram group:</span>
            {!socialTasksCompleted.telegramJoin ? (
              <button
                onClick={() => handleSocialTask('telegramJoin')}
                className="task-button"
              >
                Join
              </button>
            ) : (
              <span className="text-green-500">Joined!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Retweet $TSBot&apos;s tweet:</span>
            {!socialTasksCompleted.twitterRetweet ? (
              <button
                onClick={() => handleSocialTask('twitterRetweet')}
                className="task-button"
              >
                Retweet
              </button>
            ) : (
              <span className="text-green-500">Retweeted!</span>
            )}
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="font-semibold">Follow $TSBot on Reddit:</span>
            {!socialTasksCompleted.redditFollow ? (
              <button
                onClick={() => handleSocialTask('redditFollow')}
                className="task-button"
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
                className="task-button"
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
