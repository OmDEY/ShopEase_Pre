import React, { useEffect, useState } from 'react';
import { fetchPopularProducts,addToCart, removeFromWishlist, addToWishlist } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PopularProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularProductsData = async () => {
      try {
        const res = await fetchPopularProducts(); // adjust baseURL if needed
        setProducts(res);
        setFilteredProducts(res);

        const uniqueCategories = [
          'All',
          ...new Set(res.map(p => p.category?.name)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to fetch popular products:', err);
      }
    };

    fetchPopularProductsData();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      let userId = localStorage.getItem("userId");
      await addToCart(productId, 1);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const toggleWishlistItem = async (productId) => {
    try {
      if (isInWishlist) {
        let userId = localStorage.getItem("userId");
        await removeFromWishlist(userId, productId);
        setIsInWishlist(false);
        toast.info("Removed from wishlist");
      } else {
        // Add to wishlist
        let userId = localStorage.getItem("userId");
        await addToWishlist(userId, productId);
        setIsInWishlist(true);
        toast.success("Added to wishlist");
      }

      setIsInWishlist(!isInWishlist);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFilteredProducts(
      category === 'All'
        ? products
        : products.filter(p => (p.category?.name || null) === category)
    );
  };

  return (
    <div className="container mx-auto my-12 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-left text-3xl mr-12 font-semibold">Popular Products</h2>
        <div className="mr-2 flex mt-3 space-x-8">
          {categories.map(category => (
            <span
              key={category}
              className={`cursor-pointer text-sm transition-colors duration-300 ${
                activeCategory === category
                  ? 'text-blue-500 font-semibold'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
        {filteredProducts.map((product) => (
          <div key={product._id} className="relative bg-white p-4 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <div className="relative">
              <img src={product.images?.[0]} alt={product.title} className="w-full h-32 object-cover rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="flex space-x-2">
                  <button onClick={() => toggleWishlistItem(product._id)} className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                    <i className="fas fa-heart"></i>
                  </button>
                  {/* <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                    <i className="fas fa-random"></i>
                  </button> */}
                  <button onClick={() => navigate(`/product?productId=${product._id}`)} className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">{product.category?.name || 'Unknown'}</p>
              <h3 className="text-lg font-bold mt-1">{product.title}</h3>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  {'★'.repeat(Math.round(product.averageRating || 0))}
                  {'☆'.repeat(5 - Math.round(product.averageRating || 0))}
                </span>
                <span className="ml-2 text-gray-500">({product.averageRating || 0})</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{product.brand}</p>
              <p className="text-lg font-semibold mt-2">${product.price}</p>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleAddToCart(product._id)} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
                  Add to Cart
                </button>
                {/* <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProduct;