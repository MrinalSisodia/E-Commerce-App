
# ProductCard Component – Code Explanation

For rendering individual product cards in the UI. It supports both **grid view** and **cart view** using the `variant` prop
```jsx
const ProductCard = ({ product, renderActions, variant = "grid" }) => {}
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
<button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}>
  <i className={isInWishlist ? "bi-heart-fill text-danger" : "bi-heart"} />
</button>
```

---

## Product Image

```jsx
<div
        className={isCart ? "" : "d-flex justify-content-center"}
        style={isCart ? {} : { height: "250px", overflow: "hidden" }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className={isCart ? "cart-card-img" : "w-100"}
          style={isCart ? {} : { objectFit: "cover", height: "100%" }}
        />
      </div>
```

- Uses conditional styling based on the `variant` prop:
  - `grid`: Constrained height (250px) and object-fit cover.
  - `cart`: Uses `cart-card-img` class.

---

## Card Body

```jsx
  <div
        className={`card-body ${isCart ? "cart-card-body" : "d-flex flex-column justify-content-between"}`}
      >
        <div>
          <h6 className="card-title text-truncate">{product.name}</h6>
          <p className="card-text fw-semibold">${product.price}</p>
        </div>
```

---

### Add to Cart Button

```jsx
<button
  onClick={(e) => {
    e.preventDefault();
    addToCart(product);
  }}
  disabled={isInCart(product._id)}
>
  {isInCart(product._id) ? "Added to Cart" : "Add to Cart"}
</button>
```
---

## Custom Actions with `renderActions`

```jsx
{renderActions ? renderActions() : <DefaultButton />}
```

- If `renderActions` is provided, it overrides the default "Add to Cart" button.
- Used in `Cart.jsx` to show quantity controls, move to wishlist, remove from cart.

---

## Link Wrapper

```jsx
<Link to={`/products/${product._id}`} className="...">
  {CardInner}
</Link>
```

- Entire card is wrapped in a `Link` to the product details page.
- Prevents navigation when inner buttons are clicked using `e.preventDefault()`.

---

---
