import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllProducts, adminUpdateProduct } from "../../services/api";

const WeekendSpecialAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeekendDeals = async () => {
    try {
      setLoading(true);
      const response = await fetchAllProducts();
      setProducts(response?.data?.products);
    } catch (err) {
      setError("Failed to load weekend specials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeekendDeals();
  }, []);

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, [name]: value } : product
      )
    );
  };

  const handleSave = async (id) => {
    try {
      setUpdating(true);
      const updatedProduct = products.find((p) => p._id === id);
      await adminUpdateProduct(updatedProduct, updatedProduct._id);
      setEditing(null);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update product.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        🎉 Weekend Special Admin Panel
      </h1>

      {loading ? (
        <div className="text-center text-purple-500 font-semibold">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded shadow border border-purple-200"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-4"
              />

              {editing === product._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={(e) => handleChange(e, product._id)}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Title"
                  />
                  <input
                    type="number"
                    name="discountPercentage"
                    value={product.discountPercentage}
                    onChange={(e) => handleChange(e, product._id)}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Discount %"
                  />
                  <input
                    type="datetime-local"
                    name="dealEndsAt"
                    value={new Date(product.dealEndsAt).toISOString().slice(0, 16)}
                    onChange={(e) => handleChange(e, product._id)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <button
                    onClick={() => handleSave(product._id)}
                    disabled={updating}
                    className={`w-full py-2 rounded font-semibold ${
                      updating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Discount:{" "}
                    <span className="text-red-600 font-bold">
                      {product.discountPercentage}%
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Deal Ends:{" "}
                    {new Date(product.dealEndsAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="w-full py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
                  >
                    Edit Product
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekendSpecialAdmin;
