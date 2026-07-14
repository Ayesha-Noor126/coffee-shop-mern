import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-coffee-dark text-white">
      <Link to="/" className="text-xl font-bold text-white no-underline">☕ Bean & Brew</Link>
      <div className="flex gap-5 items-center">
        <Link to="/menu" className="hover:text-amber-200">Menu</Link>
        <Link to="/about" className="hover:text-amber-200">About</Link>
        <Link to="/brand-story" className="hover:text-amber-200">Our Story</Link>
        <Link to="/contact" className="hover:text-amber-200">Contact</Link>
        <Link to="/cart" className="hover:text-amber-200"><ShoppingCart size={20} /></Link>
        <Link to="/login" className="hover:text-amber-200"><User size={20} /></Link>
      </div>
    </nav>
  );
}

export default Navbar;