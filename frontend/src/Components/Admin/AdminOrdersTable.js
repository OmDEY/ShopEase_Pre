// AdminOrdersTable.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaEnvelope, FaEye } from 'react-icons/fa';
import AdminOrderModal from './AdminOrderModal';
import AdminOrderDetailsModal from './AdminOrderDetailsModal';
import { fetchAllOrders, changeOrderStatus } from '../../services/api';
import { toast } from "react-toastify";

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setOrders(response.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Fetch orders from the backend
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const updateOrderStatus = async (updatedOrder) => {
    changeOrderStatus(updatedOrder._id, updatedOrder.orderStatus)
    .then(() => {
      fetchOrders();
      setIsModalOpen(false);
      toast.success('Order status updated successfully');
    })
    .catch(error => {
      console.error('Error updating order status:', error);
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-6">Orders Management</h1>

      {/* Orders Table */}
      <motion.div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 uppercase text-sm bg-gray-700">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <motion.tr
                key={order._id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 hover:bg-gray-700 text-white transition duration-300"
              >
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">{order.user.name}</td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">₹{order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg ${order.orderStatus === 'Shipped' ? 'bg-blue-600' : order.orderStatus === 'Delivered' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => openModal(order)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded"
                  >
                    <FaEnvelope />
                  </button>
                  <button
                    className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded"
                    onClick={() => openDetailsModal(order)}
                  >
                    <FaEye />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modal for editing order status */}
      {isModalOpen && (
        <AdminOrderModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
          onUpdate={updateOrderStatus}
        />
      )}

      {/* Modal for viewing order details */}
      {isDetailsOpen && (
        <AdminOrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminOrdersTable;
