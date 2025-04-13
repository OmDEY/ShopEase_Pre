import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllProducts, applyClearanceSaleDiscount } from "../../services/api";

const ITEMS_PER_PAGE = 12; // Adjust the number of items per page

const ClearanceSaleAdmin = () => {
  const [clearanceProducts, setClearanceProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch clearance products when the component mounts or page changes
  useEffect(() => {
    setLoading(true);
    fetchAllProducts(currentPage, ITEMS_PER_PAGE)  // Pass the page number and limit to API
      .then((response) => {
        setClearanceProducts(response.data.products);
        setTotalPages(response.data.totalPages);  // Set total pages from the API response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clearance products:", error);
        setLoading(false);
      });
  }, [currentPage]);

  // Handle updating the clearance level
  // Handle updating the clearance level
const handleClearanceLevelChange = (productId, clearanceLevel) => {
    if (clearanceLevel) {
      callApplyClearanceSaleDiscount(productId, clearanceLevel, undefined) // Pass clearanceLevel and undefined for stock
        .then((response) => {
          toast.success("Clearance level updated!");
          setClearanceProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId
                ? { ...product, clearanceLevel }
                : product
            )
          );
        })
        .catch((error) => {
          toast.error("Failed to update clearance level");
          console.error(error);
        });
    }
  };
  
  // Handle updating the stock
  const handleStockChange = (productId, newStock) => {
    if (newStock !== undefined) {
      callApplyClearanceSaleDiscount(productId, undefined, newStock) // Pass undefined for clearanceLevel and newStock
        .then((response) => {
          toast.success("Stock updated successfully!");
          setClearanceProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId
                ? { ...product, stock: newStock }
                : product
            )
          );
        })
        .catch((error) => {
          toast.error("Failed to update stock");
          console.error(error);
        });
    }
  };
  
  const callApplyClearanceSaleDiscount = async (id, clearanceLevel, stock) => {
    // Send only the data that is provided (clearanceLevel or stock)
    const data = {};
    if (clearanceLevel) data.clearanceLevel = clearanceLevel;
    if (stock !== undefined) data.stock = stock;
  
    const response = await applyClearanceSaleDiscount(id, clearanceLevel, stock);
    return response.data;
  };
  
  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Clearance Sale Management</h1>
      
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clearanceProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-500">{product.description}</p>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">Clearance Level</label>
                  <select
                    value={product.clearanceLevel}
                    onChange={(e) =>
                      handleClearanceLevelChange(product._id, e.target.value)
                    }
                    className="w-full p-2 border rounded-md mt-2"
                  >
                    <option value="limited">Limited</option>
                    <option value="last-chance">Last Chance</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">Stock</label>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                      handleStockChange(product._id, e.target.value)
                    }
                    className="w-full p-2 border rounded-md mt-2"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-lg">
                    Price: ${product.price} <span className="line-through text-gray-500">${product.originalPrice}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded-md mr-2 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded-md ml-2"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClearanceSaleAdmin;