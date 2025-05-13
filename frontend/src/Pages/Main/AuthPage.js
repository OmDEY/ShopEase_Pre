import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userLogin, userRegister } from '../../services/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleAuth = (e) => {

    e.preventDefault();

    if (!isLogin) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      userRegister({ name, email, password }).then(res => {
        toast.success('Signed Up successfully');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        navigate('/auth/userDetails');
      }).catch(err => {
        console.log(err);
        toast.error(err?.response?.data?.msg);
      })
    }else{

      userLogin(email, password).then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        toast.success('Logged in successfully');
        navigate('/');
      }).catch(err => {
        toast.error(err?.response?.data?.msg);
      })
    }


  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const navigateToAdmin = () => {
    navigate('/auth/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-purple-600">{isLogin ? 'Welcome Back!' : 'Join ShopEase'}</h2>
        <p className="text-center text-gray-600 mb-8">
          {isLogin ? 'Login to continue shopping your favorite items.' : 'Sign up and start your shopping journey with us!'}
        </p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-5"
        >
          {!isLogin && (
            <div>
              <label className="block text-gray-600 font-semibold">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-600 font-semibold">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-600" />
                <label className="text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all"
            onClick={handleAuth}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </motion.form>

        {/* Social Login */}
        {/* <div className="flex items-center justify-center space-x-4 mt-6">
          <p className="text-gray-500">Or continue with</p>
          <FaGoogle className="text-red-600 text-2xl cursor-pointer hover:scale-110 transition-transform" />
          <FaFacebook className="text-blue-600 text-2xl cursor-pointer hover:scale-110 transition-transform" />
          <FaTwitter className="text-blue-400 text-2xl cursor-pointer hover:scale-110 transition-transform" />
        </div> */}

        {/* Toggle Auth Mode */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            {isLogin ? 'New to ShopEase?' : 'Already have an account?'}{' '}
            <span
              onClick={toggleAuthMode}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>

        {/* Admin Login Prompt */}
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Are you an admin?{' '}
            <span
              onClick={navigateToAdmin}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              Admin Login / Sign Up
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
