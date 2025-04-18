import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAllProducts, adminAddFeaturedProduct } from "../../services/api";

const AdminFeaturedPage = () => {
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

  const toggleFeatured = async (id, currentStatus) => {
    try {
      await adminAddFeaturedProduct(id, { isFeatured: !currentStatus });
      fetchProducts(); // Refresh
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
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Featured Products</h1>

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

            <button
              onClick={() => toggleFeatured(product._id, product.isFeatured)}
              className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                product.isFeatured
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {product.isFeatured ? "Remove from Featured" : "Mark as Featured"}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminFeaturedPage;