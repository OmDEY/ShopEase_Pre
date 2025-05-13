import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AboutUs = () => {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    years: 0
  });

  useEffect(() => {
    // Animate stats counting
    const animateStats = () => {
      let customers = 0;
      let products = 0;
      let orders = 0;
      let years = 0;

      const customerInterval = setInterval(() => {
        customers += 50;
        if (customers >= 10000) {
          customers = 10000;
          clearInterval(customerInterval);
        }
        setStats(prev => ({ ...prev, customers }));
      }, 1);

      const productInterval = setInterval(() => {
        products += 10;
        if (products >= 5000) {
          products = 5000;
          clearInterval(productInterval);
        }
        setStats(prev => ({ ...prev, products }));
      }, 1);

      const orderInterval = setInterval(() => {
        orders += 100;
        if (orders >= 25000) {
          orders = 25000;
          clearInterval(orderInterval);
        }
        setStats(prev => ({ ...prev, orders }));
      }, 1);

      const yearInterval = setInterval(() => {
        years += 0.1;
        if (years >= 5) {
          years = 5;
          clearInterval(yearInterval);
        }
        setStats(prev => ({ ...prev, years }));
      }, 20);
    };

    animateStats();
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "OM DEY",
      role: "CEO & Founder",
      // image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
      image: require('../../images/WhatsApp Image 2025-05-13 at 4.07.19 AM.jpeg'),
      bio: "Visionary leader with 10+ years in e-commerce"
    },
    {
      id: 2,
      name: "Sumit",
      role: "Marketing Director",
      // image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
      image: require('../../images/WhatsApp Image 2025-05-11 at 11.27.25 PM.jpeg'),
      bio: "Digital marketing expert and brand strategist"
    },
    {
      id: 3,
      name: "Shruti Pal",
      role: "CTO",
      // image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      image: require('../../images/WhatsApp Image 2025-05-11 at 11.26.58 PM.jpeg'),
      bio: "Tech innovator with passion for seamless user experiences"
    },
    {
      id: 4,
      name: "Aditya",
      role: "Customer Success",
      // image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      image: require('../../images/WhatsApp Image 2025-05-11 at 11.29.33 PM.jpeg'),
      bio: "Dedicated to creating exceptional customer journeys"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto"
          >
            Revolutionizing online shopping with passion, innovation, and customer-first approach
          </motion.p>
        </div>
      </motion.section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to ShopEase</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2019, ShopEase began as a small startup with a big dream: to make online shopping effortless, enjoyable, and accessible to everyone. 
              What started as a passion project has now grown into one of the most trusted e-commerce platforms.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is simple - to connect people with products they love while providing an unmatched shopping experience. 
              We carefully curate our collection to bring you quality items from around the world.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=1000" 
                alt="ShopEase Team" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-bold">Our Team</h3>
                <p>Dedicated to serving you better every day</p>
              </div>
            </div>
            
            <motion.div 
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -left-10 bg-white p-4 rounded-lg shadow-lg hidden md:block"
            >
              <div className="text-blue-600 font-bold text-2xl">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </motion.div>
            
            <motion.div 
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-10 -right-10 bg-white p-4 rounded-lg shadow-lg hidden md:block"
            >
              <div className="text-purple-600 font-bold text-2xl">100%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            ShopEase in Numbers
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">{stats.customers.toLocaleString()}+</div>
              <div className="text-lg">Happy Customers</div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">{stats.products.toLocaleString()}+</div>
              <div className="text-lg">Quality Products</div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">{stats.orders.toLocaleString()}+</div>
              <div className="text-lg">Orders Delivered</div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">{stats.years.toFixed(1)}+</div>
              <div className="text-lg">Years Serving You</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-6 text-gray-800"
        >
          Meet Our Team
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12"
        >
          The passionate people behind ShopEase's success
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-3">
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-6 text-gray-800"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-blue-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries to bring you cutting-edge shopping experiences and features that make your life easier.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-purple-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Transparency</h3>
              <p className="text-gray-600">
                Honest pricing, clear policies, and open communication. We believe in building trust through transparency.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-indigo-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customer Obsession</h3>
              <p className="text-gray-600">
                Every decision we make starts with our customers in mind. Your satisfaction is our ultimate measure of success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Experience ShopEase?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join thousands of happy customers who shop smarter with us every day.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 mr-4">
              Start Shopping
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;