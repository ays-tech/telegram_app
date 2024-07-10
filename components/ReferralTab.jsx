import React, { useState } from 'react';

export default function ReferralsTab() {
  // Example state data (replace with actual data handling logic)
  const [referralCount, setReferralCount] = useState(15);
  const [invitedPeople, setInvitedPeople] = useState([
    { name: 'John Doe', referrals: 10 },
    { name: 'Jane Smith', referrals: 8 }
    // Add more entries as needed
  ]);

  // Function to calculate points brought by each referred person (2 points per referral)
  const calculatePoints = (referrals) => {
    return referrals * 2;
  };

  // Calculate total points for all invited people
  const totalPoints = invitedPeople.reduce((acc, person) => acc + calculatePoints(person.referrals), 0);

  // Example milestone progress (50% complete)
  const milestoneProgress = 50;

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black text-white p-4 overflow-hidden">
      {/* Display number of referrals invited */}
      <h2 className="text-3xl font-bold mb-4">{referralCount} Referrals</h2>

      {/* Rewards Overview */}
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 mb-4">
        <h3 className="text-xl font-bold mb-4">Rewards Overview</h3>
        <div className="text-gray-300">
          <p>Total Points: {totalPoints}</p>
          <p>Redeemed Rewards: 5</p>
          <p>Available Rewards: 10</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 mb-4">
        <h3 className="text-xl font-bold mb-4">Progress Tracker</h3>
        <div className="text-gray-300">
          <p>Milestone 1: {milestoneProgress}% Complete</p>
          <div className="bg-gray-600 h-4 w-full rounded-lg overflow-hidden mt-2">
            <div className="bg-blue-500 h-full" style={{ width: `${milestoneProgress}%` }}></div>
          </div>
        </div>
      </div>

      {/* List of invited people with their points */}
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6">
        <h3 className="text-xl font-bold mb-4">Invited People</h3>
        <ul className="border border-gray-600 rounded-lg p-4">
          {invitedPeople.map((person, index) => (
            <li key={index} className="flex items-center justify-between py-2">
              <span className="font-semibold">{person.name}</span>
              <span className="text-gray-400">{person.referrals} Referrals</span>
              <span className="text-gray-400">{calculatePoints(person.referrals)} Points</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
