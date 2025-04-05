import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import _LandingPage from "./_CustomerUI/_LandingPage";
import StoreOwnerPanel from "./_StoreOwnerUI/StoreOwnerPanel";
import AllProducts from "./_CustomerUI/Components/AllProducts";
import Login from "./Login"
import RegistrationPage from "./RegistrationPage"
import SuperAdminPanel from "./_SuperAdminUI/Components/SuperAdminPanel";
import { useState } from "react";



     
 
  

function App() {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<_LandingPage/>} />
                <Route path="/login" element={ <Login />}/>
                <Route path="/register" element={<RegistrationPage/>} />
                <Route path="/allproducts" element={<AllProducts />} />
                <Route path="/storeOwner" element={<StoreOwnerPanel/>} />
                <Route path="/admin" element={<SuperAdminPanel/>} />

            </Routes>
        </Router>
    );
}

export default App;
