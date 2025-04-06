import React from 'react';
import { motion } from 'framer-motion';

const RelatedProductsCarousel = () => {
  // This is a placeholder - replace with your actual related products data
  const relatedProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 129.99,
      image: "https://via.placeholder.com/300",
      rating: 4.3
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 89.99,
      image: "https://via.placeholder.com/300",
      rating: 4.1
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 199.99,
      image: "https://via.placeholder.com/300",
      rating: 4.5
    },
    {
      id: 4,
      name: "Portable Charger",
      price: 49.99,
      image: "https://via.placeholder.com/300",
      rating: 4.0
    }
  ];

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {relatedProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ scale: 1.03 }}
            className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
              </div>
              <p className="mt-2 text-lg font-bold">${product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;