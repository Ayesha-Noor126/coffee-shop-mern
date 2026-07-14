import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

import About from "./pages/About";
import BrandStory from "./pages/BrandStory";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CoffeeDetails from "./pages/CoffeeDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import ManageCoffee from "./pages/ManageCoffee";
import AddCoffee from "./pages/AddCoffee";
import EditCoffee from "./pages/EditCoffee";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/coffee/:id" element={<CoffeeDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

<Route path="/about" element={<About />} />
<Route path="/brand-story" element={<BrandStory />} />
<Route path="/contact" element={<Contact />} />

          <Route path="/checkout" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute><Orders /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />





          <Route path="/admin/manage-coffee" element={
            <ProtectedRoute adminOnly><ManageCoffee /></ProtectedRoute>
          } />
          <Route path="/admin/add-coffee" element={
            <ProtectedRoute adminOnly><AddCoffee /></ProtectedRoute>
          } />
          <Route path="/admin/edit-coffee/:id" element={
            <ProtectedRoute adminOnly><EditCoffee /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;