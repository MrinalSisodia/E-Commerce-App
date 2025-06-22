import { useCartContext } from "../context/CartContext";
import { useAddressContext } from "../context/AddressContext";
import { useOrderContext } from "../context/OrderContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCartContext();
  const { addresses, selectedAddressId } = useAddressContext();
  const { placeOrder } = useOrderContext();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  const handlePlaceOrder = () => {
    if (!selectedAddress || cart.length === 0) return;
    placeOrder(cart, selectedAddress);
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>

      {!orderPlaced ? (
        <>
          {selectedAddress ? (
            <div className="card p-3 mb-4 shadow-sm">
              <h5 className="mb-2">Delivery Address:</h5>
              <p className="mb-0">
                <strong>{selectedAddress.name}</strong><br />
                {selectedAddress.street}, {selectedAddress.city},<br />
                {selectedAddress.state} - {selectedAddress.zip}
              </p>
            </div>
          ) : (
            <div className="alert alert-warning">
              No address selected. Please go to your cart and choose one.
            </div>
          )}

          <div className="card p-3 mb-4 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>
            <ul className="list-group mb-3">
              {cart?.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between">
                  <div>
                    {item.name} × {item.quantity}
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
              <li className="list-group-item fw-bold d-flex justify-content-between">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </li>
            </ul>

            <div className="d-flex flex-column flex-sm-row gap-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/cart")}
              >
                ← Back to Cart
              </button>
              <button
                className="btn btn-success w-100"
                onClick={handlePlaceOrder}
                disabled={!selectedAddressId}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="alert alert-success">Order Placed Successfully!</div>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-3">
            <button
              className="btn btn-outline-info"
              onClick={() => navigate("/user-profile#order-section")}
            >
              View Orders
            </button>
            <button
              className="btn btn-outline-info"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
