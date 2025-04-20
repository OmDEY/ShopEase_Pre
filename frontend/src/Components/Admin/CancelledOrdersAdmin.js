import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBoxOpen, FaTimesCircle, FaCheck, FaSearch, FaFilter, FaRedo, FaTrash } from 'react-icons/fa';
import { MdCancel, MdOutlineDescription } from 'react-icons/md';
import { toast } from 'react-toastify';
import { fetchCancelledOrders, processRefund, restockCancelledProducts, deleteCancelledOrder } from '../../services/api';

const CancelledOrdersAdmin = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    timePeriod: 'all',
    cancellationType: 'all'
  });

  // Fetch cancelled orders
  useEffect(() => {
    const fetchCancelledOrdersData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCancelledOrders();
        setCancelledOrders(response);
        setFilteredOrders(response);
      } catch (error) {
        toast.error('Failed to fetch cancelled orders');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCancelledOrdersData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = cancelledOrders;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(order => 
        order._id.includes(searchTerm) ||
        order.user.email.includes(searchTerm) ||
        order.items.some(item => 
          item.product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply time filter
    if (filters.timePeriod !== 'all') {
      const now = new Date();
      result = result.filter(order => {
        const orderDate = new Date(order.cancellation.cancelledAt);
        const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
        
        if (filters.timePeriod === 'today') return diffDays === 0;
        if (filters.timePeriod === 'week') return diffDays <= 7;
        if (filters.timePeriod === 'month') return diffDays <= 30;
        return true;
      });
    }

    // Apply cancellation type filter
    if (filters.cancellationType !== 'all') {
      result = result.filter(order => 
        filters.cancellationType === 'user' 
          ? order.cancellation.cancelledBy === 'User'
          : order.cancellation.cancelledBy === 'Admin'
      );
    }

    setFilteredOrders(result);
  }, [searchTerm, filters, cancelledOrders]);

  const handleProcessRefund = async (orderId) => {
    try {
      await processRefund(orderId);
      toast.success('Refund processed successfully');
      setCancelledOrders(prev => 
        prev.map(order => 
          order._id === orderId 
            ? { ...order, paymentStatus: 'Refunded' } 
            : order
        )
      );
    } catch (error) {
      toast.error('Failed to process refund');
      console.error(error);
    }
  };

  const handleRestockItems = async (orderId) => {
    try {
      await restockCancelledProducts(orderId);
      toast.success('Items restocked successfully');
      setCancelledOrders(prev => 
        prev.map(order => 
          order._id === orderId 
            ? { ...order, items: order.items.map(item => ({ ...item, restocked: true })) } 
            : order
        )
      );
    } catch (error) {
      toast.error('Failed to restock items');
      console.error(error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteCancelledOrder(orderId);
      toast.success('Order deleted successfully');
      setCancelledOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      toast.error('Failed to delete order');
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Refunded': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCancellationTypeColor = (type) => {
    return type === 'User' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Cancelled Orders</h1>
            <p className="text-gray-600">Manage all cancelled orders and process refunds</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {filteredOrders.length} orders
            </span>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filters.timePeriod}
                  onChange={(e) => setFilters({...filters, timePeriod: e.target.value})}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>

              <div className="relative flex-1">
                <select
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filters.cancellationType}
                  onChange={(e) => setFilters({...filters, cancellationType: e.target.value})}
                >
                  <option value="all">All Types</option>
                  <option value="user">User Cancelled</option>
                  <option value="admin">Admin Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No cancelled orders found</h3>
            <p className="text-gray-500">There are currently no orders matching your criteria</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-800">Order #{order._id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCancellationTypeColor(order.cancellation.cancelledBy)}`}>
                          {order.cancellation.cancelledBy} Cancelled
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Cancelled on {new Date(order.cancellation.cancelledAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reason: {order.cancellation.cancelReason || 'No reason provided'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{order.totalAmount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedOrder?._id === order._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-gray-700">Customer Info</h4>
                            <p className="text-gray-600">{order.user.name}</p>
                            <p className="text-gray-600">{order.user.email}</p>
                            <p className="text-gray-600">{order.shippingAddress.phone}</p>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-gray-700">Payment Details</h4>
                            <p className="text-gray-600">Method: {order.paymentMethod}</p>
                            <p className="text-gray-600">Status: {order.paymentStatus}</p>
                            {order.paymentStatus === 'Refunded' && (
                              <p className="text-green-600 text-sm mt-1">
                                Refund processed on {new Date().toLocaleDateString()}
                              </p>
                            )}
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-gray-700">Cancellation Details</h4>
                            <p className="text-gray-600">By: {order.cancellation.cancelledBy}</p>
                            <p className="text-gray-600">
                              Date: {new Date(order.cancellation.cancelledAt).toLocaleString()}
                            </p>
                            <p className="text-gray-600">
                              Reason: {order.cancellation.cancelReason || 'Not specified'}
                            </p>
                          </div>
                        </div>

                        <h4 className="font-semibold mb-3 text-gray-700">Order Items</h4>
                        <div className="space-y-3 mb-6">
                          {order.items.map((item) => (
                            <div key={item._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.product.images[0] || 'https://via.placeholder.com/150'}
                                alt={item.product.title}
                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                              />
                              <div className="ml-4 flex-1">
                                <h5 className="font-medium">{item.product.title}</h5>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} × ₹{item.price.toFixed(2)}
                                </p>
                                {item.restocked && (
                                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    Restocked
                                  </span>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap justify-end gap-3">
                          {order.paymentStatus !== 'Refunded' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                              onClick={() => handleProcessRefund(order._id)}
                            >
                              <FaCheck /> Process Refund
                            </motion.button>
                          )}

                          {!order.items.every(item => item.restocked) && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                              onClick={() => handleRestockItems(order._id)}
                            >
                              <FaRedo /> Restock Items
                            </motion.button>
                          )}

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                            onClick={() => handleDeleteOrder(order._id)}
                          >
                            <FaTrash /> Delete Order
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                            onClick={() => setSelectedOrder(null)}
                          >
                            <MdCancel /> Close
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CancelledOrdersAdmin;