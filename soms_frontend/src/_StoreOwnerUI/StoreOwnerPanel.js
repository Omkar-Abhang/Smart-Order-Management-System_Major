import { useState, useEffect } from "react";
import axios from "axios";
import InventoryController from "./Components/InventoryController";
import ProductController from "./Components/ProductController";
import EmployeeController from "./Components/EmployeeController";
import OrderController from "./Components/OrderController";
import Login from "../Login";
import { useNavigate } from "react-router-dom";

export default function StoreOwnerPanel() {
  const [orders, setOrders] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Orders");
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));


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

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear(); // or remove specific keys
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home or login
    }
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap bg-yellow-400 border-b border-solid border-b-[#F5EFDB]  border-black shadow-lg">
        <h2 className="text-4xl font-bold  flex justify-center p-4">
          Store Owner Panel
        </h2>
        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-[#fdcf4e] text-[#AB2217] font-bold text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full 
    h-10 px-4 bg-[#FAC638] text-[#AB2217] text-sm font-bold border border-solid border-3 border-black mr-10"
              onClick={() => setShowLogin(true)}
            >
              <span className="truncate">Login</span>
            </button>
          )}
          {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>

      </header>

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
