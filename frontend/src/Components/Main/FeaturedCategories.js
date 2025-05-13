import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCategories, fetchFeaturedCategoriesProducts } from '../../services/api';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaFire } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const FeaturedCategories = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState({});
  const [activeCat, setActiveCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  const cardsPerView = 6;
  const [startIndex, setStartIndex] = useState(0);

  // Vibrant color palette
  const categoryColors = [
    'from-fuchsia-500 to-purple-600',
    'from-amber-500 to-pink-600',
    'from-emerald-400 to-teal-600',
    'from-blue-400 to-indigo-600',
    'from-rose-500 to-red-600',
    'from-violet-500 to-blue-600',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const catRes = await fetchCategories();
        setCategories(catRes);
        if (catRes.length) setActiveCat(catRes[0]._id);

        const prodByCat = {};
        await Promise.all(
          catRes.map(async (cat) => {
            const prodRes = await fetchFeaturedCategoriesProducts(cat._id);
            prodByCat[cat._id] = prodRes;
          })
        );
        setProductsByCat(prodByCat);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTab = (catId) => {
    setActiveCat(catId);
    setStartIndex(0);
  };

  const slideLeft = () => setStartIndex((i) => Math.max(i - 1, 0));
  const slideRight = () => {
    const maxIndex = (productsByCat[activeCat]?.length || 0) - cardsPerView;
    setStartIndex((i) => Math.min(i + 1, maxIndex));
  };

  const handleProductClick = (product) => {
    setSearchTerm(product.title);
    navigate(`/product?productId=${product._id}`);
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 text-xs" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-yellow-400 text-xs" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="container mx-auto my-16 px-4">
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center"
          >
            <FiShoppingBag className="text-white text-2xl" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-16 px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 md:mb-0"
        >
          Hot Categories 🔥
        </motion.h2>
        
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-full shadow-lg font-medium"
        >
          Explore All
          <IoIosArrowForward className="ml-1" />
        </motion.button> */}
      </div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex space-x-4 mb-8 overflow-x-auto pb-4 scrollbar-hide"
      >
        {categories.map((cat, index) => (
          <button
            key={cat._id}
            onClick={() => handleTab(cat._id)}
            className={`relative px-6 py-3 text-sm font-bold whitespace-nowrap rounded-full transition-all ${
              activeCat === cat._id 
                ? `text-white shadow-xl bg-gradient-to-r ${categoryColors[index % categoryColors.length]}`
                : 'text-gray-700 hover:text-white bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {cat.categoryName}
            {activeCat === cat._id && (
              <motion.span 
                layoutId="activeTab"
                className="absolute inset-0 rounded-full z-0"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Cards Slider */}
      <div className="relative">
        <AnimatePresence>
          {startIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={slideLeft}
              disabled={startIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-4 shadow-2xl rounded-full z-10 flex items-center justify-center hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white transition-all"
            >
              <FiChevronLeft className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {productsByCat[activeCat]
            ?.slice(startIndex, startIndex + cardsPerView)
            .map((prod) => (
              <motion.div
                key={prod._id}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredProduct(prod._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(prod)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProduct === prod._id ? 1 : 0 }}
                  />
                  
                  {/* Hot Deal Badge */}
                  {prod.hotDeal && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <FaFire className="mr-1" /> HOT
                    </div>
                  )}
                  
                  {/* Quick Add to Cart */}
                  {/* <motion.button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-purple-600 px-4 py-2 rounded-full shadow-lg flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShoppingBag className="mr-2" />
                    Add to Cart
                  </motion.button> */}
                </div>
                
                <div className="p-4">
                  <h3 className="text-md font-bold text-gray-800 mb-1 truncate">{prod.title}</h3>
                  
                  <div className="flex items-center mb-2">
                    {renderRatingStars(prod.rating || 4.5)}
                    <span className="text-xs text-gray-500 ml-1">({prod.reviews || 24})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-purple-600">${prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">${prod.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {prod.discount && (
                      <span className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full">
                        -{prod.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <AnimatePresence>
          {startIndex < (productsByCat[activeCat]?.length || 0) - cardsPerView && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={slideRight}
              disabled={startIndex >= (productsByCat[activeCat]?.length || 0) - cardsPerView}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 shadow-2xl rounded-full z-10 flex items-center justify-center hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white transition-all"
            >
              <FiChevronRight className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeaturedCategories;