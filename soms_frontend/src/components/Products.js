import React, { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/admin/getProduct") // Update API URL if needed
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

    if (loading) return <p className="text-center text-lg">Loading products...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    return (
        <>
            <h2 className="text-[#201A09] text-[30px] font-bold px-4 pb-3 pt-7">
                Featured Products
            </h2>
            <div className="h-[600px] overflow-y-auto shadow-xl">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    {products.map((product) => (
                        <div className="flex flex-col gap-3 pb-3" key={product.id}>
                            {/* Image container with fixed size */}
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Products;





