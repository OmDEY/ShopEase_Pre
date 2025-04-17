import React from 'react';
import { motion } from 'framer-motion';

const statusBadge = (status) => {
    switch(status) {
        case 'Completed':
            return 'bg-green-500/20 text-green-400';
        case 'Pending':
            return 'bg-yellow-500/20 text-yellow-400';
        case 'Cancelled':
            return 'bg-red-500/20 text-red-400';
        default:
            return 'bg-gray-500/20 text-gray-400';
    }
};

const AdminLatestTransactionsTable = ({ transactions }) => {
    return (
        <div className='bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6 rounded-2xl shadow-xl'>
            <div className="flex items-center justify-between mb-6">
                <h3 className='text-lg font-bold'>
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 w-1 h-6 mr-3 rounded-full inline-block"></span>
                    Recent Transactions
                </h3>
                <button className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                    View All
                </button>
            </div>
            
            <div className="space-y-4">
                {transactions.map((transaction, index) => (
                    <motion.div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div>
                            <div className="font-medium">{transaction.id}</div>
                            <div className="text-sm text-gray-400">{transaction.date}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold">${transaction.amount.toFixed(2)}</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${statusBadge(transaction.status)}`}>
                                {transaction.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminLatestTransactionsTable;