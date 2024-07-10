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

  useEffect(() => {
    const storedTime = localStorage.getItem('lastPressTime');
    const storedQuota = localStorage.getItem('quota');

    if (storedTime && storedQuota) {
      const parsedTime = Date.parse(storedTime);
      const elapsedTime = (new Date() - parsedTime) / 1000 / 3600; // Convert ms to hours

      if (elapsedTime < RESET_TIME_HOURS) {
        setLastPressTime(parsedTime);
        setQuota(parseInt(storedQuota));
      }
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

      // Hide the pressed number after 500ms (adjust as needed)
      setTimeout(() => {
        setShowPressedNumber(false);
      }, 500);
    }
  };

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
  };

  // Calculate progress percentage
  const progressPercentage = ((QUOTA_LIMIT - quota) / QUOTA_LIMIT) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Tap for Tokens!</h2>
        <p className="text-lg">Tap the avatar to collect rewards!</p>
        <div className="text-3xl mt-4">Total Tokens: {reward}</div>
      </div>

      <div
        className={`relative w-64 h-64 rounded-full overflow-hidden mb-8 cursor-pointer ${isSpinning ? 'animate-spin' : ''}`}
        onClick={handleTap}
        onMouseEnter={toggleSpin}
        onMouseLeave={toggleSpin}
      >
        {/* Avatar image from public directory */}
        <img
          src="/tsbot.jpg" // Replace with your image path relative to the public directory
          alt="Avatar"
          className="w-full h-full object-cover"
        />

        {/* Show the pressed number if showPressedNumber is true */}
        {showPressedNumber && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 text-5xl transition-opacity duration-300"
          >
            +1
          </div>
        )}
      </div>

      {/* Token collection progress */}
      <div className="flex items-center justify-center w-full">
        <div className="bg-gray-600 w-64 rounded-full h-8 overflow-hidden">
          <div
            className="bg-blue-500 h-full text-center text-white font-bold"
            style={{ width: `${progressPercentage}%` }}
          >
            {quota} Tokens Left
          </div>
        </div>
      </div>
    </div>
  );
}
