import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import coffeeData from "../data/coffee.json";
import { useCart } from "../hooks/useCart";

function CoffeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const coffee = coffeeData.find((c) => c.id === Number(id));

  if (!coffee) {
    return (
      <div className="p-8">
        <p>Coffee not found.</p>
        <button onClick={() => navigate("/menu")} className="mt-2 text-coffee-dark underline">
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-8 p-8 flex-wrap">
      <img src={coffee.image} alt={coffee.name} className="w-72 h-72 object-cover rounded-xl" />
      <div>
        <h1 className="text-3xl font-bold">{coffee.name}</h1>
        <p className="text-gray-600 mt-2">{coffee.description}</p>
        <p className="mt-2"><strong>Ingredients:</strong> {coffee.ingredients.join(", ")}</p>
        <p className="mt-1">⭐ {coffee.rating}</p>
        <p className="text-2xl font-bold mt-2">${coffee.price.toFixed(2)}</p>

        <div className="flex items-center gap-4 my-4">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-8 h-8 border rounded-lg">-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="w-8 h-8 border rounded-lg">+</button>
        </div>

        <button
          onClick={() => addToCart(coffee, quantity)}
          className="px-6 py-3 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default CoffeeDetails;