import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, fetchTopDealsOfTheDay } from '../../services/api';

const DealOfTheDay = () => {
  const [dealData, setDealData] = useState([]);
  const navigate = useNavigate();

  const fetchTopDealsOfTheDayData = async () => {
    try {
      const response = await fetchTopDealsOfTheDay();
      setDealData(response); // ✅ Set state
    } catch (error) {
      console.error('Error fetching top deals:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    fetchTopDealsOfTheDayData();
  }, []);

  return (
    <div className="my-12 px-4 lg:px-8">
      <div className='flex justify-between mb-8'>
        <h2 className="text-3xl font-semibold text-center">Deal of the Day</h2>
        <div className='flex cursor-pointer items-center space-x-2'>
          <span onClick={() => navigate('/deals-of-the-day')} className='text-sm font-semibold'>View Deals</span>
          <ArrowRightIcon className='w-4 h-4 text-gray-500' />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealData.map((deal) => {
          const imageUrl = deal.images?.[0] || "https://via.placeholder.com/300";
          const rating = Math.round(deal.averageRating || 0);
          const brand = deal.brand || "Unknown Brand";

          return (
            <div key={deal._id} className="relative group">
              <img
                src={imageUrl}
                alt={deal.title}
                className="w-full h-64 object-cover rounded-lg transition-transform transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 group-hover:translate-y-0 translate-y-1/2">
                <h3 className="text-lg font-bold mb-2">{deal.title}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                  </span>
                  <span className="ml-2 text-gray-500">({deal.averageRating.toFixed(1)})</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{deal.description}</p>
                <p className="text-xs text-gray-500 mb-2">{brand}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-green-600 font-bold text-sm">${deal.price.toFixed(2)}</span>{' '}
                    <span className="line-through text-xs text-gray-400">${deal.originalPrice?.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(deal._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealOfTheDay;