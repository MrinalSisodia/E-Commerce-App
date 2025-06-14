import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product, renderActions, variant = "grid" }) => {
  const { addToCart, isInCart } = useCartContext();
  const { wishlist, toggleWishlist } = useWishlistContext();

  const isInWishlist = wishlist.some((item) => item._id === product._id);
  const isCart = variant === "cart";

  return (
    <div className={`card product-card position-relative shadow-sm`}>
      {/* Wishlist Button */}
      <button
        className="btn position-absolute top-0 end-0 m-2"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        style={{ zIndex: 2 }}
      >
        <i
          className={`bi ${isInWishlist ? "bi-heart-fill text-danger" : "bi-heart"}`}
          style={{ fontSize: "1.5rem" }}
        ></i>
      </button>

      {/* Image Section */}
      {isCart ? (
        <div className="text-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="cart-card-img"
          />
        </div>
      ) : (
        <div className="product-card-img-wrapper">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-card-img"
            />
          </Link>
        </div>
      )}

      {/* Card Body */}
      <div className={`card-body d-flex flex-column justify-content-between ${isCart ? "cart-card-body" : ""}`}>
        <div>
          <h6 className="card-title text-truncate fw-semibold">{product.name}</h6>
          <p className="card-text fw-bold">${product.price} <br />   ⭐ {product.rating}</p>
    
        </div>

        <div className="mt-auto">
          {renderActions ? (
            renderActions()
          ) : (
            <button
              className="btn btn-primary w-100"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              disabled={isInCart(product._id)}
            >
              {isInCart(product._id) ? "Added to Cart" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
