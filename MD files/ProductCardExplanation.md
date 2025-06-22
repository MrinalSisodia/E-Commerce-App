
# ProductCard Component – Code Explanation
```jsx
const ProductCard = ({ product, renderActions}) => {}
const isCart = variant === "cart";
```
---

## Contexts Used

```js
const { addToCart, isInCart } = useCartContext();
const { wishlist, toggleWishlist } = useWishlistContext();
```

- Accesses cart and wishlist functionality through custom hooks.

---
## Card Inner Variable + Values pased in props

## Wishlist Button

```jsx
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
```

---

## Product Image Display

```jsx
<div className="product-card-img-wrapper">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-card-img"
            />
          </Link>
        </div>
```

---

## Card Body

```jsx
  <div className={`card-body d-flex flex-column justify-content-between`}>
        <div>
          <h6 className="card-title text-truncate fw-semibold">{product.name}</h6>
          <p className="card-text fw-bold">${product.price} <br />   ⭐ {product.rating}</p>
    
        </div>
```

---

### Add to Cart Button

```jsx
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
```
- Custom Action buttons are passdewith `renderActions` prop for using in wishlist page

---
