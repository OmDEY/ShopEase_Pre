import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchWeekendSpecialProducts } from "../../services/api";

const WeekendSpecialsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

  // Calculate time until Monday 00:00
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const nextMonday = new Date();
      
      // Set to next Monday 00:00
      nextMonday.setDate(now.getDate() + ((7 - now.getDay() + 1) % 7 || 7));
      nextMonday.setHours(0, 0, 0, 0);
      
      const diff = nextMonday.getTime() - now.getTime();
      
      setTimeRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeekendSpecials = async () => {
      try {
        setLoading(true);
        const response = await fetchWeekendSpecialProducts();
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load weekend specials. Please try again.");
        console.error("Error fetching weekend specials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekendSpecials();
  }, []);

  // Animation Variants
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
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)",
      transition: { duration: 0.3 },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      backgroundColor: ["#ec4899", "#db2777", "#ec4899"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Weekend Specials
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Loading exclusive weekend deals...
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)]?.map((_, index) => (
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              WEEKEND FLASH SALE
            </h2>
            <p className="text-pink-100 text-lg mb-6">
              Exclusive deals ending in:
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                <div className="text-white text-3xl font-bold">
                  {timeRemaining.days.toString().padStart(2, '0')}
                </div>
                <div className="text-pink-100 text-xs">DAYS</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                <div className="text-white text-3xl font-bold">
                  {timeRemaining.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-pink-100 text-xs">HOURS</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                <div className="text-white text-3xl font-bold">
                  {timeRemaining.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-pink-100 text-xs">MINUTES</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                <div className="text-white text-3xl font-bold">
                  {timeRemaining.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-pink-100 text-xs">SECONDS</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-pink-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Shop All Weekend Deals
            </motion.button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products?.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover="hover"
              className="relative"
            >
              {/* Discount Ribbon */}
              <div className="absolute top-0 right-0 z-10 bg-pink-500 text-white font-bold text-sm px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2 shadow-lg">
                {product.discountPercentage}% OFF
              </div>

              {/* Stock Warning */}
              {product.stock < 10 && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Only {product.stock} left!
                </div>
              )}

              <motion.div
                variants={hoverVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={product.images[0] || "https://via.placeholder.com/300"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 text-white font-medium"
                  >
                    Quick View
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="mt-3">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-pink-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-pink-500 mt-1">
                      You save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-3">
                    {[...Array(5)]?.map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < (product.rating || 4) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100) + 20})</span>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    variants={pulseVariants}
                    animate="pulse"
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="mt-4 w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Limited Time Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              EXTENDED WEEKEND DEALS
            </h3>
            <p className="text-purple-100 mb-6">
              Subscribe to get exclusive weekend offers every Friday
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Early Access
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeekendSpecialsPage;