import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function ProductController() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/storeowner/getProduct"
      );
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleAddOrUpdateProduct = async () => {
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.stock ||
      !product.imageUrl
    ) {
      setMessage("All fields are required!");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/storeowner/updateProduct/${editingProductId}`,
          product
        );
        setMessage("Product updated successfully!");
      } else {
        await axios.post("http://localhost:8080/storeowner/addProduct", product);
        setMessage("Product added successfully!");
      }

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
      });
      setIsEditing(false);
      setEditingProductId(null);
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage(
        isEditing ? "Failed to update product." : "Failed to add product."
      );
    }
  };

  const handleEditProduct = (product) => {
    setProduct(product);
    setEditingProductId(product.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/storeowner/deleteProduct/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Failed to delete product.");
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <input
            type="text"
            placeholder="Search by category..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded-lg w-1/3"
          />
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditing(false);
              setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                imageUrl: "",
              });
            }}
            className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            + Add Product
          </button>
        </div>

        {message && <p className="text-green-500">{message}</p>}

        {/* Table container with fixed header & scrolling body */}
        <div className="max-h-[500px] overflow-y-auto border rounded-lg">
          <table className="w-full bg-white rounded shadow-sm">
            <thead className=" top-0 bg-yellow-100 z-10">
              <tr>
                <th className="p-2">Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t text-center">
                  <td className="p-2">{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt="Product"
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 px-4 py-2 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {isEditing ? "Update Product" : "Add Product"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  className="border rounded-lg w-full p-2 mt-1 h-24 resize-none"
                />
              </div>

              <div>
                <label className="block font-medium">Price (₹)</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label className="block font-medium">Category</label>
                <select
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">Select category</option>
                  <option value="Cake">Cake</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Bread">Bread</option>
                  <option value="Loaf">Loaf</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Muffin">Muffin</option>

                </select>
              </div>

              <div>
                <label className="block font-medium">Stock</label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label className="block font-medium">Image URL</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={product.imageUrl}
                  onChange={(e) =>
                    setProduct({ ...product, imageUrl: e.target.value })
                  }
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleAddOrUpdateProduct}
                  className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  {isEditing ? "Update Product" : "Add Product"}
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
        </div>
      )}
    </div>
  );
}

export default ProductController;
