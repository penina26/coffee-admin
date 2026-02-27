import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import ProductListPage from "./pages/ProductListPage";

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <h1>Coffee Admin Portal</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Manage Products</Link>
          <Link to="/add">Add New Product</Link>
        </div>
      </nav>

      <main className="content">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Product Search and Display */}
          <Route path="/products" element={<ProductListPage />} />

          {/* Form for Adding Products */}
          <Route path="/add" element={<AdminPage />} />
        </Routes>
      </main>
    </Router>
  );
}