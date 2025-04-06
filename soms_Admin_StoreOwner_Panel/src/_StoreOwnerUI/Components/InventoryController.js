import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryController() {
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState({ name: "", quantity: "", description: "" });
  const [request, setRequest] = useState({ name: "", quantity: "", reason: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleAddItem = async () => {
    if (!item.name || !item.quantity || !item.description) {
      setMessage("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/inventory", item);
      setItem({ name: "", quantity: "", description: "" });
      setMessage("Item added successfully!");
      fetchInventory();
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Failed to add item.");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      setMessage("Item deleted successfully!");
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Failed to delete item.");
    }
  };

  const handleUpdateItem = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/inventory/${id}`, item);
      setItem({ name: "", quantity: "", description: "" });
      setMessage("Item updated successfully!");
      fetchInventory();
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("Failed to update item.");
    }
  };

  const handleRequestMaterial = async () => {
    if (!request.name || !request.quantity || !request.reason) {
      setMessage("All fields are required for request!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/inventory/request", request);
      setRequest({ name: "", quantity: "", reason: "" });
      setMessage("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("Failed to send request.");
    }
  };

  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl font-bold">Inventory</h1>
      
      <div className="my-4">
        <input
          type="text"
          placeholder="Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddItem} className="bg-yellow-400 text-black font-bold  px-4 py-2 rounded">Add Item</button>
      </div>

      {message && <p>{message}</p>}

      <table className="w-full bg-white rounded shadow-sm">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-2">Name</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} className="border-t text-center">
              <td className="p-2">{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleUpdateItem(item.id)} className="bg-green-500 text-white px-4 py-1 rounded mr-2">Update</button>
                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-10">Request Inventory Material</h2>
      <div className="my-4">
        <input
          type="text"
          placeholder="Name"
          value={request.name}
          onChange={(e) => setRequest({ ...request, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={request.quantity}
          onChange={(e) => setRequest({ ...request, quantity: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Reason"
          value={request.reason}
          onChange={(e) => setRequest({ ...request, reason: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleRequestMaterial} className="bg-yellow-400 text-black font-bold px-4 py-2 rounded">Request Material</button>
      </div>
    </div>
  );
}

export default InventoryController;