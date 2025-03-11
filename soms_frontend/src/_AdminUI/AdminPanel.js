import { useState, useEffect } from "react";
import axios from "axios";
import InventoryController from "./InventoryController";
import ProductController from "./ProductController";
import EmployeeController from "./EmployeeController";
import OrderController from "./OrderController";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Orders");

  useEffect(() => {
    if (selectedMenu === "Orders") {
      fetchOrders();
    }
  }, [selectedMenu]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
    <h2 className="text-4xl font-bold bg-yellow-400 flex justify-center p-4">BAKERY ADMIN</h2>
    <div className="flex h-screen  border-2 border-yellow-300">
      {/* Sidebar */}
      <div className="w-1/5 bg-yellow-400 p-6">
       
        <nav className="space-y-4">
          {["Orders", "Products", "Inventory", "Employee"].map((menu) => (
            <button
              key={menu}
              className={`w-full text-left p-2 rounded border-2 border-black shadow-sm ${
                selectedMenu === menu ? "bg-yellow-300" : ""
              }`}
              onClick={() => setSelectedMenu(menu)}
            >
              {menu}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3">
        {selectedMenu === "Orders" && <OrderController />}
        {selectedMenu === "Inventory" && <InventoryController />}
        {selectedMenu === "Products" && <ProductController />}
        {selectedMenu === "Employee" && <EmployeeController />}
        {/* {selectedMenu === "Settings" && <h1 className="text-2xl font-bold">Settings</h1>} */}
      </div>
    </div>
    </>
  );
}
