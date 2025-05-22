import React from 'react';
import bakeryimage from "../assets/bakeryshop.jpeg";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background image with 30% opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{ backgroundImage: `url(${bakeryimage})` }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome to Bakery Smart</h1>
          <p className="text-lg text-gray-600 mt-4">Where every bite is a piece of heaven!</p>
        </div>

        {/* About Us Section */}
        <div className="mb-12 bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">About Us</h2>
          <p className="text-gray-700 mt-4 text-center leading-relaxed">
            Bakery Smart is a family-owned bakery that has been serving the finest cakes, pastries, and bread
            for over 20 years. Our commitment to quality, flavor, and exceptional customer service has made us a beloved
            spot for all baked goods lovers. We bake fresh every day, using only the finest ingredients.
          </p>
        </div>

        {/* Location Section */}
        <div className="mb-12 bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Visit Us</h2>
          <p className="text-gray-700 mt-4">We are located at:</p>
          <p className="text-xl font-semibold text-gray-800 mt-2">Wagholi, Pune, Maharashtra, India</p>
          <p className="text-gray-600 mt-2">We look forward to seeing you soon!</p>
        </div>

        {/* Specialties Section */}
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Specialties</h2>
          <p className="text-gray-700 mt-4">
            At Sweet Delights Bakery, we take pride in offering a wide variety of freshly baked goods, including:
          </p>
          <ul className="mt-4 text-gray-800 space-y-2">
            <li>🍞 Freshly baked bread and rolls</li>
            <li>🎂 Delicious cakes for every occasion</li>
            <li>🥐 Handcrafted pastries and cookies</li>
            <li>🍰 Specialty desserts and seasonal treats</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
