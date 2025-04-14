import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const socialLinks = [
    { icon: <FaFacebook className="text-blue-600" />, name: "Facebook" },
    { icon: <FaTwitter className="text-blue-400" />, name: "Twitter" },
    { icon: <FaInstagram className="text-pink-600" />, name: "Instagram" },
    { icon: <FaLinkedin className="text-blue-700" />, name: "LinkedIn" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Contact <span className="text-indigo-600">ShopEase</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for inquiries, support, or just to say hello.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <FiMail className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">For general inquiries</p>
                  <a 
                    href="mailto:contact@shopease.com" 
                    className="text-indigo-600 hover:underline mt-2 block"
                  >
                    contact@shopease.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FiPhone className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">24/7 customer support</p>
                  <a 
                    href="tel:+18005551234" 
                    className="text-indigo-600 hover:underline mt-2 block"
                  >
                    +1 (800) 555-1234
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <FiMapPin className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600">Our headquarters</p>
                  <address className="text-gray-600 not-italic mt-2">
                    123 E-Commerce Plaza<br />
                    Tech City, TC 10001<br />
                    United States
                  </address>
                </div>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="p-6 sm:p-8">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`pb-3 px-4 font-medium ${activeTab === 'form' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('form')}
                >
                  Contact Form
                </button>
                <button
                  className={`pb-3 px-4 font-medium ${activeTab === 'faq' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('faq')}
                >
                  FAQ
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'form' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <FiCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                          Thank You!
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Your message has been sent successfully. We'll get back to you soon.
                        </p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                              placeholder="your@email.com"
                            />
                          </div>

                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              Subject
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                              placeholder="How can we help?"
                            />
                          </div>

                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows="5"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                              placeholder="Your message here..."
                            ></textarea>
                          </div>

                          <motion.button
                            type="submit"
                            className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                <FiSend className="mr-2" />
                                Send Message
                              </>
                            )}
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        How long does delivery take?
                      </h4>
                      <p className="text-gray-600">
                        Standard delivery takes 3-5 business days. Express delivery options are available at checkout.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        What is your return policy?
                      </h4>
                      <p className="text-gray-600">
                        We offer a 30-day return policy for most items. Items must be unused and in original packaging.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        How can I track my order?
                      </h4>
                      <p className="text-gray-600">
                        You'll receive a tracking number via email once your order ships. You can also check your order status in your account.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Do you ship internationally?
                      </h4>
                      <p className="text-gray-600">
                        Yes! We ship to over 100 countries. International shipping rates and delivery times vary by destination.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;