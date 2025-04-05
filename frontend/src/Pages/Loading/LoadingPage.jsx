import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiCode, FiServer  } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa'; // 👈 from Font Awesome

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center z-50">
      {/* Animated Astronaut Character */}
      <div className="relative mb-8 w-48 h-48">
        {/* Astronaut Helmet */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Helmet Glass */}
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-blue-100 bg-opacity-20 border-2 border-blue-300 border-opacity-30 overflow-hidden">
            {/* Eyes */}
            <div className="flex justify-center space-x-4 mt-6">
              <motion.div 
                className="w-6 h-6 bg-black rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div 
                className="w-6 h-6 bg-black rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </div>
            
            {/* Mouth */}
            <motion.div
              className="mx-auto mt-4 w-12 h-2 bg-black rounded-full"
              animate={{
                width: [12, 16, 12],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
        
        {/* Astronaut Body */}
        <motion.div
          className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-white rounded-t-lg"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          {/* Arms */}
          <motion.div
            className="absolute -left-6 top-4 w-6 h-16 bg-white rounded-l-full origin-right"
            animate={{
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute -right-6 top-4 w-6 h-16 bg-white rounded-r-full origin-left"
            animate={{
              rotate: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          
          {/* Oxygen Tank */}
          <div className="absolute -right-8 top-8 w-8 h-16 bg-gray-300 rounded-lg" />
        </motion.div>
        
        {/* Legs */}
        <motion.div
          className="absolute top-52 left-1/2 transform -translate-x-1/2 flex space-x-1"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <div className="w-10 h-16 bg-white rounded-b-lg" />
          <div className="w-10 h-16 bg-white rounded-b-lg" />
        </motion.div>
        
        {/* Floating Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random(),
            }}
          />
        ))}
      </div>
      
      {/* Loading Text */}
      <motion.h1 
        className="text-3xl font-bold text-white mb-4"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        Preparing Your Experience
      </motion.h1>
      
      {/* Animated Progress Dots */}
      <div className="flex space-x-2 mb-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              y: [0, -5, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      
      {/* Loading Activities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md">
        <motion.div
          className="flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FiCoffee className="text-white text-2xl mb-2" />
          <span className="text-white text-sm">Brewing coffee</span>
        </motion.div>
        <motion.div
          className="flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FiCode className="text-white text-2xl mb-2" />
          <span className="text-white text-sm">Writing code</span>
        </motion.div>
        <motion.div
          className="flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FiServer className="text-white text-2xl mb-2" />
          <span className="text-white text-sm">Starting servers</span>
        </motion.div>
        <motion.div
          className="flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FaRocket className="text-white text-2xl mb-2" />
          <span className="text-white text-sm">Launching app</span>
        </motion.div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-white bg-opacity-20 rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;