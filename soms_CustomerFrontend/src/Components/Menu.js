import React from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from '../assets/cookie.jpg';
import cake from '../assets/cake.jpeg';
import pastry from '../assets/pastry.jpeg';
import bread from '../assets/bread.jpg';



const Menu = ({products}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const productExists = products.some(product => product.category.toLowerCase() === category.toLowerCase());
    
    if (productExists) {
      navigate({
        pathname: '/allproducts',
        search: `?search=${category}`
      });
    } else {
      alert('Product not available');
    }
  };

  const handleViewAllProducts = () => {
    navigate('/allproducts');
  };

  return (
    <div className="menu p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
      <button 
        className="bg-[#FAC638] text-[#AB2217] font-bold py-2 px-4 rounded mb-8 hover:bg-[#dbb13d]"
        onClick={handleViewAllProducts}
      >
        View All Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          className="category bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
          onClick={() => handleCategoryClick('cake')}
        >
          <img src={cake} alt="Cakes" className="w-full h-40 object-cover rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Cakes</h2>
          <p className="text-gray-700">Try our signature chocolate mousse cake or our classic carrot cake. We also offer custom cakes for special occasions.</p>
        </div>
        <div 
          className="category bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
          onClick={() => handleCategoryClick('cookies')}
        >
          <img src={cookie} alt="Cookies" className="w-full h-40 object-cover rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Cookies</h2>
          <p className="text-gray-700">Our cookies are made from scratch every day. Choose from chocolate chip, oatmeal raisin, snickerdoodle, and more.</p>
        </div>
        <div 
          className="category bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
          onClick={() => handleCategoryClick('bread')}
        >
          <img src={bread} alt="Breads" className="w-full h-40 object-cover rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Breads</h2>
          <p className="text-gray-700">Our artisanal breads are baked fresh daily. Choose from sourdough, baguette, multigrain, and more.</p>
        </div>
        <div 
          className="category bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
          onClick={() => handleCategoryClick('pastry')}
        >
          <img src={pastry} alt="Pastry" className="w-full h-40 object-cover rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Pastry</h2>
          <p className="text-gray-700">Our pastries are made to order with high-quality ingredients. Try it out....</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
