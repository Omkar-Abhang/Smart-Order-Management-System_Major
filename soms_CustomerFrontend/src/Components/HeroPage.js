import React, { useState} from 'react';

function HeroPage({ onSearch, products, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);

    // Log to check if the products and search term are as expected
    console.log('Search Term:', value);
    console.log('All Products:', products);

    // ✅ Ensure products is always an array before calling .filter()
    if (Array.isArray(products) && value.trim() !== '') {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div
        className="relative flex flex-col items-center justify-center text-center min-h-[480px] p-6 rounded-xl shadow-xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/62a56f2d-183a-446d-b559-51cc417e390b.png")',
        }}
      >
        <h1 className="text-white text-4xl font-extrabold leading-tight sm:text-5xl">
          Welcome to Bakery Smart
        </h1>
        <p className="text-white text-lg max-w-2xl mt-3">
          Enjoy a variety of freshly baked cakes, bread, and pastries made with love.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <div className="flex items-center bg-white p-2 rounded-full shadow-md">
            <input
              type="text"
              placeholder="Search for a product..."
              className="flex-1 px-4 py-2 outline-none rounded-l-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="bg-[#FAC638] text-[#AB2217] px-4 py-2 rounded-r-full font-bold"
              onClick={() => onSearch(searchTerm)}
            >
              Submit
            </button>
          </div>

          {/* Popup Search Results */}
          {filteredProducts.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-50">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-3 border-b last:border-0">
                  <div className="flex items-center">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg mr-3" />
                    <div>
                      <p className="font-bold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                  </div>
                  <button
                    className="bg-[#FAC638] text-[#AB2217] px-3 py-1 rounded-md text-sm font-bold"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
