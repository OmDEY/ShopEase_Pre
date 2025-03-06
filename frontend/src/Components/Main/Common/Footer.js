import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
                {/* Logo & About Us */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">ShopEase</h3>
                    <p className="text-gray-400 mb-4">We are the best in delivering products that you love. Quality and customer satisfaction are our top priorities.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110"><FaFacebookF /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110"><FaInstagram /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">Contact Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">Shop</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">FAQ</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">Returns</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">Track Order</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-all">Shipping & Delivery</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
                    <p className="text-gray-400 mb-4">Subscribe to our newsletter and get exclusive deals straight to your inbox.</p>
                    <div className="relative flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-l-full border-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            className="bg-blue-600 text-white py-3 px-6 rounded-r-full hover:bg-blue-700 transition-all"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                <p>© 2024 ShopEase. All rights reserved.</p>
                <p className="mt-2">Terms & Conditions | Privacy Policy</p>
            </div>
        </footer>
    );
};

export default Footer;
