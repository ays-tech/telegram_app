// components/ReferralsTab.jsx
import React from 'react';

export default function ReferralsTab() {
  return (
    <div className="flex flex-col items-center justify-start h-full bg-black text-white p-4">
      <h2 className="text-3xl font-bold mb-4">Referrals Tab</h2>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Manage and track referral programs, display top referrers, and provide rewards.
      </p>
      {/* Add your referral program management UI here */}
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Example UI for referral program management */}
        <h3 className="text-xl font-bold mb-4">Manage Your Referral Program</h3>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">Top Referrers</h4>
          <ul className="border border-gray-600 rounded-lg p-4">
            {/* Example list of top referrers */}
            <li className="flex items-center justify-between py-2">
              <span className="font-semibold">John Doe</span>
              <span className="text-gray-400">10 Referrals</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span className="font-semibold">Jane Smith</span>
              <span className="text-gray-400">8 Referrals</span>
            </li>

            {/* Add more as needed */}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">Provide Rewards</h4>
          <p className="text-gray-300">
            Reward your top referrers with exclusive discounts, credits, or special offers.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2">Track Performance</h4>
          <p className="text-gray-300">
            Use analytics to track referral engagement, conversions, and overall program performance.
          </p>
        </div>
      </div>
    </div>
  );
}
