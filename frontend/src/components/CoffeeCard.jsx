import { Link } from "react-router-dom"; // create multiple pages in react application without reloading them 
import { Heart } from "lucide-react";
import { useCart } from "../hooks/useCart";

function CoffeeCard({ coffee }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = isFavorite(coffee.id);

  return (
    <div className="relative border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
      <button
        onClick={() => toggleFavorite(coffee.id)}
        className="absolute top-3 right-3 bg-white/80 rounded-full p-1"
        aria-label="favorite"
      >
        <Heart size={18} fill={favorite ? "#e11d48" : "none"} color={favorite ? "#e11d48" : "#333"} />
      </button>

      <Link to={`/coffee/${coffee.id}`}>
        <img src={coffee.image} alt={coffee.name} className="w-full h-36 object-cover rounded-lg" />
      </Link>

      <h3 className="mt-2 font-medium">{coffee.name}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{coffee.description}</p>
      <p className="text-sm mt-1">⭐ {coffee.rating}</p>
      <p className="font-bold mt-1">${coffee.price.toFixed(2)}</p>

      <button
        onClick={() => addToCart(coffee)}
        className="mt-3 w-full py-2 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default CoffeeCard;