import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCheckCircle, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ title, value, percentage, isIncrease, icon, iconColor }) => {
    return (
        <motion.div 
            className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 w-full shadow-lg"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`text-4xl p-3 rounded-full bg-opacity-20 ${iconColor} bg-white`}>
                    {icon}
                </div>
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                    {isIncrease ? (
                        <FaArrowUp className="text-green-400 text-sm" />
                    ) : (
                        <FaArrowDown className="text-red-400 text-sm" />
                    )}
                    <span className={`ml-2 text-sm font-medium ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
                        {percentage}%
                    </span>
                </div>
            </div>
            <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <p className="text-3xl font-bold text-white mt-2">{value}</p>
            </div>
        </motion.div>
    );
};

const AdminOverviewCard = ({ totalOrders, successfulOrders, cancelledOrders, successTrend, cancelTrend }) => {
    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 w-1 h-6 mr-3 rounded-full"></span>
                Orders Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StatCard
                    title="Total Orders"
                    value={totalOrders.toLocaleString()}
                    percentage="12"
                    isIncrease={true}
                    icon={<FaShoppingCart />}
                    iconColor="text-blue-400"
                />
                <StatCard
                    title="Successful Orders"
                    value={successfulOrders.toLocaleString()}
                    percentage="8"
                    isIncrease={successTrend === 'up'}
                    icon={<FaCheckCircle />}
                    iconColor="text-green-400"
                />
                <StatCard
                    title="Cancelled Orders"
                    value={cancelledOrders.toLocaleString()}
                    percentage="5"
                    isIncrease={cancelTrend === 'up'}
                    icon={<FaTimesCircle />}
                    iconColor="text-red-400"
                />
            </div>
        </div>
    );
};

export default AdminOverviewCard;