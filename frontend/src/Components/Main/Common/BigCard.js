import React from 'react';

const BigCard = () => {
    return (
        <div className="relative w-full max-w-screen-xl mx-auto mt-12">
            {/* Background Image */}
            <div className="relative w-full h-96 overflow-hidden rounded-xl">
                <img
                    src="https://www.shutterstock.com/shutterstock/photos/2303311817/display_1500/stock-vector-subscribe-to-newsletter-banner-template-with-letter-envelope-and-megaphone-email-business-2303311817.jpg"
                    alt="Big Card Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay for content */}
                <div className="absolute inset-0 flex items-center justify-start p-8 bg-gradient-to-r from-black/60 to-transparent">
                    {/* Content */}
                    <div className="text-white max-w-lg space-y-4 rounded-xl p-6">
                        <h2 className="text-4xl font-bold mb-4">Join Our Newsletter</h2>
                        <p className="text-lg mb-6">Stay updated with the latest news and special offers. Subscribe to our newsletter and never miss an update!</p>
                        {/* Email Subscription Form */}
                        <div className="flex items-center space-x-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-3 rounded-l-full w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
                            />
                            <button
                                className="bg-blue-500 text-white py-3 px-6 rounded-r-full hover:bg-blue-600 transition-colors flex-shrink-0"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigCard;
