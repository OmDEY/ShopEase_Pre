import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchDealsOfTheDay } from '../../services/api';

const DealsOfTheDay = () => {
  const [products, setProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(86400000); // 24 hours in ms
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDealsOfTheDayProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchDealsOfTheDay();
        console.log('res >>>', response);  // Log the response to check its structure
  
        // If response is an object, ensure it contains products
        if (Array.isArray(response)) {
          setProducts(response);
        } else if (response?.products && Array.isArray(response.products)) {
          setProducts(response.products);
        } else {
          console.error("Response does not contain a valid product array:", response);
        }
  
        // Set featured deal (first product with isFeatured flag or first product)
        const featured = response.find((p) => p.isFeatured) || response[0];
        setFeaturedProduct(featured);
  
        // Set deal end time (using featured product's end time or 24 hours from now)
        if (featured?.dealEndsAt) {
          const endTime = new Date(featured.dealEndsAt).getTime();
          const now = new Date().getTime();
          setTimeRemaining(Math.max(0, endTime - now));
        }
      } catch (err) {
        setError('Failed to fetch deals of the day. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDealsOfTheDayProducts();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.03, 1],
      boxShadow: [
        '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)',
        '0 10px 15px -3px rgba(239, 68, 68, 0.2), 0 4px 6px -2px rgba(239, 68, 68, 0.1)',
        '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)'
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Deals of the Day
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Loading today's exclusive deals...
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Deals of the Day
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
          >
            Limited-time offers you can't miss
          </motion.p>
        </div>

        {/* Featured Deal */}
        {featuredProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Product Image */}
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={featuredProduct.images[0] || 'https://via.placeholder.com/800'}
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-white rounded-full blur-md opacity-75"></div>
                      <div className="relative bg-white text-amber-600 font-bold text-lg px-4 py-2 rounded-full">
                        FEATURED DEAL
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      {featuredProduct.title}
                    </h2>
                    <p className="text-amber-100">{featuredProduct.brand}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      <span className="text-4xl sm:text-5xl font-bold text-white mr-4">
                        ${featuredProduct.price.toFixed(2)}
                      </span>
                      {featuredProduct.originalPrice && (
                        <span className="text-xl text-amber-100 line-through">
                          ${featuredProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {featuredProduct.discountPercentage && (
                      <span className="inline-block mt-2 bg-white text-amber-600 font-bold px-3 py-1 rounded-full text-sm">
                        Save {featuredProduct.discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Countdown Timer */}
                  <div className="mb-8">
                    <p className="text-amber-100 mb-2">Hurry! Deal ends in:</p>
                    <div className="flex space-x-2">
                      {formatTime(timeRemaining).split(':').map((unit, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="bg-black bg-opacity-30 text-white text-2xl sm:text-3xl font-bold px-3 py-2 rounded-lg w-16 sm:w-20 text-center">
                            {unit}
                          </div>
                          <span className="text-xs text-amber-100 mt-1">
                            {['Hours', 'Minutes', 'Seconds'][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/products/${featuredProduct._id}`)}
                      className="flex-1 bg-white text-amber-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/products/${featuredProduct._id}`)}
                      className="flex-1 bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Daily Deals Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Best Deals</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover="hover"
                className="relative"
              >
                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-amber-400 rounded-full blur-md opacity-75"></div>
                      <div className="relative bg-amber-500 text-white font-bold text-sm px-3 py-1 rounded-full">
                        {product.discountPercentage}% OFF
                      </div>
                    </div>
                  </div>
                )}

                <motion.div
                  variants={hoverVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden group">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/300'}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Quick View Button */}
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 text-white font-medium"
                    >
                      Quick View
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(42)</span>
                    </div>

                    <motion.button
                      variants={pulseVariants}
                      animate="pulse"
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors text-sm font-medium"
                    >
                      Shop Now
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* More Deals Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Want More Daily Deals?</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Sign up for our newsletter and get exclusive early access to our daily deals before they go public!
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Notify Me
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DealsOfTheDay;