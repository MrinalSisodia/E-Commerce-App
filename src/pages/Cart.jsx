import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const Cart = () => {
  const { cart } = useCartContext();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Cart</h1>

      {cart.length > 0 ? (
        <>
          <div className="d-flex flex-column gap-4">
            {cart.map((item) => (
              <CartItemCard key={item._id} item={item} />
            ))}
          </div>

          <div className="card p-3 mt-5">
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
    </div>
  );
};

export default Cart;
