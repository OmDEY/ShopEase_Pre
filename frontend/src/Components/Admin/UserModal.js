import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [role, setRole] = useState(user?.role || 'Customer');
  const [image, setImage] = useState(user?.image || 'https://via.placeholder.com/150');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: user?.id, name, email, phone, role, image });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white rounded-lg shadow-2xl p-8 max-w-4xl w-full grid grid-cols-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {/* Left Section - User Image */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-l-lg">
          <div className="relative">
            <img
              src={image}
              alt="User"
              className="w-40 h-40 object-cover rounded-full shadow-lg"
            />
            <label htmlFor="imageUpload" className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition">
              <FaCamera className="text-white" />
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <h3 className="mt-4 text-xl font-bold">{user ? 'Update Image' : 'Upload Image'}</h3>
        </div>

        {/* Right Section - User Details Form */}
        <div className="bg-gray-800 p-6 rounded-r-lg">
          <h2 className="text-3xl mb-6 font-bold">
            {user ? 'Edit User' : 'Add New User'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Left side of the form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right side of the form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Role</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            </div>

            {/* Action buttons */}
            <div className="col-span-2 flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
              >
                {user ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserModal;
