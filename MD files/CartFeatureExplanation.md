
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
- Prevents quantity from going below 1 using `Math.max(1, newQuantity)`.
```js
 const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
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
- `ProductCard` component to display products.
- `useNavigate` from `react-router-dom` for navigation.

---

###  Cart Display

#### Calculate Total Price
```js
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

---

### Rendering Cart Items
For each item in the cart:

- Displays `ProductCard` with `variant="cart"`.
- Renders action buttons to:
  - ➖ Decrease Quantity/ Increase Quantity
  - Move to Wishlist (disables if already in wishlist)
  - Remove from Cart

```jsx
 {cart.length > 0 ? (
            cart.map((item) => (
              <div className="mb-4" key={item._id}>
                <ProductCard
                  product={item}
                  variant = "cart"
                  renderActions={() => (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            updateQuantity(item._id, item.quantity - 1);
                          }}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            updateQuantity(item._id, item.quantity + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                       <button
                      className="btn btn-primary mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item)
                        removeFromCart(item._id)

                      }}
                      disabled={isInWishlist(item._id)}
                    >
                      {isInWishlist(item._id) ? "Item in Wishlist" : "Move to Wishlist"}
                    </button>
                      <button
                        className="btn btn-danger mt-1"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCart(item._id);
                        }}
                      >
                        Remove from Cart
                      </button>
                    </>
                  )}
                />
              </div>
            ))
          ) : (
            <p className="text-muted">No products in cart.</p>
          )}
```

---

### Price Details Card
```js
{cart.length > 0 && (
  <div className="card p-3">
    ...
    <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
    <p>Total Price: ${totalPrice.toFixed(2)}</p>
    <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
  </div>
)}
```

---

### Notes
- Cart items are stored persistently using `localStorage`.
- Cart and wishlist are connected: items can be moved from cart to wishlist.
- `react-toastify` is used for toast notifications (success/info).


---
