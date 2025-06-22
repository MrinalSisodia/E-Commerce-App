
# Cart Context & Cart Page – Code Explanation

## `CartContext.js`

### Key Components

#### 1. **`CartContext`**

```js
const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
```
---

#### 2. **`CartProvider`**
```jsx
export const CartProvider = ({ children }) => {}
```

##### State Initialization & Persisting to `localStorage`
```js
const [cart, setCart] = useState(() => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```


---

#### 3. **Functions Provided by Context**

##### `addToCart(product)`
```js
 const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success("Added to cart!");
  };
```

##### `updateQuantity(productId, newQuantity)`
```js
 const updateQuantity = (productId, newQuantity) => {

      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success("Product quantity updated!");
  };
```


##### `removeFromCart(productId)`
```js
const removeFromCart = (productId) => {
    const removedItem = cart.find((item) => item._id === productId);
    if (removedItem) {
      setCart(cart.filter((item) => item._id !== productId));
      toast.info("Removed from cart");
    }
  };
```

##### `isInCart(productId)`
```jsx
 const isInCart = (productId) => cart.some((item) => item._id === productId);
```
---

#### 4. **Context Provider**
Return ContextProvider
```js
<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isInCart }}>
  {children}
</CartContext.Provider>
```

---



## `Cart.jsx`

This component renders the cart page, displaying cart items, quantity controls, and a total summary.

### Imports
- `useCartContext` and `useWishlistContext` to access cart/wishlist logic.
- `CartItemCard` component to display products.
- `useNavigate` from `react-router-dom` for navigation.

---

###  Cart Display

#### Calculate Total Price
```js
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

---

### Rendering Cart Items
For each item in the cart, display items & cartd etails card, else display Cart is empty message:

```jsx
  {cart.length > 0 ? (
        <>
         <div className="row g-4">
  {cart.map((item) => (
    <div key={item._id} className="col-12 col-md-6">
      <CartItemCard item={item} />
    </div>
  ))}
</div>

          <div className="card col-md-6 p-3 mt-5">
            <h4>Cart Summary</h4>
            <hr />
            <p>
              Total Items:{" "}
              <strong>
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </strong>
            </p>
            <p>
              Total Price: <strong>${totalPrice.toFixed(2)}</strong>
            </p>
            <button
              className="btn btn-success mt-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-muted">Your cart is empty.</p>
      )}
 
```

---

### Cart Item Card
- This component is used to render the cards in Cart. 
```jsx
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


```

### Notes
- Cart items are stored persistently using `localStorage`.
- Cart and wishlist are connected: items can be moved from cart to wishlist.
- `react-toastify` is used for toast notifications (success/info).


---
