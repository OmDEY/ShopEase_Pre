import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchBestSellers } from '../../services/api';
import { toast } from 'react-toastify';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellersProducts = async () => {
        console.log('function called')
      try {
        setLoading(true);
        const response = await fetchBestSellers(activeTab);
        setProducts(response);
      } catch (err) {
        setError('Failed to fetch best sellers. Please try again later.');
        console.error('Error fetching products:', err);
        toast.error('Failed to fetch best sellers for the selected category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellersProducts();
  }, [activeTab]);

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

  const tabs = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics & Gadgets' },
    { id: 'clothing', name: 'Clothing & Apparel' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'books', name: 'Books & Stationery' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'grocery', name: 'Grocery & Food' },
    { id: 'sports', name: 'Sports & Fitness' },
    { id: 'toys', name: 'Toys & Baby Products' },
    // { id: 'furniture', name: 'Furniture' },
    // { id: 'health', name: 'Health & Safety' },
    // { id: 'pet', name: 'Pet Care' },
    // { id: 'other', name: 'Other' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Best Sellers
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Loading our most popular products...
            </motion.p>
          </div>
          
          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-12">
            <div className="animate-pulse flex space-x-4">
              {tabs.map((_, index) => (
                <div key={index} className="h-10 bg-gray-200 rounded-lg w-24"></div>
              ))}
            </div>
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Best Sellers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
          >
            Shop our most loved products
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.name)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover="hover"
              className="relative"
            >
              {/* Best Seller Badge for top 3 products */}
              {index < 3 && (
                <div className="absolute -top-3 -left-3 z-10">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-yellow-400 rounded-full blur-md opacity-75"></div>
                    <div className="relative bg-yellow-500 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                      #{index + 1}
                    </div>
                  </div>
                </div>
              )}
              
              <motion.div
                variants={hoverVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Sales Count */}
                  <div className="absolute bottom-4 left-4 bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded">
                    {product.salesCount || 0}+ sold
                  </div>
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

                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.variants.length > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                          + {product.variants.length} variants
                        </span>
                      )}
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center"
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
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {products.length > 0 && (
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              View All Best Sellers
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;