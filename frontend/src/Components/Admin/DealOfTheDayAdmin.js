import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminUpdateProduct, fetchAllProducts } from "../../services/api";

export default function DealOfTheDayAdmin() {
  const [products, setProducts] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(6);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchAllProducts(currentPage, productsPerPage);
      setProducts(res.data.products);
      setTotalProducts(res.data.totalProducts);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleUpdate = async (productId, discount, endDate) => {
    try {
      if (!discount || !endDate) {
        toast.warn("Please provide both discount and end date");
        return;
      }

      setUpdatingId(productId);
      const formData = new FormData();
      formData.append("discountPercentage", discount);
      formData.append("dealEndsAt", endDate);
      await adminUpdateProduct(formData, productId);
      toast.success("Deal updated successfully!");
      fetchProducts(); // Refresh list
    } catch (err) {
      toast.error("Failed to update deal");
    } finally {
      setUpdatingId(null);
    }
  };
  
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  // Pagination logic
  // Dynamic pagination range (showing 5 pages around the current page)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const pagesToShow = pageNumbers.slice(
    Math.max(0, currentPage - 3), // Show pages before the current page (max of 3 pages)
    Math.min(currentPage + 2, totalPages) // Show pages after the current page (max of 2 pages)
  );


  const currentProducts = products;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Admin - Deal of the Day</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => {
              const defaultDate = product.dealEndsAt
                ? new Date(product.dealEndsAt).toISOString().substring(0, 10)
                : "";

              return (
                <div
                  key={product._id}
                  className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl text-red-600 font-semibold">{product.title}</h3>
                    {product.discountPercentage > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                        🔥 {product.discountPercentage}% off
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-white my-2">{product.description.slice(0, 80)}...</p>

                  <div className="mb-2">
                    <label className="text-sm text-white font-medium block">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={product.discountPercentage}
                      onChange={(e) => (product.newDiscount = e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-sm text-white font-medium block">Deal End Date</label>
                    <input
                      type="date"
                      defaultValue={defaultDate}
                      onChange={(e) => (product.newEndDate = e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                    />
                  </div>

                  <button
                    onClick={() =>
                      handleUpdate(
                        product._id,
                        product.newDiscount || product.discountPercentage,
                        product.newEndDate || product.dealEndsAt
                      )
                    }
                    disabled={updatingId === product._id}
                    className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition ${
                      updatingId === product._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {updatingId === product._id ? "Updating..." : "Update Deal"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {/* Previous Page Button */}
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              >
                Prev
              </button>
            )}

            {/* Page Numbers */}
            {pagesToShow.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-indigo-50`}
              >
                {page}
              </button>
            ))}

            {/* Next Page Button */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
