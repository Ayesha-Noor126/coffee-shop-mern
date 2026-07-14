import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const tax = total * 0.08;
  const grandTotal = total + tax;

  function handlePlaceOrder() {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(), items: cart, total: grandTotal.toFixed(2),
      status: "Completed", date: new Date().toLocaleDateString(),
    };
    localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));
    clearCart();
    setPlaced(true);
    setTimeout(() => navigate("/orders"), 1200);
  }

  if (placed) return <div className="p-8"><h2 className="text-xl font-semibold">Order placed! Redirecting...</h2></div>;
  if (cart.length === 0) return <div className="p-8"><h2 className="text-xl font-semibold">Your cart is empty.</h2></div>;

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between py-1">
          <span>{item.name} x{item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div className="flex justify-between py-1"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
      <div className="flex justify-between py-1"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
      <div className="flex justify-between py-2 font-bold border-t border-gray-200"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>

      <button onClick={handlePlaceOrder} className="mt-6 px-6 py-3 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition">
        Place Order
      </button>
    </div>
  );
}

export default Checkout;