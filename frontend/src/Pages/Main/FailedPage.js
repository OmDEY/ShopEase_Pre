import React from 'react';
import { XCircle } from 'lucide-react';

const PaymentFailed = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-red-50 px-4">
      <div className="bg-white border border-red-300 text-red-700 shadow-xl rounded-xl p-8 max-w-md w-full animate-scaleIn">
        <div className="flex justify-center mb-4">
          <XCircle size={60} className="text-red-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Payment Failed</h1>
        <p className="text-center text-red-600 mb-6">Something went wrong. Please try again or use a different payment method.</p>
        <div className="flex justify-center">
          <a href="/" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200">
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;