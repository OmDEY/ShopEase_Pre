import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaPlus, FaTrash, FaSyncAlt } from 'react-icons/fa';
import UserModal from './UserModal';
import axios from 'axios';
import { fetchAllUsers } from '../../services/api';

// Sample data (In practice, fetch from API)
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', phone: '0987654321' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', phone: '1122334455' }
];

const UsersTable = () => {
  const [users, setUsers] = useState(initialUsers); // For user data
  const [isModalOpen, setIsModalOpen] = useState(false); // To open/close modal
  const [editingUser, setEditingUser] = useState(null); // Currently editing user

  // Open modal to add/edit user
  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchUsers();
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      fetchAllUsers()
        .then(response => {
          setUsers(response.data.users);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle form submit from modal
  const handleFormSubmit = (user) => {
    if (editingUser) {
      // Update existing user
      setUsers(users?.map((u) => (u.id === editingUser.id ? user : u)));
    } else {
      // Add new user
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-3xl font-bold">Users Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => openModal()}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add User</span>
          </button>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <FaSyncAlt />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* User Table */}
      <motion.div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 uppercase text-sm bg-gray-700">
              {/* <th className="px-6 py-3">Image</th> */}
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <motion.tr
                key={user.id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-900 hover:bg-gray-700 text-white transition duration-300"
              >
                {/* <td className="px-6 py-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-400"
                  />
                </td> */}
                <td className="px-6 py-4">{user.firstName + ' ' + user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded">
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modal for Adding/Editing User */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          user={editingUser}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default UsersTable;
