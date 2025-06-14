import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));
      toast.info("Removed from wishlist!");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to wishlist!");
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
