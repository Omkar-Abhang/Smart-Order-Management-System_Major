import React from "react";

const OnlinePayment = ({ totalAmount, onBack, onSuccess }) => {
  const handlePayment = () => {
    // In real-world apps, integrate Razorpay, Stripe, etc.
    alert("Will be in service soon!");
    onSuccess();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Online Payment</h2>
      <p className="text-center text-lg mb-6">
        Amount to Pay: <span className="font-semibold">${totalAmount}</span>
      </p>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 font-semibold"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default OnlinePayment;
