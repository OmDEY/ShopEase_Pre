import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/ContextProvider';
import { motion } from 'framer-motion';
import { fetchCategories, fetchFeaturedCategoriesProducts } from '../../services/api';

const FeaturedCategories = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState({});
  const [activeCat, setActiveCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cardsPerView = 8;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetchCategories();
        setCategories(catRes);
        if (catRes.length) setActiveCat(catRes?.[0]._id);

        // Fetch products for each category in parallel
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

  if (loading) return <div className="text-center p-8">Loading...</div>;

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
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="container mx-auto my-12 px-4">
      {/* Tabs */}
      <div className="flex space-x-6 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleTab(cat._id)}
            className={`text-sm font-medium whitespace-nowrap pb-2 transition-colors ${
              activeCat === cat._id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>

      {/* Cards Slider */}
      <div className="relative">
        <button
          onClick={slideLeft}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
        >
          &#9664;
        </button>

        <div className="flex space-x-4 overflow-hidden">
          {productsByCat[activeCat]
            ?.slice(startIndex, startIndex + cardsPerView)
            .map((prod) => (
              <motion.div
                key={prod._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer w-40 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleProductClick(prod)}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold truncate">{prod.title}</h3>
                  <p className="text-green-600 font-bold mt-1">${prod.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
        </div>

        <button
          onClick={slideRight}
          disabled={
            startIndex >= (productsByCat[activeCat]?.length || 0) - cardsPerView
          }
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default FeaturedCategories;