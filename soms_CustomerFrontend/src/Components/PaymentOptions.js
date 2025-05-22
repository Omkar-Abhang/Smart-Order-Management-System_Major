import React, { useState } from "react";

const PaymentOptions = ({ totalAmount, onBack, onConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleConfirm = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }
    onConfirm(selectedMethod);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">Choose Payment Method</h2>
      <p className="text-center text-lg mb-6">Total Amount: <span className="font-semibold">${totalAmount}</span></p>

      <div className="space-y-4 mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selectedMethod === "cod"}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="form-radio h-5 w-5 text-yellow-500"
          />
          <span className="text-lg font-medium">Cash on Delivery</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={selectedMethod === "online"}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="form-radio h-5 w-5 text-yellow-500"
          />
          <span className="text-lg font-medium">Online Payment</span>
        </label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
