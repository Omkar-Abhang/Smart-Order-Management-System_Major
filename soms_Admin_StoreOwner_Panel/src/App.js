import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./_Auth/Login";
import StoreOwnerPanel from "./_StoreOwnerUI/Components/StoreOwnerPanel";
import AdminPanel from "./_AdminUI/AdminPanel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/storeowner" element={<StoreOwnerPanel/>} />
          <Route path="/admin" element={<AdminPanel/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
