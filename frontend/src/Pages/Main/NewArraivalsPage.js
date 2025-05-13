import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchNewArrivalProducts } from "../../services/api";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // or make this dynamic too

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await fetchNewArrivalProducts(page, limit);
        setProducts((prev) => [...prev, ...response.data]); // Append for Load More
      } catch (err) {
        setError("Failed to fetch new arrivals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, [page, limit]);

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

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              New Arrivals
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Loading our latest products...
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
          >
            Discover our latest collection of products
          </motion.p>
        </div>

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
              <motion.div
                variants={hoverVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/300"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </div>
                  <button
                    onClick={() => navigate(`/product?productId=${product._id}`)}
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
                      <p className="text-sm text-gray-500 mt-1">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921...z" />
                      </svg>
                      <span className="text-gray-700 ml-1">4.5</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        $
                        {typeof product.price === "number"
                          ? product.price.toFixed(2)
                          : "N/A"}
                      </span>
                      {Array.isArray(product.variants) &&
                        product.variants.length > 0 && (
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
                          d="M4.318 6.318a4.5..."
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M16 11V3a1 1 0 00-1-1H5a1 1 0 00-1 1v8H1v2h1a1 1 0 001 1h12a1 1 0 001-1h1v-2h-2zM6 4h8v7H6V4z" />
                    </svg>
                    View Details
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
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load More
            </motion.button>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center col-span-full text-gray-500 text-lg">
            No new arrivals found.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
