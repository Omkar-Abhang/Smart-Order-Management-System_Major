import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import _LandingPage from "./_LandingPage";
import AllProducts from "./Components/AllProducts";
import Login from "./_Auth/Login";
import RegistrationPage from "./_Auth/RegistrationPage";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./Components/About";
import OrderHistory from "./Components/OrderHistory";

function App() {
    return (
        <Router>
            <div className="relative flex flex-col min-h-screen">
                {/* Navbar - This will always be present */}
                <Navbar />

                {/* Main Content - This will change depending on the route */}
                <Routes>
                    <Route path="/" element={<_LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/allproducts" element={<AllProducts />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orderhistory" element={<OrderHistory />} />

                </Routes>

                {/* Footer - This will always be present */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
