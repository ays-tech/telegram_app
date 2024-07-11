// components/TapToEarnTab.jsx
"use client"; // This is a client component 👈🏽
import { useState, useEffect } from 'react';

const QUOTA_LIMIT = 500; // Total allowed presses in a timeframe (e.g., 12 hours)
const RESET_TIME_HOURS = 12; // Reset time in hours

export default function TapToEarnTab() {
  const [totalPoints, setTotalPoints] = useState(0); // State for total points
  const [isSpinning, setIsSpinning] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState(null);

  useEffect(() => {
    const storedPoints = localStorage.getItem('totalPoints'); // Retrieve total points
    const storedTime = localStorage.getItem('lastClaimTime');

    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints)); // Set total points from localStorage
    }

    if (storedTime) {
      setLastClaimTime(new Date(storedTime));
    }
  }, []);

  const handleTap = () => {
    if (!canClaim && !isSpinning) {
      setIsSpinning(true);
      setProgressPercentage(0);
      const progressInterval = setInterval(() => {
        setProgressPercentage(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsSpinning(false);
            setCanClaim(true);
          }
          return newProgress;
        });
      }, 50); // Adjust the interval speed as needed
    }
  };

  const handleClaim = () => {
    if (canClaim) {
      const now = new Date();
      const hoursSinceLastClaim = lastClaimTime ? (now - lastClaimTime) / 1000 / 3600 : RESET_TIME_HOURS;
      if (hoursSinceLastClaim >= RESET_TIME_HOURS) {
        const newTotalPoints = totalPoints + 5;
        setTotalPoints(newTotalPoints);
        localStorage.setItem('totalPoints', newTotalPoints.toString());
        setLastClaimTime(now);
        localStorage.setItem('lastClaimTime', now.toISOString());
        setCanClaim(false);
        setProgressPercentage(0);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white font-sans">
      {/* Display total points */}
      <div className="text-center mt-8 mb-12">
        <h2 className="text-4xl font-bold mb-2">{totalPoints} Points</h2>
        <p className="text-lg mb-4">Tap the avatar to collect rewards!</p>
      </div>

      {/* Avatar section with click handling and spinning animation */}
      <div className="relative rounded-lg p-4 mb-8 cursor-pointer">
        <div
          className={`w-36 h-36 rounded-full overflow-hidden ${isSpinning ? 'animate-spin' : ''}`}
          onClick={handleTap}
        >
          {/* Reduced image size and adjusted styling */}
          <img
            src="/tsbot.jpg" // Replace with your image path relative to the public directory
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Token collection progress */}
      <div className="flex items-center justify-center w-full mb-8">
        <div className="bg-gray-800 w-64 rounded-full h-8 overflow-hidden">
          <div
            className="bg-blue-500 h-full text-center text-white font-bold"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage}%
          </div>
        </div>
      </div>

      {/* Claim Reward button */}
      <div className="flex flex-col items-center justify-center text-center">
        <button
          className={`py-2 px-4 rounded-lg focus:outline-none ${canClaim ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-500 text-gray-300'}`}
          onClick={handleClaim}
          disabled={!canClaim}
        >
          {canClaim ? 'Claim Reward' : 'Progress to Claim'}
        </button>
      </div>
    </div>
  );
}
