import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // raw from backend (category-based)
  const [allProducts, setAllProducts] = useState([]); // all products from backend
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState(null);
  const [subCategory, setSubcategory] = useState("All");
  const [rating, setRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  // ✅ Fetch all products once for global search
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("https://major-project-1-theta.vercel.app/products/all");
      const data = await res.json();
      if (!res.ok || !data.products) throw new Error(data.error || "Failed to fetch products.");
      setAllProducts(data.products);
    } catch (err) {
      console.error("All products fetch error:", err);
    }
  };

  // ✅ Fetch category-specific products
  const fetchCategoryProducts = async (category) => {
    try {
      setCategoryLoading(true);
      setProducts([]);
      setFilteredProducts([]);
      setError(null);

      const res = await fetch(`https://major-project-1-theta.vercel.app/products/by-category/${category}`);
      const data = await res.json();

      if (!res.ok || !data.product) throw new Error(data.error || "Failed to fetch category products.");
      setProducts(data.product);
    } catch (err) {
      console.error("Category fetch error:", err);
      setError(err.message);
    } finally {
      setCategoryLoading(false);
    }
  };

  // ✅ Fetch search results from backend
  const fetchSearchResults = async (query) => {
    try {
      const res = await fetch(`https://major-project-1-theta.vercel.app/products/by-name/${query}`);
      const data = await res.json();
      if (!res.ok || !data.product) throw new Error(data.error || "Search failed.");
      setFilteredProducts(data.product);
    } catch (err) {
      console.error("Search fetch error:", err);
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (category) fetchCategoryProducts(category);
    clearFilters();
  }, [category]);

  useEffect(() => {
    const query = searchQuery.trim();

    if (triggerSearch && query) {
      fetchSearchResults(query);
      setTriggerSearch(false); // reset search trigger
      return;
    }

    let filtered = [...products];

    if (subCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.subCategory?.toLowerCase() === subCategory.toLowerCase()
      );
    }

    filtered = filtered.filter((p) => p.rating >= rating && p.price <= maxPrice);

    if (sortBy === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "highToLow") filtered.sort((a, b) => b.price - a.price);

    setFilteredProducts(filtered);
  }, [products, category, subCategory, rating, maxPrice, sortBy, searchQuery, triggerSearch]);

  const availableSubcategories = [
    ...new Set(products.map((p) => p.subCategory).filter(Boolean)),
  ];

  const clearFilters = () => {
    setSubcategory("All");
    setRating(0);
    setMaxPrice(300);
    setSortBy("");
    setSearchQuery("");
  };

  return (
    <ProductContext.Provider
      value={{
        category,
        setCategory,
        products,
        filteredProducts,
        categoryLoading,
        error,
        subCategory,
        setSubcategory,
        availableSubcategories,
        rating,
        setRating,
        maxPrice,
        setMaxPrice,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        clearFilters,
        setTriggerSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
