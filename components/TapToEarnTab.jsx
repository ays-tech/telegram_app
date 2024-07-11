// components/TapToEarnTab.jsx
"use client"; // This is a client component 👈🏽
import { useState, useEffect } from 'react';

const RESET_TIME_HOURS = 12; // Reset time in hours
const POINTS_PER_CLAIM = 5; // Points per claim

export default function TapToEarnTab() {
  const [totalPoints, setTotalPoints] = useState(0); // State for total points
  const [isSpinning, setIsSpinning] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const storedPoints = localStorage.getItem('totalPoints'); // Retrieve total points
    const storedTime = localStorage.getItem('lastClaimTime');

    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints)); // Set total points from localStorage
    }

    if (storedTime) {
      const parsedTime = new Date(storedTime);
      setLastClaimTime(parsedTime);
      const elapsedTime = (new Date() - parsedTime) / 1000 / 3600; // Convert ms to hours
      if (elapsedTime < RESET_TIME_HOURS) {
        setCanClaim(false);
        setTimeLeft(RESET_TIME_HOURS - elapsedTime);
        setProgressPercentage((elapsedTime / RESET_TIME_HOURS) * 100);
        setIsSpinning(true);
      } else {
        setCanClaim(true);
        setTimeLeft(0);
        setProgressPercentage(100);
        setIsSpinning(false);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft !== null) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            setCanClaim(true);
            setProgressPercentage(100);
            setIsSpinning(false);
            return 0;
          }
          const newTimeLeft = prev - (1 / 3600); // Decrease by 1 second
          setProgressPercentage(((RESET_TIME_HOURS - newTimeLeft) / RESET_TIME_HOURS) * 100);
          return newTimeLeft;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleTap = () => {
    if (!canClaim && !isSpinning) {
      setIsSpinning(true);
      setProgressPercentage(0);
      const progressInterval = setInterval(() => {
        setProgressPercentage(prev => {
          const newProgress = prev + (100 / (RESET_TIME_HOURS * 3600)); // Increment per second
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsSpinning(false);
            setCanClaim(true);
            setTimeLeft(0);
          }
          return newProgress;
        });
      }, 1000); // Update progress every second
    }
  };

  const handleClaim = () => {
    if (canClaim) {
      const now = new Date();
      const newTotalPoints = totalPoints + POINTS_PER_CLAIM;
      setTotalPoints(newTotalPoints);
      localStorage.setItem('totalPoints', newTotalPoints.toString());
      setLastClaimTime(now);
      localStorage.setItem('lastClaimTime', now.toISOString());
      setCanClaim(false);
      setProgressPercentage(0);
      setTimeLeft(RESET_TIME_HOURS);
      setIsSpinning(true);
    }
  };

  const formatTimeLeft = (hours) => {
    const hrs = Math.floor(hours);
    const mins = Math.floor((hours - hrs) * 60);
    return `${hrs}h ${mins}m`;
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
  <div className="bg-gray-800 w-64 rounded-full h-8 overflow-hidden relative">
    <div
      className="bg-blue-500 h-full text-center text-white font-bold absolute inset-y-0 left-0"
      style={{ width: `${progressPercentage}%` }}
    >
        {progressPercentage.toFixed(2)}%
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
          {canClaim ? 'Claim Reward' : `Come back in ${formatTimeLeft(timeLeft)}`}
        </button>
      </div>
    </div>
  );
}
