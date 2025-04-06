import React, { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('search');
      if (searchQuery) {
        setSearch(searchQuery);
      }
    }, [location]);
  


    useEffect(() => {
        fetch("http://localhost:8080/customer/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase().includes(search.toLowerCase())
    );

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
                            <button className="bg-[#A07D1C] text-white py-1 px-3 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;
