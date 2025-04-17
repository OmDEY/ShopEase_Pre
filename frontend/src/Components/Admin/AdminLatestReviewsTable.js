import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const AdminLatestReviewsTable = ({ reviews }) => {
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <FaStar 
                key={i} 
                className={i < rating ? "text-yellow-400" : "text-gray-600"} 
                size={14}
            />
        ));
    };

    return (
        <div className='bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6 rounded-2xl shadow-xl'>
            <div className="flex items-center justify-between mb-6">
                <h3 className='text-lg font-bold'>
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 w-1 h-6 mr-3 rounded-full inline-block"></span>
                    Customer Reviews
                </h3>
                <button className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                    View All
                </button>
            </div>
            
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <motion.div 
                        key={index}
                        className="p-4 bg-gray-700/50 rounded-lg"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{review.customer}</div>
                            <div className="flex">
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm">{review.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminLatestReviewsTable;