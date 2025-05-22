import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api";


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  // const token = localStorage.getItem("token");


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/product/get`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        console.log("Products:", data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  // // add cart item 
  // const addToCart = (product) => {
  //   const updatedCart = { ...cart };
  //   if (updatedCart[product.id]) {
  //     updatedCart[product.id].quantity += 1;
  //   } else {
  //     updatedCart[product.id] = { ...product, quantity: 1 };
  //   }
  //   setCart(updatedCart);
  
  //   const cartData = {
  //     userId: id,
  //     productId: product.id,
  //     productname: product.name, // include this if your backend expects it
  //     productimage: product.imageUrl,
  //     quantity: updatedCart[product.id].quantity,
  //     price: product.price, // unit price only
  //   };
  
  //   axiosInstance
  //     .post("/customer/cart/add", cartData)
  //     .then((res) => console.log("Cart updated", res.data))
  //     .catch((err) => console.error("Error adding to cart", err));
  // };
  


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

  if (loading)
    return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <>
      <h2 className="text-[#201A09] text-[30px] font-bold px-4 pb-3 pt-7">
        Featured Products
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {products.slice(0, 8).map((product) => (
          <div className="flex flex-col gap-3 pb-3" key={product.id}>
            <div className="w-full h-[150px] rounded-xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[#201A09] text-base font-medium leading-normal">
                {product.name}
              </p>
              <p className="text-[#A07D1C] text-sm font-normal leading-normal">
                ₹ {product.price}
              </p>
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

      {/* See More Button */}
      <button
        onClick={() => navigate("/allproducts")}
        className="mt-4 bg-[#201A09] text-white py-2 px-6 rounded"
      >
        See More Products
      </button>
    </>
  );
}

export default Products;
