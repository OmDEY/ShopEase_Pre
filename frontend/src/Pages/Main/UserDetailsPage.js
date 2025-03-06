import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { captureUserData } from '../../services/api';

const UserDetailsPage = () => {
  const [formData, setFormData] = useState({
    // firstName: '',
    // lastName: '',
    // email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call here to save the user details to the backend.

    const userId = localStorage.getItem('userId');

    const userData = {
      userId,
      phoneNumber: formData.phoneNumber,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    };

    captureUserData(userData)
      .then((response) => {
        console.log(response.data);

        if (response.status === 201) {
          toast.success(response?.data?.msg);
        }

      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to Submit User Details');
      });
  };

  const handleSkip = () => {
    // Logic for skipping the step, e.g., redirecting to the home page
    console.log('Skipped User Details');
  };

  return (
    <div className="py-4 min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-purple-600">Enter Your Details</h2>
        <p className="text-center text-gray-600 mb-8">
          Please fill in your details to complete the registration process.
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          {/* Left Column */}
          {/* <div>
            <label className="block text-gray-600 font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your first name"
              required
            />
          </div> */}

          {/* <div>
            <label className="block text-gray-600 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your last name"
              required
            />
          </div> */}

          {/* <div>
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email address"
              required
            />
          </div> */}

          <div>
            <label className="block text-gray-600 font-semibold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter address line 1"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter address line 2 (optional)"
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-gray-600 font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your state"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your postal code"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your country"
            />
          </div>

          <div className="flex justify-between items-center mt-6 md:col-span-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-5 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all"
              type="submit"
              onAbort={handleSubmit}
            >
              Submit
            </motion.button>

            <button
              onClick={handleSkip}
              className="py-3 px-5 bg-gray-300 text-gray-600 font-semibold rounded-lg shadow-lg hover:bg-gray-400 transition-all"
            >
              Skip
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default UserDetailsPage;
