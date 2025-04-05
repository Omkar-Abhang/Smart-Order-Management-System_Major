import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Bag</h2>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button 
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <label htmlFor="note" className="block text-gray-700 font-semibold mb-2">Add a note to your order</label>
        <textarea
          id="note"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Special instructions or allergy notes"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Update bag</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Cart;
