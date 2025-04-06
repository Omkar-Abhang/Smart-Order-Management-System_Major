import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeController() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({ name: "", position: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    if (!employee.name || !employee.position || !employee.email) {
      setMessage("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/employees", employee);
      setEmployee({ name: "", position: "", email: "" });
      setMessage("Employee added successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage("Failed to add employee.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setMessage("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage("Failed to delete employee.");
    }
  };

  const handleUpdateEmployee = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      setEmployee({ name: "", position: "", email: "" });
      setMessage("Employee updated successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
      setMessage("Failed to update employee.");
    }
  };



  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl font-bold">Employees</h1>
      
      <div className="my-4">
        <input
          type="text"
          placeholder="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Position"
          value={employee.position}
          onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddEmployee} className="bg-yellow-400 text-black font-bold  px-4 py-2 rounded">Add Employee</button>
      </div>

      {message && <p>{message}</p>}

      <table className="w-full bg-white rounded shadow-sm">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-2">Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="border-t text-center">
              <td className="p-2">{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>
                <button onClick={() => handleUpdateEmployee(employee.id)} className="bg-green-500 text-white px-4 py-1 rounded mr-2">Update</button>
                <button onClick={() => handleDeleteEmployee(employee.id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default EmployeeController;