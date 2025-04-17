import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import classNames from "classnames";
import { fetchAllProducts } from "../../services/api";

const tabs = [
  { name: "Featured", key: "isFeatured" },
  { name: "Popular", key: "isPopular" },
  { name: "Newly Added", key: "isNewlyAdded" },
];

const AdminDailyBestSalesComponent = () => {
  const [activeTab, setActiveTab] = useState("isFeatured");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;

  const fetchProducts = async () => {
    try {
      const res = await fetchAllProducts(page, limit);
      setProducts(res.data.products);
      setTotalProducts(res.data.totalProducts);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, currentValue) => {
    try {
      await axios.put(`/api/admin/products/${id}/daily-sales`, {
        type: activeTab,
        value: !currentValue,
      });
      fetchProducts(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab, page]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <h1 className="text-3xl font-bold mb-6">🎯 Manage Daily Best Sales</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={classNames(
              "px-4 py-2 rounded-md font-medium transition",
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-blue-100"
            )}
            onClick={() => {
              setActiveTab(tab.key);
              setPage(1);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-1">₹{product.price}</p>
            <p className="text-sm text-gray-500">Rating: ⭐ {product.averageRating}</p>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-700">
                {activeTab.replace("is", "")}:{" "}
                {product.dailySales?.[activeTab] ? "Yes" : "No"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={product.dailySales?.[activeTab]}
                  onChange={() =>
                    toggleStatus(product._id, product.dailySales?.[activeTab])
                  }
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm mt-2">Page {page}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil(totalProducts / limit) ? prev + 1 : prev
            )
          }
          disabled={page >= Math.ceil(totalProducts / limit)}
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDailyBestSalesComponent;