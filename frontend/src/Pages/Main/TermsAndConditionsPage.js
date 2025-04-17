import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiFileText, FiShoppingBag, FiCreditCard, FiUser, FiAlertCircle } from 'react-icons/fi';

const TermsAndConditionsPage = () => {
  const [expandedSection, setExpandedSection] = useState('introduction');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
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

  const accordionVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const sections = [
    {
      id: 'introduction',
      icon: <FiFileText className="text-indigo-600" />,
      title: "Introduction",
      content: (
        <div className="space-y-4">
          <p>
            Welcome to ShopEase! These Terms and Conditions govern your use of our website and services. By accessing or using ShopEase, you agree to be bound by these terms.
          </p>
          <p>
            These terms apply to all visitors, users, and others who wish to access or use our services. If you disagree with any part of these terms, please do not use our services.
          </p>
        </div>
      )
    },
    {
      id: 'accounts',
      icon: <FiUser className="text-indigo-600" />,
      title: "User Accounts",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must provide accurate and complete registration information</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            <li>You are responsible for all activities that occur under your account</li>
          </ul>
        </div>
      )
    },
    {
      id: 'purchases',
      icon: <FiShoppingBag className="text-indigo-600" />,
      title: "Purchases & Payments",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are listed in INR and are subject to change without notice</li>
            <li>We accept various payment methods as displayed at checkout</li>
            <li>You agree to pay all charges incurred by your account</li>
            <li>Sales tax will be added to orders as required by law</li>
            <li>We reserve the right to refuse or limit any order</li>
          </ul>
          <p>
            For payment issues, please contact our customer service team immediately.
          </p>
        </div>
      )
    },
    {
      id: 'shipping',
      icon: <FiShoppingBag className="text-indigo-600" />,
      title: "Shipping & Delivery",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Shipping times are estimates and not guaranteed</li>
            <li>Risk of loss passes to you upon delivery to the carrier</li>
            <li>You are responsible for providing accurate shipping information</li>
            <li>Additional charges may apply for international shipments</li>
            <li>Some items may require signature upon delivery</li>
          </ul>
          <p>
            Please review our Shipping Policy for complete details.
          </p>
        </div>
      )
    },
    {
      id: 'returns',
      icon: <FiAlertCircle className="text-indigo-600" />,
      title: "Returns & Refunds",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Returns must be initiated within 30 days of delivery</li>
            <li>Items must be unused, in original packaging with tags attached</li>
            <li>Refunds will be issued to the original payment method</li>
            <li>Shipping costs are non-refundable</li>
            <li>Some items are final sale and not eligible for return</li>
          </ul>
          <p>
            Please see our Return Policy for complete instructions.
          </p>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      icon: <FiFileText className="text-indigo-600" />,
      title: "Intellectual Property",
      content: (
        <div className="space-y-4">
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of ShopEase or its content suppliers and protected by copyright laws.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may not reproduce, distribute, or create derivative works without permission</li>
            <li>ShopEase trademarks may not be used without written consent</li>
            <li>User-generated content grants us a license to use the content</li>
          </ul>
        </div>
      )
    },
    {
      id: 'prohibited-uses',
      icon: <FiAlertCircle className="text-indigo-600" />,
      title: "Prohibited Uses",
      content: (
        <div className="space-y-4">
          <p>You may not use our website or services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To harass, abuse, or harm others</li>
            <li>To submit false or misleading information</li>
            <li>To upload viruses or malicious code</li>
            <li>To collect personal information of others</li>
            <li>To interfere with security features of the site</li>
            <li>For any obscene or immoral purpose</li>
          </ul>
        </div>
      )
    },
    {
      id: 'limitation-liability',
      icon: <FiAlertCircle className="text-indigo-600" />,
      title: "Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p>
            ShopEase shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use or inability to use the service</li>
            <li>Unauthorized access to your transmissions or data</li>
            <li>Any third party conduct on the service</li>
            <li>Any errors or omissions in content</li>
            <li>Any interruption or cessation of service</li>
          </ul>
          <p>
            Our maximum liability shall not exceed the amount you paid for the product or service.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      icon: <FiFileText className="text-indigo-600" />,
      title: "Changes to Terms",
      content: (
        <div className="space-y-4">
          <p>
            We reserve the right to modify these terms at any time. We will notify you of significant changes by posting the new terms on this page and updating the "Last Updated" date.
          </p>
          <p>
            Your continued use of our services after changes constitutes acceptance of the new terms. We encourage you to periodically review these terms.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      icon: <FiUser className="text-indigo-600" />,
      title: "Contact Information",
      content: (
        <div className="space-y-4">
          <p>
            For questions about these Terms and Conditions, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email:</strong> legal@shopease.com</li>
            <li><strong>Phone:</strong> +1 (800) 555-6789</li>
            <li><strong>Mail:</strong> Legal Department, ShopEase Inc., 123 Commerce Street, Tech City, TC 10001</li>
          </ul>
          <p>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-indigo-600">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using ShopEase
          </p>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-6 text-left focus:outline-none ${expandedSection === section.id ? 'bg-gray-50' : ''}`}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedSection === section.id ? 180 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={accordionVariants}
                    className="px-6 pb-6"
                  >
                    <div className="prose prose-indigo max-w-none text-gray-600">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          className="mt-12 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} ShopEase Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;