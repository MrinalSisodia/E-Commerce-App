import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";
import { AddToCartButton } from "./ProductActions";

const ProductCard = ({ product, renderActions}) => {
  const { addToCart, isInCart } = useCartContext();
  const { wishlist, toggleWishlist } = useWishlistContext();

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div className={`card product-card position-relative shadow-sm`}>
   
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

   
      
        <div className="product-card-img-wrapper">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-card-img"
            />
          </Link>
        </div>


      <div className={`card-body d-flex flex-column justify-content-between`}>
        <div>
  <h6 className="card-title text-truncate fs-5 fw-semibold">{product.name}</h6>
  <p className="card-text fw-bold fs-6">
    ${product.price} <br />
    <i className="bi bi-star-fill text-warning"></i> {product.rating}
  </p>
</div>

        <div className="mt-auto">
          {renderActions ? (
            renderActions()
          ) : (
              <AddToCartButton
    product={product}
    addToCart={addToCart}
    isInCart={isInCart}
  />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
