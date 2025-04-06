import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import _LandingPage from "./_LandingPage";
import AllProducts from "./Components/AllProducts";
import Login from "./_Auth/Login"
import RegistrationPage from "./_Auth/RegistrationPage"
import { useState } from "react";



     
 
  

function App() {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<_LandingPage/>} />
                <Route path="/login" element={ <Login />}/>
                <Route path="/register" element={<RegistrationPage/>} />
                <Route path="/allproducts" element={<AllProducts />} />
                

            </Routes>
        </Router>
    );
}

export default App;
