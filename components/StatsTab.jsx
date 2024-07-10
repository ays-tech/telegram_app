// components/StatsTab.jsx
"use client";
import React from 'react';

export default function StatsTab() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">Stats Tab</h2>

      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">User Engagement Metrics</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-2">
            <span className="font-semibold">Total Users:</span>
            <span className="text-green-500">60000</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Active Users Today:</span>
            <span className="text-green-500">2,500</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Total Rewards Distributed:</span>
            <span className="text-green-500">5000</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Top Referrers:</span>
            <ul className="text-green-500">
              <li>Staunt Man</li>
              <li>Dev</li>
              <li>joh Doe</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
