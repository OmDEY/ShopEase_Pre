import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Dummy data for the Deal of the Day
const dealData = [
    { id: 1, name: 'Simply Lemonade', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2U6ZGOBK8gkH09bObzTP3HjF5jhNyrYNj_Q&s', rating: 4.5, description: 'Refreshing lemonade with a hint of lemon.', company: 'Simply Beverages' },
    { id: 2, name: 'Raspberry Juice', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6kSXALdWVrl6W9_Fi2C4qwVYzKW_mrjo-g&s', rating: 4.7, description: 'Sweet and tangy raspberry juice.', company: 'Raspberry Delights' },
    { id: 3, name: 'Orange Punch', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzoQfNj7WkwjhkCQK2r-gjkAQLSrdXha5Hug&s', rating: 4.2, description: 'Zesty orange punch with a burst of flavor.', company: 'Citrus Creations' },
    { id: 4, name: 'Grape Fusion', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMkpzaxLeLm4wEuxJ834Dx_yvOz198MdTaGw&s', rating: 4.6, description: 'Delicious grape fusion with a smooth finish.', company: 'Grape Goodness' },
];

const DealOfTheDay = () => {
    return (
        <div className="my-12 px-4 lg:px-8">
            <div className='flex justify-between mb-8'>
                <h2 className="text-3xl font-semibold text-center">Deal of the Day</h2>
                <div className='flex items-center space-x-2'>
                    <span className='text-sm font-semibold'>View Deals</span>
                    <ArrowRightIcon className='w-4 h-4 text-gray-500' />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dealData.map((deal) => (
                    <div key={deal.id} className="relative group">
                        {/* Product Image */}
                        <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-64 object-cover rounded-lg transition-transform transform group-hover:scale-105"
                        />
                        {/* Card */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 sm:w-64 md:w-64 bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 group-hover:translate-y-0 translate-y-1/2">
                            <h3 className="text-lg font-bold mb-2">{deal.name}</h3>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500">
                                    {'★'.repeat(Math.round(deal.rating))}
                                    {'☆'.repeat(5 - Math.round(deal.rating))}
                                </span>
                                <span className="ml-2 text-gray-500">({deal.rating})</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{deal.description}</p>
                            <p className="text-xs text-gray-500 mb-2">{deal.company}</p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105">
                                    Add to Cart
                                </button>
                                <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DealOfTheDay;
