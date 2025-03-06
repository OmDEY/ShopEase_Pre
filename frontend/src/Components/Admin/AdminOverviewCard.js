import React from 'react';
import { FaShoppingCart, FaCheckCircle, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Import icons

const StatCard = ({ title, value, percentage, isIncrease, icon, iconColor }) => {
  return (
    <div className="flex flex-col bg-gray-800 shadow-lg rounded-lg p-4 w-full sm:w-1/3 transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${iconColor}`}>{icon}</div>
        <div className="flex items-center">
          {isIncrease ? (
            <FaArrowUp className="text-green-400 text-xl" />
          ) : (
            <FaArrowDown className="text-red-400 text-xl" />
          )}
          <span className={`ml-2 text-lg font-semibold ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
            {percentage}%
          </span>
        </div>
      </div>
      <div className="text-right">
        <h3 className="text-gray-400 text-lg font-semibold">{title}</h3>
        <p className="text-4xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

const AdminOverviewCard = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-6xl">
      <h2 className="text-2xl font-bold text-white mb-6">Orders Overview</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Card for Total Orders Placed */}
        <StatCard
          title="Total Orders Placed"
          value="1,500"
          percentage="12"
          isIncrease={true}
          icon={<FaShoppingCart />}
          iconColor="text-blue-400"
        />

        {/* Card for Delivered Orders */}
        <StatCard
          title="Orders Delivered"
          value="1,200"
          percentage="8"
          isIncrease={true}
          icon={<FaCheckCircle />}
          iconColor="text-green-400"
        />

        {/* Card for Cancelled Orders */}
        <StatCard
          title="Orders Cancelled"
          value="200"
          percentage="5"
          isIncrease={false}
          icon={<FaTimesCircle />}
          iconColor="text-red-400"
        />
      </div>
    </div>
  );
};

export default AdminOverviewCard;
