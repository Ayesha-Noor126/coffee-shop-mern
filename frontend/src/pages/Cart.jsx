import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";

function Cart() {
  const { cart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link to="/menu" className="text-coffee-dark underline mt-2 inline-block">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout" className="px-6 py-3 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;