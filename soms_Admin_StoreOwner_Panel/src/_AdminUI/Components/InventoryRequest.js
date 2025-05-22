import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

function InventoryRequest() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/inventory/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Ensure 'items' is never null
      const cleanedData = res.data.map((req) => ({
        ...req,
        items: Array.isArray(req.items) ? req.items : [],
      }));
  
      setRequests(cleanedData);
      setFilteredRequests(cleanedData);
      console.log("Fetched cleaned requests:", cleanedData);
    } catch (error) {
      console.error("Error fetching inventory requests:", error);
    }
  };
  

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = requests.filter((req) =>
      // req.items.some((item) =>
      //   item.productId.toLowerCase().includes(query)
      // )
      req.status.toLowerCase().includes(query)
    );
    setFilteredRequests(filtered);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/inventory/${id}/status`,
        null, // No body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { status },
        }
      );
      setMessage(`Request ${status.toLowerCase()} successfully!`);
      fetchRequests();
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
      setMessage(`Failed to ${status.toLowerCase()} request.`);
    }
  };

  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Requests</h1>
        <input
          type="text"
          placeholder="Search by status..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded-lg w-1/3"
        />
      </div>

      {message && <p className="text-green-500 mb-2">{message}</p>}

      <div className="max-h-[500px] overflow-y-auto border rounded-lg">
        <table className="w-full bg-white rounded shadow-sm">
          <thead className="bg-yellow-100">
            <tr>
              <th className="p-2">Franchise ID</th>
              <th>Items</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border-t text-center">
                <td className="p-2 font-medium">{req.franchiseId}</td>
                <td className="text-left px-2">
                  <ul className="list-disc list-inside">
                    {req.items.map((item, idx) => (
                      <li key={idx}>
                        {item.productId} - {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="font-semibold uppercase">{req.status}</td>
                <td>
                {req.status.toLowerCase() === "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => updateStatus(req.id, "APPROVED")}
                        className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, "REJECTED")}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryRequest;
