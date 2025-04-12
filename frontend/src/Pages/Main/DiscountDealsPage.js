import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { fetchDiscountDeals } from '../../services/api';

const DiscountDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscountDealsProducts = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetchDiscountDeals();
        setProducts(response.data);
        
        // Initialize countdown timers
        const timers = {};
        response.data.forEach((product) => {
          if (product.dealEndsAt) {
            const endTime = new Date(product.dealEndsAt).getTime();
            const now = new Date().getTime();
            timers[product._id] = Math.max(0, endTime - now);
          }
        });
        setTimeRemaining(timers);
      } catch (err) {
        setError('Failed to fetch discount deals. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountDealsProducts();

    // Set up interval for countdown timers
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => {
        const updated = {...prev};
        Object.keys(updated).forEach(id => {
          if (updated[id] > 0) {
            updated[id] -= 1000;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (ms) => {
    if (ms <= 0) return 'Expired';
    
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Hot Deals
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Loading our exclusive discounts...
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-200 w-full"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Limited-Time Deals
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
          >
            Don't miss these exclusive discounts
          </motion.p>
        </div>

        {/* Flash Sale Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-white mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold">FLASH SALE</h2>
              <p className="text-rose-100">Limited quantities available</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <p className="text-white text-sm font-medium">ENDS IN</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="text-white text-2xl font-bold">
                  {products[0]?.dealEndsAt ? formatTime(timeRemaining[products[0]._id] || 0) : '24:00:00'}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 sm:mt-0 px-6 py-3 bg-white text-rose-600 font-bold rounded-lg hover:bg-rose-50 transition-colors shadow-md"
            >
              Shop All Deals
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover="hover"
              className="relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="relative">
                  <div className="absolute -inset-1 bg-rose-400 rounded-full blur-md opacity-75"></div>
                  <div className="relative bg-rose-500 text-white font-bold text-sm px-3 py-1 rounded-full">
                    {product.discountPercentage}% OFF
                  </div>
                </div>
              </div>

              {/* Countdown Timer for deals */}
              {product.dealEndsAt && (
                <div className="absolute top-4 right-4 z-10 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {formatTime(timeRemaining[product._id] || 0)}
                </div>
              )}

              <motion.div
                variants={hoverVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-rose-100"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Stock Indicator */}
                  {product.stock < 10 && (
                    <div className="absolute bottom-4 left-4 bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded">
                      Only {product.stock} left!
                    </div>
                  )}
                  {/* Quick View Button */}
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 text-white font-medium"
                  >
                    Quick View
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700 ml-1">4.5</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mt-4">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-rose-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {product.discountPercentage && (
                        <span className="ml-2 text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                          Save {product.discountPercentage}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for limited stock */}
                  {product.stock < 20 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Sold: {Math.floor((1 - product.stock/20) * 100)}%</span>
                        <span>Available: {product.stock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-rose-500 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, 100 - (product.stock/20) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <motion.button
                    variants={pulseVariants}
                    animate="pulse"
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="mt-4 w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all flex items-center justify-center font-bold shadow-lg shadow-rose-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Grab the Deal
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter for more deals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Want More Deals?</h3>
            <p className="text-gray-600 mb-6">Subscribe to get exclusive discounts before anyone else!</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-rose-600 text-white font-medium rounded-r-lg hover:bg-rose-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscountDeals;