import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiShield, FiLock, FiDatabase, FiMail } from 'react-icons/fi';

const PrivacyPolicyPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

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
      id: 'intro',
      icon: <FiShield className="text-indigo-600" />,
      title: "Introduction",
      content: (
        <div className="space-y-4">
          <p>
            At ShopEase, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
          </p>
        </div>
      )
    },
    {
      id: 'data-collection',
      icon: <FiDatabase className="text-indigo-600" />,
      title: "Data We Collect",
      content: (
        <div className="space-y-4">
          <p className="font-medium">We may collect information about you in a variety of ways:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Data:</strong> Name, email address, shipping/billing address, payment information, etc.</li>
            <li><strong>Derivative Data:</strong> IP address, browser type, operating system, access times, etc.</li>
            <li><strong>Mobile Device Data:</strong> Device information, mobile device ID, etc.</li>
            <li><strong>Third-Party Data:</strong> Information from third parties like social media platforms.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-use',
      icon: <FiLock className="text-indigo-600" />,
      title: "How We Use Your Data",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To improve our website and services</li>
            <li>To communicate with you about your account or orders</li>
            <li>To send you promotional materials (if you opt-in)</li>
            <li>To prevent fraudulent transactions</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-sharing',
      icon: <FiMail className="text-indigo-600" />,
      title: "Data Sharing & Disclosure",
      content: (
        <div className="space-y-4">
          <p>We may share information we have collected about you in certain situations:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> Third parties who assist in our business operations</li>
            <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Marketing:</strong> With your consent for marketing purposes</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </div>
      )
    },
    {
      id: 'cookies',
      icon: <FiLock className="text-indigo-600" />,
      title: "Cookies & Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
          </p>
          <p className="font-medium">Types of cookies we use:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact</li>
            <li><strong>Functionality Cookies:</strong> Remember your preferences</li>
            <li><strong>Targeting Cookies:</strong> Used for advertising purposes</li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
          </p>
        </div>
      )
    },
    {
      id: 'rights',
      icon: <FiShield className="text-indigo-600" />,
      title: "Your Privacy Rights",
      content: (
        <div className="space-y-4">
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request copies of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Restrict Processing:</strong> Request restriction of processing</li>
            <li><strong>Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Object:</strong> Object to our processing of your data</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information in the "Contact Us" section.
          </p>
        </div>
      )
    },
    {
      id: 'security',
      icon: <FiLock className="text-indigo-600" />,
      title: "Data Security",
      content: (
        <div className="space-y-4">
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, no internet transmission or electronic storage is ever completely secure.
          </p>
          <p>
            We use SSL encryption for all sensitive data transmitted to and from our website. Payment transactions are processed through PCI-compliant payment processors.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      icon: <FiShield className="text-indigo-600" />,
      title: "Policy Changes",
      content: (
        <div className="space-y-4">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      icon: <FiMail className="text-indigo-600" />,
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email:</strong> privacy@shopease.com</li>
            <li><strong>Phone:</strong> +1 (800) 555-9876</li>
            <li><strong>Mail:</strong> Privacy Officer, ShopEase Inc., 123 Privacy Lane, Tech City, TC 10001</li>
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
            Privacy <span className="text-indigo-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us at ShopEase
          </p>
        </motion.div>

        {/* Policy Content */}
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

        {/* Footer Note */}
        <motion.div
          className="mt-12 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            By using our website, you consent to our Privacy Policy and agree to its terms.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} ShopEase Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;