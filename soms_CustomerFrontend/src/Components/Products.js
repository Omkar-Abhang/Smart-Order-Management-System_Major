import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/customer/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const addToCart = (product) => {
        const updatedCart = { ...cart };
        if (updatedCart[product.id]) {
            updatedCart[product.id].quantity += 1;
        } else {
            updatedCart[product.id] = { ...product, quantity: 1 };
        }
        setCart(updatedCart);

        // Prepare data for backend
        const cartData = {
            userId: "USER_ID", // Replace with actual user ID
            productId: product.id,
            quantity: updatedCart[product.id].quantity,
            price: product.price * updatedCart[product.id].quantity,
        };

        // Send data to backend
        axios.post("http://localhost:8080/cart", cartData)
            .then((res) => console.log("Cart updated", res.data))
            .catch((err) => console.error("Error adding to cart", err));
    };

    if (loading) return <p className="text-center text-lg">Loading products...</p>;
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
                            <p className="text-[#201A09] text-base font-medium leading-normal">{product.name}</p>
                            <p className="text-[#A07D1C] text-sm font-normal leading-normal">₹ {product.price}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-[#A07D1C] text-white py-1 px-3 rounded"
                            >
                                Add to Cart
                            </button>
                            {cart[product.id] && <p className="text-sm">In Cart: {cart[product.id].quantity}</p>}
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
