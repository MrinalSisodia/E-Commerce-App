import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success("Added to cart!");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item._id !== productId));
      toast.info("Removed from cart");
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success("Product quantity updated!");
    }
  };

  const removeFromCart = (productId) => {
    const removedItem = cart.find((item) => item._id === productId);
    if (removedItem) {
      setCart(cart.filter((item) => item._id !== productId));
      toast.info("Removed from cart");
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared after order");
  };

  const isInCart = (productId) => cart.some((item) => item._id === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
