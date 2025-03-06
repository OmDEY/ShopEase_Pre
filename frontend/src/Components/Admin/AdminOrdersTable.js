import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaEnvelope, FaEye } from 'react-icons/fa';
import AdminOrderModal from './AdminOrderModal';
import AdminOrderDetailsModal from './AdminOrderDetailsModal'; // New modal for viewing details

// Sample order data (you would fetch this from an API in a real project)
const initialOrders = [
  { 
    id: 1, 
    customer: 'John Doe', 
    email: 'john@example.com', 
    date: '2024-09-22', 
    total: 250.75, 
    status: 'Processing', 
    items: [
      { name: 'Product A', quantity: 2, price: 50 },
      { name: 'Product B', quantity: 1, price: 150.75 }
    ]
  },
  { 
    id: 2, 
    customer: 'Jane Smith', 
    email: 'jane@example.com', 
    date: '2024-09-23', 
    total: 500.25, 
    status: 'Shipped', 
    items: [
      { name: 'Product C', quantity: 3, price: 150 },
      { name: 'Product D', quantity: 1, price: 50.25 }
    ]
  }
];

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Function to open modal to edit order status
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to open modal to view order details
  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  // Handle order status update
  const updateOrderStatus = (updatedOrder) => {
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    setIsModalOpen(false);
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
                key={order.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 hover:bg-gray-700 text-white transition duration-300"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg ${order.status === 'Shipped' ? 'bg-blue-600' : order.status === 'Delivered' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                    {order.status}
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
