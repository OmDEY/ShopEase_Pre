import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OrderTrackingModal from "../../Components/Main/OrderTrackingModal";
import {
  FaSearch,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  BsArrowRepeat,
  BsBoxArrowInUpRight,
  BsClockHistory,
} from "react-icons/bs";
import {
  MdCancel,
  MdOutlineRateReview,
  MdOutlineContactSupport,
  MdAttachFile,
} from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { fetchOrders } from "../../services/api";

const ReturnModal = ({ isOpen, onClose, order, item, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      return;
    }
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        orderId: order._id,
        itemId: item.product._id,
        reason,
        additionalInfo,
        image,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting return:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Request Return</h3>
          <p className="text-gray-600 mb-4">
            You're requesting a return for: <strong>{item.product.title}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Reason for return</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="">Select a reason</option>
                <option value="Damaged Product">Damaged Product</option>
                <option value="Wrong Item">Wrong Item</option>
                <option value="Not as Described">Not as Described</option>
                <option value="No Longer Needed">No Longer Needed</option>
                <option value="Quality Issues">Quality Issues</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Additional information
              </label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Please provide more details about your return..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Upload image (optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {preview ? (
                  <div className="mb-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 mx-auto mb-2"
                    />
                    <button
                      type="button"
                      className="text-sm text-red-500 hover:text-red-700"
                      onClick={() => setImage(null)}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <MdAttachFile className="text-3xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG up to 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                disabled={isSubmitting || !reason}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <RiRefund2Line /> Submit Return Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Past 6 Months");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [itemRatings, setItemRatings] = useState({});
  const [itemReviews, setItemReviews] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedReturnItem, setSelectedReturnItem] = useState(null);
  const [selectedReturnOrder, setSelectedReturnOrder] = useState(null);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await fetchOrders();
        setOrdersData(response.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrdersData();
  }, []);

  const handleOrderTracking = (order) => {
    setExpandedOrder(order._id);
    setShowModal(true);
  };

  const filteredOrders = ordersData.filter((order) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      order.items.some(
        (item) =>
          item.product?.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order._id.toString().includes(searchTerm)
      );

    // Tab filter
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Delivered" && order.orderStatus === "Delivered") ||
      (activeTab === "Cancelled" && order.orderStatus === "Cancelled") ||
      (activeTab === "Processing" && order.orderStatus === "Processing") ||
      (activeTab === "Shipped" && order.orderStatus === "Shipped");

    // Time filter (simplified for demo)
    const matchesTime = true; // Implement actual time filtering based on order.createdAt

    return matchesSearch && matchesTab && matchesTime;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRateItem = (orderId, itemIndex, rating) => {
    setItemRatings((prev) => ({
      ...prev,
      [`${orderId}-${itemIndex}`]: rating,
    }));
  };

  const handleReviewChange = (orderId, itemIndex, review) => {
    setItemReviews((prev) => ({
      ...prev,
      [`${orderId}-${itemIndex}`]: review,
    }));
  };

  const submitReview = (orderId, itemIndex) => {
    console.log(`Review submitted for order ${orderId}, item ${itemIndex}:`, {
      rating: itemRatings[`${orderId}-${itemIndex}`],
      review: itemReviews[`${orderId}-${itemIndex}`],
    });
    alert("Review submitted successfully!");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setExpandedOrder(null);
  };

  const handleReturnItem = (order, item) => {
    setSelectedReturnOrder(order);
    setSelectedReturnItem(item);
    setReturnModalOpen(true);
  };

  const handleReturnSubmit = async (returnData) => {
    // In a real app, you would call your API here
    console.log("Return request submitted:", returnData);
    alert(
      `Return request submitted for ${selectedReturnItem.product.title}. Our team will contact you shortly.`
    );
    // Reset the form
    setReturnModalOpen(false);
    setSelectedReturnItem(null);
    setSelectedReturnOrder(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-green-500 text-xl mr-2" />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500 text-xl mr-2" />;
      case "Processing":
        return <BsClockHistory className="text-yellow-500 text-xl mr-2" />;
      case "Shipped":
        return <FaTruck className="text-blue-500 text-xl mr-2" />;
      default:
        return <FaBoxOpen className="text-gray-500 text-xl mr-2" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isReturnEligible = (orderDate) => {
    // Items can be returned within 30 days of delivery
    const returnWindow = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const deliveryDate = new Date(orderDate);
    const today = new Date();
    return today - deliveryDate < returnWindow;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600">
            View and manage all your recent purchases
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {["All", "Delivered", "Processing", "Shipped", "Cancelled"].map(
            (tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // Reset to first page when changing tabs
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            )
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search orders or items..."
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-gray-600 whitespace-nowrap">
              Time period:
            </span>
            <select
              className="bg-white text-gray-700 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="Past 3 Months">Past 3 Months</option>
              <option value="Past 6 Months">Past 6 Months</option>
              <option value="Past 12 Months">Past 12 Months</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any orders matching your criteria
            </p>
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              onClick={() => {
                setActiveTab("All");
                setSearchTerm("");
              }}
            >
              View All Orders
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentOrders.map((order) => (
                <motion.div
                  key={order._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Order Header */}
                  <div
                    className={`p-4 md:p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer ${getStatusColor(
                      order.orderStatus
                    )}`}
                    onClick={() => {
                      setExpandedOrder(
                        expandedOrder === order._id ? null : order._id
                      );
                    }}
                  >
                    <div className="flex items-center">
                      {getStatusIcon(order.orderStatus)}
                      <div>
                        <h3 className="font-bold">Order #{order._id}</h3>
                        <p className="text-sm">
                          Placed on{" "}
                          {new Date(order.createdAt).toLocaleString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end">
                      <p className="font-bold text-lg">₹{order.totalAmount}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderTracking(order);
                          }}
                          className="text-xs text-indigo-600 hover:underline flex items-center"
                        >
                          Track <BsBoxArrowInUpRight className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order._id && (
                    <motion.div
                      className="p-4 md:p-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Order Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Shipping Address
                          </h4>
                          <p className="text-gray-600">
                            {order.shippingAddress?.name}
                          </p>
                          <p className="text-gray-600">
                            {order.shippingAddress?.address},{" "}
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.state},{" "}
                            {order.shippingAddress?.pincode}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Payment Method
                          </h4>
                          <p className="text-gray-600">{order.paymentMethod}</p>
                          {order.orderStatus === "Delivered" && (
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 text-indigo-600 text-sm hover:underline flex items-center"
                            >
                              View invoice{" "}
                              <BsBoxArrowInUpRight className="ml-1" />
                            </a>
                          )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Delivery Info
                          </h4>
                          {order.orderStatus === "Delivered" ? (
                            <p className="text-gray-600">
                              Delivered on{" "}
                              {new Date(order.updatedAt).toLocaleDateString()}
                            </p>
                          ) : order.orderStatus === "Shipped" ? (
                            <p className="text-gray-600">
                              Estimated delivery:{" "}
                              {new Date(
                                new Date(order.updatedAt).getTime() +
                                  5 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString()}
                            </p>
                          ) : order.orderStatus === "Processing" ? (
                            <p className="text-gray-600">
                              Preparing for shipment
                            </p>
                          ) : (
                            <p className="text-gray-600">
                              Order {order.orderStatus?.toLowerCase()}
                            </p>
                          )}
                          {order.trackingNumber && (
                            <p className="text-gray-600">
                              Tracking #: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-4 text-gray-700 border-b pb-2">
                          Order Items
                        </h4>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col md:flex-row gap-4 p-4 border-b last:border-none hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <img
                              src={
                                item.product?.images?.[0] ||
                                "https://via.placeholder.com/150"
                              }
                              alt={item.product?.title}
                              className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                            />

                            <div className="flex-1">
                              <h5 className="font-semibold">
                                {item.product?.title || "Product"}
                              </h5>
                              <p className="text-gray-600 text-sm mb-2">
                                {item.product?.description ||
                                  "No description available"}
                              </p>
                              <p className="text-gray-700">
                                ₹{parseFloat(item.price).toFixed(2)} ×{" "}
                                {item.quantity}
                              </p>
                            </div>

                            <div className="flex flex-col items-end">
                              <p className="font-semibold text-lg mb-2">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>

                              {order.orderStatus === "Delivered" && (
                                <div className="flex flex-col gap-2 w-full md:w-64">
                                  {!itemRatings[`${order._id}-${idx}`] ? (
                                    <>
                                      <div className="flex justify-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <button
                                            key={star}
                                            onClick={() =>
                                              handleRateItem(
                                                order._id,
                                                idx,
                                                star
                                              )
                                            }
                                            className="text-yellow-400 hover:text-yellow-500"
                                          >
                                            <FaRegStar className="text-xl" />
                                          </button>
                                        ))}
                                      </div>
                                      <button
                                        className="text-sm text-indigo-600 hover:underline flex items-center justify-center"
                                        onClick={() =>
                                          setItemReviews((prev) => ({
                                            ...prev,
                                            [`${order._id}-${idx}`]: "",
                                          }))
                                        }
                                      >
                                        Write a review{" "}
                                        <MdOutlineRateReview className="ml-1" />
                                      </button>
                                    </>
                                  ) : (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) =>
                                            i <
                                            itemRatings[`${order._id}-${idx}`] ? (
                                              <FaStar
                                                key={i}
                                                className="text-yellow-400"
                                              />
                                            ) : (
                                              <FaRegStar
                                                key={i}
                                                className="text-yellow-400"
                                              />
                                            )
                                          )}
                                        </div>
                                        <button
                                          className="text-xs text-gray-500 hover:text-gray-700"
                                          onClick={() =>
                                            handleRateItem(order._id, idx, 0)
                                          }
                                        >
                                          Change
                                        </button>
                                      </div>

                                      {itemReviews[`${order._id}-${idx}`] !==
                                        undefined && (
                                        <div className="mt-2">
                                          <textarea
                                            value={
                                              itemReviews[`${order._id}-${idx}`] ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleReviewChange(
                                                order._id,
                                                idx,
                                                e.target.value
                                              )
                                            }
                                            placeholder="Share your experience with this product..."
                                            className="w-full p-2 border rounded text-sm mb-2"
                                            rows="3"
                                          />
                                          <div className="flex justify-end gap-2">
                                            <button
                                              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                              onClick={() => {
                                                handleRateItem(order._id, idx, 0);
                                                handleReviewChange(
                                                  order._id,
                                                  idx,
                                                  ""
                                                );
                                              }}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                              onClick={() =>
                                                submitReview(order._id, idx)
                                              }
                                            >
                                              Submit
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap gap-3 justify-end">
                        {order.orderStatus === "Delivered" && (
                          <>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md">
                              <BsArrowRepeat /> Buy Again
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md">
                              <MdOutlineRateReview /> Write Review
                            </button>
                            {isReturnEligible(order.updatedAt) && (
                              <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 shadow-md"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReturnItem(order, order.items[0]); // For simplicity, using first item
                                }}
                              >
                                <RiRefund2Line /> Return Item
                              </button>
                            )}
                          </>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderTracking(order);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                          >
                            <FaTruck /> Track Package
                          </button>
                        )}
                        {order.orderStatus === "Processing" && (
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md">
                            <MdCancel /> Cancel Order
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 shadow-md">
                          <MdOutlineContactSupport /> Get Help
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {filteredOrders.length > ordersPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === i + 1
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}

        <OrderTrackingModal
          isOpen={showModal}
          onClose={handleCloseModal}
          order={ordersData.find((order) => order._id === expandedOrder)}
        />

        <ReturnModal
          isOpen={returnModalOpen}
          onClose={() => setReturnModalOpen(false)}
          order={selectedReturnOrder}
          item={selectedReturnItem}
          onSubmit={handleReturnSubmit}
        />
      </div>
    </div>
  );
};

export default OrdersPage;