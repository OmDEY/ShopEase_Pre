import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

const bundles = [
  {
    title: "Ultimate Work From Home Bundle",
    products: ["Ergonomic Chair", "Desk Lamp", "Noise Cancelling Headphones"],
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585155775336-4ec0e4d33d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Gamer's Paradise Pack",
    products: ["Gaming Mouse", "Mechanical Keyboard", "RGB Headset"],
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1616627451662-d45d6b3ed7cf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Fitness Starter Kit",
    products: ["Yoga Mat", "Resistance Bands", "Water Bottle"],
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc0fb?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BundleOffersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-12 px-4 sm:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-purple-800 drop-shadow-lg">
        🌟 Exclusive Bundle Offers 🌟
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {bundles.map((bundle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="rounded-2xl shadow-xl overflow-hidden border-0 bg-white"
          >
            <img
              src={bundle.image}
              alt={bundle.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">
                {bundle.title}
              </h2>
              <ul className="text-gray-700 text-sm mb-4 list-disc list-inside">
                {bundle.products.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-bold text-green-600">
                    ₹{bundle.price}
                  </span>{" "}
                  <span className="line-through text-gray-400 ml-2">
                    ₹{bundle.originalPrice}
                  </span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="mr-1" /> {bundle.rating}
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl shadow-md flex items-center justify-center">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
