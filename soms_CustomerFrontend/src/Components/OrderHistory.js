import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/customer/order/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const statusColors = {
    COMPLETED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const paymentColors = {
    COMPLETED: "bg-green-200 text-green-900",
    PENDING: "bg-yellow-200 text-yellow-900",
    FAILED: "bg-red-200 text-red-900",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const totalItems = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            return (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-300 pb-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Order ID:{" "}
                      <span className="text-gray-800 break-all">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Date:{" "}
                      <time dateTime={order.orderDate}>
                        {new Date(order.orderDate).toLocaleString()}
                      </time>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3 sm:mt-0">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${statusColors[order.orderStatus]}`}
                    >
                      {order.orderStatus}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${paymentColors[order.paymentStatus]}`}
                    >
                      {order.paymentStatus}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-inner"
                    >
                      <img
                        src={item.productimage}
                        alt={item.productname}
                        className="w-20 h-20 object-cover rounded-md border border-gray-300"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {item.productname}
                        </h3>
                        <p className="text-gray-600">
                          Qty: <span className="font-medium">{item.quantity}</span>{" "}
                          × ₹{item.price.toFixed(2)}
                        </p>
                        <p className="text-gray-800 font-semibold mt-1">
                          Total: ₹{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Footer */}
                <div className="mt-6 flex justify-between border-t border-gray-300 pt-4">
                  <p className="text-gray-700 font-semibold">
                    Items: <span className="font-bold">{totalItems}</span>
                  </p>
                  <p className="text-gray-900 font-extrabold text-lg">
                    Total Amount: ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
