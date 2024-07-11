// components/TapToEarnTab.jsx
"use client"; // This is a client component 👈🏽
import { useState, useEffect } from 'react';

const QUOTA_LIMIT = 500; // Total allowed presses in a timeframe (e.g., 12 hours)
const RESET_TIME_HOURS = 12; // Reset time in hours

export default function TapToEarnTab() {
  const [reward, setReward] = useState(0);
  const [showPressedNumber, setShowPressedNumber] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [quota, setQuota] = useState(QUOTA_LIMIT);
  const [lastPressTime, setLastPressTime] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0); // State for total points
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem('lastPressTime');
    const storedQuota = localStorage.getItem('quota');
    const storedPoints = localStorage.getItem('totalPoints'); // Retrieve total points

    if (storedTime && storedQuota) {
      const parsedTime = Date.parse(storedTime);
      const elapsedTime = (new Date() - parsedTime) / 1000 / 3600; // Convert ms to hours

      if (elapsedTime < RESET_TIME_HOURS) {
        setLastPressTime(parsedTime);
        setQuota(parseInt(storedQuota));
      }
    }

    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints)); // Set total points from localStorage
    }
  }, []);

  const handleTap = () => {
    if (quota > 0) {
      setReward(reward + 1);
      setShowPressedNumber(true);
      setQuota(quota - 1);
      localStorage.setItem('quota', quota - 1);

      // Update last press time
      setLastPressTime(new Date());
      localStorage.setItem('lastPressTime', new Date().toISOString());

      // Update total points
      const newTotalPoints = totalPoints + 1;
      setTotalPoints(newTotalPoints);
      localStorage.setItem('totalPoints', newTotalPoints.toString());

      // Check if progress bar is filled
      if ((QUOTA_LIMIT - quota - 1) === 0) {
        setCanClaim(true);
      }

      // Hide the pressed number after 500ms (adjust as needed)
      setTimeout(() => {
        setShowPressedNumber(false);
      }, 500);
    }
  };

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
    setTimeout(() => {
      setIsSpinning(false); // Stop spinning after a delay
    }, 2000); // Adjust the time based on your animation duration
  };

  // Calculate progress percentage
  const progressPercentage = ((QUOTA_LIMIT - quota) / QUOTA_LIMIT) * 100;

  const handleClaim = () => {
    if (canClaim) {
      setTotalPoints(totalPoints + reward);
      localStorage.setItem('totalPoints', (totalPoints + reward).toString());
      setReward(0);
      setQuota(QUOTA_LIMIT);
      localStorage.setItem('quota', QUOTA_LIMIT.toString());
      setCanClaim(false);
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
          onMouseEnter={toggleSpin}
          onMouseLeave={toggleSpin}
        >
          {/* Reduced image size and adjusted styling */}
          <img
            src="/tsbot.jpg" // Replace with your image path relative to the public directory
            alt="Avatar"
            className="w-full h-full object-cover"
          />

          {/* Show the pressed number if showPressedNumber is true */}
          {showPressedNumber && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 text-3xl transition-opacity duration-300"
            >
              +1
            </div>
          )}
        </div>
      </div>

      {/* Token collection progress */}
      <div className="flex items-center justify-center w-full mb-8">
        <div className="bg-gray-800 w-64 rounded-full h-8 overflow-hidden">
          <div
            className="bg-blue-500 h-full text-center text-white font-bold"
            style={{ width: `${progressPercentage}%` }}
          >
            {quota} Tokens Left
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
