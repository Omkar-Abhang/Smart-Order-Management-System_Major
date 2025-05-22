import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InventoryRequest from "./Components/InventoryRequest";
import FranchiseManagement from "./Components/FranchiseManagement";
import PlatformUsers from "./Components/PlatformUsers";

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Inventory Requests");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (selectedMenu === "Inventory Requests") {
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
      <header className="flex items-center justify-between whitespace-nowrap bg-yellow-300 border-b border-solid border-b-[#F5EFDB]  border-black shadow-lg">
        <h2 className="text-4xl font-bold  flex justify-center p-4">
          Admin Panel
        </h2>
        <div>
        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-[#fdcf4e] text-[#AB2217] font-bold text-sm"
            >
              Logout
            </button>
          </div>
        )}
        </div>
      </header>

      <div className="flex h-screen  border-2 border-yellow-300">
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-200 p-6">
          <nav className="space-y-4">
            {["Inventory Requests", "Franchise Management","Platform Users"].map((menu) => (
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
          {selectedMenu === "Inventory Requests" && <InventoryRequest/>}
          {selectedMenu === "Franchise Management" && <FranchiseManagement />}
          {selectedMenu === "Platform Users" && <PlatformUsers />}

        </div>
      </div>
    </>
  );
}
