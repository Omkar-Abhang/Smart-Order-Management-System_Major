import React, { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import axiosInstance from "../api";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('search');
      if (searchQuery) {
        setSearch(searchQuery);
      }
    }, [location]);
  


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/product/get`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase().includes(search.toLowerCase())
    );


      
    
   
  // update cart item 
  const updateCart = (product, quantity) => {
    if (quantity <= 0) return;
  
    const updatedCart = { ...cart };
    updatedCart[product.id] = { ...product, quantity};
    setCart(updatedCart);
  
    const cartData = {
      userId: id,
      productId: product.id,
      productname: product.name,          
      productimage: product.imageUrl,
      quantity: quantity,
      price: product.price,
    };
    axiosInstance
      .post("/customer/cart/add", cartData)
      .then((res) => console.log("Cart updated", res.data))
      .catch((err) => console.error("Error updating cart", err));
  };
  

  // increament item in cart
  const increment = (product) => {
    const quantity = (cart[product.id]?.quantity || 0) + 1;
    updateCart(product, quantity);
  };


  // decrement cart item in cart 
  const decrement = (product) => {
    const currentQty = cart[product.id]?.quantity || 0;
    if (currentQty > 1) {
      updateCart(product, currentQty - 1);
    } else {
      const updatedCart = { ...cart };
      delete updatedCart[product.id];
      setCart(updatedCart);
      // Optionally inform backend that item is removed (set quantity = 0)
      axiosInstance
        .post("/customer/cart/add", {
          userId: id,
          productId: product.id,
          productname: product.name,
          productimage: product.imageUrl,
          quantity: 0,
          price: product.price, // just in case backend still needs unit price
        })
        .then((res) => console.log("Item removed from cart", res.data))
        .catch((err) => console.error("Error removing item", err));
    }
  };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded mb-4 w-full"
            />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="flex flex-col gap-3 pb-3">
                        <div className="w-full h-[150px] rounded-xl overflow-hidden">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-[#201A09] text-base font-medium leading-normal">{product.name}</p>
                            <p className="text-[#A07D1C] text-sm font-normal leading-normal">₹ {product.price}</p>
                  {cart[product.id] ? (
                      <div className="flex items-center gap-2 mt-1">
                          <button
                              onClick={() => decrement(product)}
                              className="bg-red-600 text-white px-2 rounded text-sm"
                          >
                              −
                          </button>
                          <span className="text-sm">{cart[product.id].quantity}</span>
                          <button
                              onClick={() => increment(product)}
                              className="bg-green-600 text-white px-2 rounded text-sm"
                          >
                              +
                          </button>
                      </div>
                  ) : (
                      <button
                          onClick={() => increment(product)}
                          className="bg-[#A07D1C] text-white py-1 px-3 rounded mt-1"
                      >
                          Add to Cart
                      </button>
                  )}
              </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;
