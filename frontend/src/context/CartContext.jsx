import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addToCart(coffee, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === coffee.id);
      if (existing) {
        return prev.map((item) =>
          item.id === coffee.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...coffee, quantity }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return favorites.includes(id);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </CartContext.Provider>
  );
}