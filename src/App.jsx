import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import useAuthStore from "./context/useAuthStore";
import Login from "./pages/login";
import Products from "./pages/Products";
import BasicMenu from "./pages/Navbar";
import Category from "./pages/category";
import SortedProducts from "./pages/sortedProducts";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";
import CartList from "./cart/CartList";
import CartDetails from "./cart/CartDetails";
import CartForm from "./cart/CartForm";
import UserManagement from "./user/UserManagement";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const { token } = useAuthStore();
  return (
    <Router>
      {token && <BasicMenu />}
      <div style={{ paddingTop: "4rem" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/:category" element={<Category />} />
            <Route path="/sorted" element={<SortedProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/form" element={<ProductForm />} />

            <Route path="/cart" element={<CartList />} />
            <Route path="/cart/:id" element={<CartDetails />} />
            <Route path="/cart/add" element={<CartForm />} />
            <Route path="/cart/edit/:id" element={<CartForm />} />

            <Route path="/user" element={<UserManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
