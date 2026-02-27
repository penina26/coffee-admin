import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./pages/LandingPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";

export default function App() {
  return (
    <div className="bg-dark min-vh-100 font-monospace">
      {/* Bootstrap styled Navigation */}
      <nav className="navbar navbar-expand navbar-dark bg-dark border-bottom border-secondary px-4 py-3">
        <span className="navbar-brand text-info fw-bold fs-4">Coffee Admin</span>
        <div className="navbar-nav ms-auto gap-3">
          <Link to="/" className="nav-link text-light">Home</Link>
          <Link to="/products" className="nav-link text-light">Inventory</Link>
          <Link to="/add" className="btn btn-outline-info btn-sm mt-1">Add Product</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/add" element={<AdminPage />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </div>
  );
}