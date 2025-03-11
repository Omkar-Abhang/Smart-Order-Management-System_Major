
import React from 'react';
import Products from './components/Products';
import Navbar from './components/Navbar';
import HeroPage from './components/HeroPage';
import Footer from './components/Footer';
import ReviewSlider from './components/ReviewSlider';
// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminPanel from './_AdminUI/AdminPanel';
import Login from './components/Login';


function App() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FBF8EF] group/design-root overflow-x-hidden" 
    style={{fontFamily: 'Epilogue, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <MainContent />
        <Footer/>
        <AdminPanel/>
        <Login/>
      </div>
    </div>
  );
}


function MainContent() {
  return (
    <div className="w-full flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[1300px] flex-1 rounded-xl bg-cover">
        <HeroPage />
        <Products />
        <ReviewSlider/>
      </div>
    </div>
  );
}









export default App;
