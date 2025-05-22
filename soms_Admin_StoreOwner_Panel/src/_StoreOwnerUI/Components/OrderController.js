import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderController() {
  // ✅ Define orders state
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  // ✅ Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data); // ✅ Set fetched orders to state
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ Filter orders based on the selected filter
  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="flex-1 p-10 bg-gray-100">
      <h1 className="text-2xl font-bold">Orders</h1>
      
      <div className="my-4 space-x-2">
        {["All", "Pending", "Ready", "Delivered"].map((status) => (
          <button
            key={status}
            className={`px-4 py-1 rounded ${filter === status ? "bg-yellow-400 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <table className="w-full bg-white rounded shadow-sm">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-2">Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} className="border-t text-center">
              <td className="p-2">#{order.id}</td>
              <td>{order.date}</td>
              <td>
                <span className={`px-2 py-1 rounded text-white ${
                  order.status === "Pending" ? "bg-red-500" :
                  order.status === "Ready" ? "bg-blue-500" : "bg-green-500"
                }`}>
                  {order.status}
                </span>
              </td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td><a href="#" className="text-blue-500">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderController;
