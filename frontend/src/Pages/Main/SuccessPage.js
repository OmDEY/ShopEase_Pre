import React from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  return (
    <div className="relative flex items-center justify-center h-[80vh] bg-gradient-to-br from-green-100 to-white px-4">
      {/* 🎉 Confetti Animation */}
      <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />

      {/* Card UI */}
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg w-full animate-scaleIn">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
        <p className="text-gray-600 mt-2 mb-6">
          Thank you for your order. Your payment was processed successfully.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
