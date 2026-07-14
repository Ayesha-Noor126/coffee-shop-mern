import { useCart } from "../hooks/useCart";
import { Trash2 } from "lucide-react";     //react icon library is lucide 

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 border rounded">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 border rounded">+</button>
      </div>

      <p className="w-20 font-bold">${(item.price * item.quantity).toFixed(2)}</p>

      <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default CartItem;