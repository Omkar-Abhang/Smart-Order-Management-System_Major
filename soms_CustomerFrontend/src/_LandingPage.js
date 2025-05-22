import React, { useState, useEffect } from 'react';
import Products from './Components/Products';
import HeroPage from './Components/HeroPage';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ReviewSlider from './Components/ReviewSlider';
import Menu from './Components/Menu';
// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function _LandingPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FBF8EF] group/design-root overflow-x-hidden" 
      style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <MainContent />

      </div>
 

    </div>
  );
}

function MainContent() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/product/get`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data || []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Fix: Filter based on category name
  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[1300px] flex-1 rounded-xl bg-cover">
        <HeroPage onSearch={setSearch} products={products} />
        <Menu products={products}/>
        <Products products={filteredProducts} cartItems={cartItems} setCartItems={setCartItems} />
        <ReviewSlider />
      </div>
    </div>
  );
}

export default _LandingPage;
