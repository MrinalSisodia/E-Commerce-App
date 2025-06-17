import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const CartItemCard = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlistContext();

  return (
    <div className="cart-horizontal-card">
      <div className="cart-image-section">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="cart-horizontal-img"
        />
      </div>

      <div className="cart-details-section d-flex flex-column justify-content-between">
        <div>
          <h5 className="fw-semibold">{item.name}</h5>
          <p className="text-muted mb-2">${item.price}</p>
        </div>

        <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)
            }
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="cart-button-group">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              toggleWishlist(item);
              removeFromCart(item._id);
            }}
            disabled={isInWishlist(item._id)}
          >
            {isInWishlist(item._id) ? "In Wishlist" : "Move to Wishlist"}
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>

          <Link
            to={`/products/${item._id}`}
            className="btn btn-sm btn-outline-info"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
