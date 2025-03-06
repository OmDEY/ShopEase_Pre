// src/components/StatsCard.js
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatsCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4">
      <h3 className="text-gray-700 text-xl font-semibold">{title}</h3>
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <FaArrowUp className="w-5 h-5" />
          ) : (
            <FaArrowDown className="w-5 h-5" />
          )}
          <span className="ml-1 text-sm">{change}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
