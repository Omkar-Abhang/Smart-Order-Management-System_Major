import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentOptions from "./PaymentOptions";
import OnlinePayment from "./OnlinePayment";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");
  const [showPayment, setShowPayment] = useState(false); // To toggle payment UI
  const [stage, setStage] = useState("cart"); // 'cart' | 'payment' | 'online'
  const [paymentMethod, setPaymentMethod] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/customer/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(response.data.items || []);
        console.log("Cart items:", response.data.items);
      } catch (err) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/customer/cart/remove`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { productId }, // ✅ This sends ?productId=XYZ in URL
        }
      );
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/customer/cart/clear`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart", err);
    }
  };

  const handleCheckoutClick = () => {
    setShowPayment(true);
  };

  const handleBackToCart = () => {
    setShowPayment(false);
  };

  const handleConfirmPayment = async (method) => {
    setPaymentMethod(method);
    if (method === "cod") {
      await placeOrder("Cash on Delivery");
    } else {
      setStage("online");
    }
  };

  const placeOrder = async (method) => {
    const userId = localStorage.getItem("id");
    try {
      const order = {
        userId: userId, // get from JWT/user context
        items: cartItems,
        totalAmount: getTotalAmount(),
        paymentMethod: method,
        paymentStatus: method === "Cash on Delivery" ? "PENDING" : "COMPLETED",
        orderStatus: "PENDING",
        address: note,
      };
   console.log("Order data:", order);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/order/checkout`, order, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Order placed successfully!");
      clearCart();
      setCartItems([]);
      setNote("");
      setStage("cart");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Failed to place order.");
    }
  };
  

  const getTotalAmount = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (loading)
    return (
      <p className="text-center text-lg font-semibold">Loading your cart...</p>
    );
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  if (stage === "payment") {
    return (
      <PaymentOptions
        totalAmount={getTotalAmount()}
        onBack={() => setStage("cart")}
        onConfirm={handleConfirmPayment}
      />
    );
  }
  
  if (stage === "online") {
    return (
      <OnlinePayment
        totalAmount={getTotalAmount()}
        onBack={() => setStage("payment")}
        onSuccess={() => placeOrder("Online Payment")}
      />
    );
  }
  

  return (
    <div className="bg-yellow-100 p-10 rounded-xl shadow-lg w-full max-w-screen-lg min-h-screen mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        Bakery Cart 🥐
      </h2>
      <div className="space-y-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-700">
            Your cart is empty. Add some goodies!
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={item.productimage}
                  alt={item.productname}
                  className="w-20 h-20 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.productname}</h3>
                  <p className="text-gray-600 text-lg">
                    Price: ${item.price.toFixed(2)} <br />
                    Quantity: {item.quantity} {/* <-- Add quantity here */}
                  </p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-lg ml-3"
                onClick={() => removeItem(item.productId)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <>
          {/* Delivery Address */}
          <div className="mt-6">
            <label
              htmlFor="note"
              className="block text-gray-700 font-semibold mb-3 text-lg"
            >
              Enter your delivery address or special instructions:
            </label>
            <textarea
              id="note"
              className="w-full p-4 border border-gray-400 rounded-lg"
              placeholder="Special instructions or delivery address"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Total Amount & Clear Cart and checkout  */}
          <div className="mt-8 flex justify-between items-center">
            <span className="text-2xl font-bold text-yellow-700">
              Total: ${getTotalAmount()}
            </span>
            <div className="space-x-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl text-lg"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg"
                onClick={() => setStage("payment")}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
