import { useWishlistContext } from "../context/WishlistContext";
import { useCartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { RemoveFromWishlistButton } from "../components/ProductActions";
import { AddToCartButton } from "../components/ProductActions";

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
  <div className="d-flex gap-2 mt-2">
    <RemoveFromWishlistButton
      product={item}
      toggleWishlist={toggleWishlist}
    />
    <AddToCartButton
      product={item}
      addToCart={addToCart}
      isInCart={isInCart}
    />
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
