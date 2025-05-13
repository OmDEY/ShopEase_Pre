import React, { useState, useEffect } from "react";
import { fetchDailyBestSalesProducts, addToCart } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DailyBestSales = () => {
  const [productData, setProductData] = useState({});
  const [activeCategory, setActiveCategory] = useState("featured");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchDailyBestSalesProducts();
        setProductData(res);
      } catch (err) {
        console.error("Failed to load Daily Best Sales:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="container mx-auto my-12 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Daily Best Sales</h2>
        <div className="mx-2 flex space-x-8">
          {Object.keys(productData).map((category) => (
            <span
              key={category}
              className={`cursor-pointer text-sm transition-colors duration-300 ${activeCategory === category ? 'text-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 mb-8">
        <div className="relative h-80 col-span-2 lg:col-span-1 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5haqMEtGQExi0vUD8LRywTKS9-DtYnVUU_A&s" alt="banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col justify-center items-start p-6 text-white">
            <h2 className="text-3xl font-bold mb-4">Daily Best Sales</h2>
            <p className="text-base mb-6">Discover our best daily deals and save big on your favorite products!</p>
            <button onClick={() => navigate("/deals-of-the-day")} className="bg-yellow-500 text-white py-2 px-6 rounded-full transition-transform transform hover:scale-110">Shop Now</button>
          </div>
        </div>

        {productData[activeCategory]?.map((product) => (
          <div key={product._id} className="relative bg-white p-4 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <div className="relative">
              <img src={product.images?.[0]} alt={product.title} className="w-full h-32 object-cover rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="flex space-x-2">
                  <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"><i className="fas fa-heart"></i></button>
                  <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"><i className="fas fa-random"></i></button>
                  <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"><i className="fas fa-eye"></i></button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-gray-700 mt-2">${product.price.toFixed(2)}</p>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleAddToCart(product._id)} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">Add to Cart</button>
                {/* <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">Buy Now</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyBestSales;