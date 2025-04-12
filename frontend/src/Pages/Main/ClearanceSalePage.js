import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchClearanceProducts } from "../../services/api";

const ClearanceSalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClearanceProductsData = async () => {
      try {
        setLoading(true);
        const response = await fetchClearanceProducts();
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load clearance items. Please try again.");
        console.error("Error fetching clearance products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClearanceProductsData();
  }, []);

  // Filter products
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products?.filter(p => p.clearanceLevel === activeFilter);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.25)",
      transition: { duration: 0.3 }
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">
                Clearance Sale
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Loading massive discounts...
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">
              CLEARANCE SALE
            </span>
          </h1>
          <motion.p
            animate={shakeVariants}
            className="text-xl sm:text-2xl text-gray-600 mb-8 inline-block px-4 py-2 bg-red-100 rounded-lg"
          >
            ⚡ Everything must go! Prices slashed up to 80% off ⚡
          </motion.p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'final', 'last-chance', 'limited']?.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-medium capitalize ${
                  activeFilter === filter
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {filter === 'all' ? 'All Items' : filter.replace('-', ' ')}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts?.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover="hover"
                className="relative"
              >
                {/* Clearance Level Badge */}
                <div className={`absolute top-3 left-3 z-10 text-white font-bold text-xs px-3 py-1 rounded-full ${
                  product.clearanceLevel === 'final' ? 'bg-red-800' :
                  product.clearanceLevel === 'last-chance' ? 'bg-orange-600' : 'bg-amber-500'
                }`}>
                  {product.clearanceLevel === 'final' ? 'FINAL STOCK' :
                   product.clearanceLevel === 'last-chance' ? 'LAST CHANCE' : 'LIMITED'}
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 z-10 bg-white text-red-600 font-bold text-sm px-2 py-1 rounded-full shadow-lg">
                  {product.discountPercentage}% OFF
                </div>

                {/* Stock Indicator */}
                {product.stock < 5 && (
                  <div className="absolute top-12 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    ONLY {product.stock} LEFT!
                  </div>
                )}

                <motion.div
                  variants={hoverVariants}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-100"
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
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                    {/* Price */}
                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-red-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar for stock */}
                    {product.stock < 10 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Sold: {Math.floor((1 - product.stock/10) * 100)}%</span>
                          <span>Left: {product.stock}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, 100 - (product.stock/10) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="mt-4 w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-orange-600 transition-colors font-bold flex items-center justify-center shadow-lg shadow-red-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Grab This Deal
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No {activeFilter === 'all' ? '' : activeFilter.replace('-', ' ')} clearance items available
            </h3>
            <p className="text-gray-500 mb-6">
              Check back soon for new clearance additions!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('all')}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              View All Clearance
            </motion.button>
          </div>
        )}

        {/* Final Call Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-red-700 to-orange-600 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              FINAL CALL FOR CLEARANCE ITEMS!
            </h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              These prices won't last! Once they're gone, they're gone forever. Don't miss your chance to save big.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter('final')}
                className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                View Final Stock
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo(0, 0)}
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Back to Top
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClearanceSalePage;