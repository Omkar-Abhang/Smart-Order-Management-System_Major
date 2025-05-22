import React, { useState, useEffect } from "react";
import axios from "axios";

function InventoryController() {
  const [inventoryRequests, setInventoryRequests] = useState([]);
  const [requestItems, setRequestItems] = useState([{ productId: "", quantity: "" }]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [franchiseId, setFranchiseId] = useState("");


  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      fetchFranchiseIdByUser(userId);
    }
  }, []);

  useEffect(() => {
    if (franchiseId) {
      fetchInventoryRequests();
    }
  }, [franchiseId]);

  const fetchFranchiseIdByUser = async (userId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/storeowner/inventory/by-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const id = res.data?.id || res.data?._id;
      setFranchiseId(id); 
      console.log("Franchise ID:", id); 
      if (franchiseId) {
        fetchInventoryRequests(franchiseId);
      } else {
        console.warn("No franchise found for this user.");
      }
    } catch (error) {
      console.error("Error fetching franchise by userId:", error);
    }
  };
  

  const fetchInventoryRequests = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/storeowner/inventory/franchise/${franchiseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInventoryRequests(response.data);
    } catch (error) {
      console.error("Error fetching inventory requests:", error);
    }
  };

  const handleRequestChange = (index, field, value) => {
    const updated = [...requestItems];
    updated[index][field] = value;
    setRequestItems(updated);
  };

  const handleAddRequestRow = () => {
    setRequestItems([...requestItems, { productId: "", quantity: "" }]);
  };

  const handleRemoveRequestRow = (index) => {
    const updated = [...requestItems];
    updated.splice(index, 1);
    setRequestItems(updated);
  };

  const handleRequestMaterial = async () => {
    if (!franchiseId || requestItems.some(item => !item.productId || !item.quantity)) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/storeowner/inventory/request`, {
        franchiseId,
        items: requestItems,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestItems([{ productId: "", quantity: "" }]);
      alert("Request sent successfully!");
      fetchInventoryRequests();
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("Failed to send request.");
    }
  };

  return (
    <div className="flex-1 p-10 bg-gray-100">
      <h1 className="text-2xl font-bold">Inventory Requests</h1>

      {/* Inventory Request List */}
      <table className="w-full mt-4 bg-white rounded shadow-sm">
        <thead>
          <tr className="bg-yellow-100 text-center">
            <th className="p-2">Product ID</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryRequests.flatMap((request) =>
            request.items.map((item, idx) => (
              <tr key={`${request.id}-${idx}`} className="border-t text-center">
                <td className="p-2">{item.productId}</td>
                <td>{item.quantity}</td>
                <td>{request.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Request Inventory Material */}
      <h2 className="text-xl font-bold mt-10">Request Inventory Material</h2>

      {requestItems.map((req, index) => (
        <div key={index} className="flex items-center gap-2 my-2">
          <input
            type="text"
            placeholder="Product ID"
            value={req.productId}
            onChange={(e) => handleRequestChange(index, "productId", e.target.value)}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={req.quantity}
            onChange={(e) => handleRequestChange(index, "quantity", e.target.value)}
            className="border p-2"
          />
          {index > 0 && (
            <button
              onClick={() => handleRemoveRequestRow(index)}
              className="bg-red-400 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        onClick={handleAddRequestRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Add Another Item
      </button>

      <div className="mt-4">
        <button
          onClick={handleRequestMaterial}
          className="bg-yellow-400 text-red-500 font-bold px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </div>

      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
}

export default InventoryController;
