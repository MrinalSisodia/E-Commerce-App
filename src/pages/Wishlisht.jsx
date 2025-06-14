import { useWishlistContext } from "../context/WishlistContext";
import { useCartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlistContext();
  const { addToCart, isInCart } = useCartContext();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="row g-4">
          {wishlist.map((item) => (
            <div className="col-sm-6 col-md-4 d-flex" key={item._id}>
              <ProductCard
                product={item}
                renderActions={() => (
                  <div className="d-flex flex-column gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item);
                      }}
                    >
                      Remove from Wishlist
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(item);
                      }}
                      disabled={isInCart(item._id)}
                    >
                      {isInCart(item._id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No products in wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
