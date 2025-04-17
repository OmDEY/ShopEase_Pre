import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fetchAllProducts } from "../../services/api";

const AdminPopularPage = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchProducts = async () => {
    try {
      const res = await fetchAllProducts(page, limit);
      setProducts(res.data.products);
      setTotalProducts(res.data.totalProducts);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePopular = async (id, currentStatus) => {
    try {
      await axios.patch(`/api/products/${id}/popular`, {
        isPopular: !currentStatus,
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Popular Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">Category: {product.categoryName}</p>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <p className="text-gray-600">Rating: ⭐ {product.averageRating}</p>

            {/* Toggle Switch */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Popular: {product.dailySales?.isPopular ? "Yes" : "No"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={product.dailySales?.isPopular}
                  onChange={() =>
                    togglePopular(product._id, product.dailySales?.isPopular)
                  }
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminPopularPage;
