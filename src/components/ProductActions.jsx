
export const AddToCartButton = ({ product, addToCart, isInCart }) => (
  <button
    className="btn bg-info-subtle fw-bold"
    onClick={(e) => {
      e.preventDefault();
      addToCart(product);
    }}
    disabled={isInCart(product._id)}
  >
    {isInCart(product._id) ? "Added to Cart" : "Add to Cart"}
  </button>
);

export const RemoveFromWishlistButton = ({ product, toggleWishlist }) => (
  <button
    className="btn  btn-outline-danger fw-bold"
    onClick={(e) => {
      e.preventDefault();
      toggleWishlist(product);
    }}
  >
    Remove from Wishlist
  </button>
);
