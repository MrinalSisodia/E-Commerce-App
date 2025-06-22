# Checkout Page – Code Explanation

## Uses Contexts
```jsx
 const { cart, clearCart } = useCartContext(); 
 const { placeOrder } = useOrderContext(); 
  const { addresses, selectedAddressId, setSelectedAddressId } = useAddressContext();
```

## Order state, total price, selected address 
```jsx
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
```

## Handle Place order 
```jsx
const handlePlaceOrder = () => {
    if (!selectedAddress || cart.length === 0) return;

    placeOrder(cart, selectedAddress); 
    clearCart(); 
    setOrderPlaced(true);
  };

```

## Renders UI 
```jsx
  {!orderPlaced ? (
        <>
          <h5>Select Delivery Address:</h5>
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <div className="form-check" key={addr.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="address"
                  id={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                />
                <label className="form-check-label" htmlFor={addr.id}>
                  {addr.name}, {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No address available. Please add one from your profile.</p>
          )}

          <h5 className="mt-5">Order Summary</h5>
          <ul className="list-group mb-3">
            {cart?.map((item) => (
              <li key={item._id} className="list-group-item">
                {item.name} x ({item.quantity}) = ₹{(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
            <li className="list-group-item fw-bold">Total: ₹{totalPrice}</li>
          </ul>

          <button
            className="btn btn-success"
            onClick={handlePlaceOrder}
            disabled={!selectedAddressId}
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="alert alert-success">Order Placed Successfully!</div>
      )}


```