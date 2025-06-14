import React from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const { filteredProducts } = useProductContext();
  const { addToCart, isInCart } = useCartContext();
  const {isInWishlist, toggleWishlist} = useWishlistContext();

  const product = filteredProducts?.find((p) => p._id === productId);

  if (!product) return <p className="container mt-4">Product not found</p>;

  const inCart = isInCart(product._id);

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
            className={`btn mt-3 ${isInWishlist(product._id) ? "btn-secondary" : "btn-primary"}`}
            onClick={() => {
              toggleWishlist(product);
            }}
            disabled={isInWishlist(product._id)}
          >
            {isInWishlist(product._id) ? "In Wishlist" : "Add to Wishlist"}
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
