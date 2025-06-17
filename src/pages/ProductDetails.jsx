import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart, isInCart } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlistContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://major-project-1-theta.vercel.app/products/${productId}`
        );
        const data = await res.json();
        if (!res.ok || !data.product) throw new Error("Product not found");
        setProduct(data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="container mt-4">Loading product...</p>;
  if (error || !product) return <p className="container mt-4">Product not found.</p>;

  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Subcategory: {product.subCategory}</p>
          <p>Price: ₹{product.price}</p>
          <p>Rating: {product.rating} ⭐</p>
          <p>{product.description}</p>

          <button
            className={`btn mt-3 ${inWishlist ? "btn-secondary" : "btn-primary"}`}
            onClick={() => toggleWishlist(product)}
            disabled={inWishlist}
          >
            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
          </button>
          <br />
          <button
            className={`btn mt-3 ${inCart ? "btn-secondary" : "btn-primary"}`}
            onClick={() => addToCart(product)}
            disabled={inCart}
          >
            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
