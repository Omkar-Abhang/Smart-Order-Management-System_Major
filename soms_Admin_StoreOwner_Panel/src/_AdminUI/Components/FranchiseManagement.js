import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function FranchiseManagement() {
  const [franchises, setFranchises] = useState([]);
  const [filteredFranchises, setFilteredFranchises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFranchiseId, setEditingFranchiseId] = useState(null);
  const token = localStorage.getItem("token");

  const [message, setMessage] = useState("");

  // Updated initial state to match request structure
  const [franchise, setFranchise] = useState({
    franchiseName: "",
    location: "",
    ownerName: "",
    phone: "",
    ownerEmail: "",
    password: "",
    status: "",
  });

  // Modified Add Franchise logic
  const handleAddOrUpdateFranchise = async () => {
    const {
      _id, // this should exist in the object if editing
      franchiseName,
      location,
      ownerName,
      phone,
      ownerEmail,
      password,
      status,
    } = franchise;

    if (
      !franchiseName ||
      !location ||
      !ownerName ||
      !phone ||
      !ownerEmail ||
      !password ||
      !status
    ) {
      setMessage("All fields are required!");
      return;
    }

    try {
      if (isEditing && _id) {
        // Update existing franchise
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/admin/franchise/update`,
          franchise,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Franchise updated successfully!");
      } else {
        // Add new franchise
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/admin/addfranchise`,
          franchise,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Franchise and store owner added successfully!");
      }

      // Reset and refresh
      setFranchise({
        franchiseName: "",
        location: "",
        ownerName: "",
        phone: "",
        ownerEmail: "",
        password: "",
        status: "",
      });
      setIsEditing(false); // reset editing state
      setIsModalOpen(false);
      fetchFranchises();
    } catch (error) {
      console.error("Error saving franchise:", error);
      setMessage("Failed to save franchise.");
    }
  };

  const fetchFranchises = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/allfranchise`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFranchises(res.data);
      setFilteredFranchises(res.data);
      console.log("Fetched franchises:", res.data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  useEffect(() => {
    fetchFranchises();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = franchises.filter((f) =>
      f.location.toLowerCase().includes(query)
    );
    setFilteredFranchises(filtered);
  };

  const handleEditFranchise = (f) => {
    setFranchise(f);
    setEditingFranchiseId(f.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteFranchise = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/franchise/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Franchise deleted successfully!");
      fetchFranchises();
    } catch (error) {
      console.error("Error deleting franchise:", error);
      setMessage("Failed to delete franchise.");
    }
  };

  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Franchises</h1>
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded-lg w-1/3"
        />
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setFranchise({
              franchiseName: "",
              location: "",
              ownerName: "",
              phone: "",
              ownerEmail: "",
              password: "",
              status: "",
            });
          }}
          className="bg-yellow-400 text-red-500 font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          + Add Franchise
        </button>
      </div>

      {message && <p>{message}</p>}

      <div className="max-h-[500px] overflow-y-auto border rounded-lg">
        {filteredFranchises.length === 0 ? (
          <p className="text-center text-gray-500 p-4">No franchises found.</p>
        ) : (
          <table className="w-full bg-white rounded shadow-sm">
            <thead className="bg-yellow-100">
              <tr>
                <th className="p-2">Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Manager</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredFranchises.map((f) => (
                <tr key={f.id} className="border-t text-center">
                  <td className="p-2">{f.franchiseName}</td>
                  <td>{f.location}</td>
                  <td>{f.phone}</td>
                  <td>{f.ownerEmail}</td>
                  <td>{f.ownerName}</td>
                  <td>{f.status}</td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditFranchise(f)}
                        className="bg-yellow-500 text-black font-bold px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteFranchise(f.franchiseId)}
                        className="text-red-500 px-3 py-2 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-96">
            <div>
              <label className="block font-medium">Franchise Name</label>
              <input
                type="text"
                value={franchise.franchiseName}
                onChange={(e) =>
                  setFranchise({ ...franchise, franchiseName: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                value={franchise.location}
                onChange={(e) =>
                  setFranchise({ ...franchise, location: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Owner Name</label>
              <input
                type="text"
                value={franchise.ownerName}
                onChange={(e) =>
                  setFranchise({ ...franchise, ownerName: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                value={franchise.phone}
                onChange={(e) =>
                  setFranchise({ ...franchise, phone: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={franchise.ownerEmail}
                onChange={(e) =>
                  setFranchise({ ...franchise, ownerEmail: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                value={franchise.password}
                disabled={isEditing}
                onChange={(e) =>
                  setFranchise({ ...franchise, password: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Status</label>
              <select
                value={franchise.status}
                onChange={(e) =>
                  setFranchise({ ...franchise, status: e.target.value })
                }
                className="border rounded-lg w-full p-2 mt-1"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleAddOrUpdateFranchise}
                className="bg-yellow-400 text-red-500 font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FranchiseManagement;
