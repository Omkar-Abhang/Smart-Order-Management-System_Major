import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./_Auth/Login";
import StoreOwnerPanel from "./_StoreOwnerUI/StoreOwnerPanel";
import AdminPanel from "./_AdminUI/AdminPanel";
import PrivateRoute from "./_Auth/PrivateRoute";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          {/* for development  */}
          <Route path="/so" element={<StoreOwnerPanel/>} />
          <Route path="/ad" element={<AdminPanel/>} />

          <Route
            path="/storeowner"
            element={
              <PrivateRoute allowedRoles={["StoreOwner"]}>
                <StoreOwnerPanel />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["Admin"]}>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
