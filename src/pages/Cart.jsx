import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAddressContext } from "../context/AddressContext";
import { useState, useEffect } from "react";
import CartItemCard from "../components/CartItemCard";
import AddressForm from "../components/AddressForm";
import Modal from "../components/Modal";

const Cart = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
const [editAddressData, setEditAddressData] = useState(null);
  const { cart } = useCartContext();
  const { addresses } = useAddressContext();
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    return localStorage.getItem("selectedAddressId") || null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedAddressId", selectedAddressId || "");
  }, [selectedAddressId]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProceed = () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Cart</h1>

      {cart.length > 0 ? (
        <div className="row g-5">
          <div className="col-md-7">
            {cart.map((item) => (
              <div key={item._id} className="mb-3">
                <CartItemCard item={item} />
              </div>
            ))}
          </div>

          <div className="col-md-5">
            <div className="card p-3 shadow-sm">
              <h4>Cart Summary</h4>
              <hr />
              <p>Total Items: <strong>{totalItems}</strong></p>
              <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>

              </div>
              <div className="card p-3 shadow-sm mt-4">
              <h4>Select Delivery Address</h4>

              {addresses.length > 0 ? (
                <div className="d-flex flex-column gap-2 mb-3">
                  {addresses.map((address) => (
  <label
    key={address.id}
    className={`p-2 border rounded d-flex align-items-start justify-content-between gap-2 ${
      selectedAddressId === address.id
        ? "border-primary bg-light"
        : "border-secondary"
    }`}
    style={{ cursor: "pointer" }}
  >
    <div className="d-flex align-items-start gap-2">
      <input
        type="radio"
        name="deliveryAddress"
        className="form-check-input mt-1"
        checked={selectedAddressId === address.id}
        onChange={() => setSelectedAddressId(address.id)}
      />
      <div className="small">
        {address.name}, {address.street}, {address.city}, {address.state} –{" "}
        {address.zip}
      </div>
    </div>

    <button
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={(e) => {
        e.stopPropagation();
        setModalMode("edit");
        setEditAddressData(address);
        setShowAddressModal(true);
      }}
    >
      Edit
    </button>
  </label>
))}

                </div>
              ) : (
                <p className="text-muted mt-2">
                  No saved addresses. Add one below.
                </p>
              )}

              <button
  className="btn btn-outline-primary btn-sm"
  onClick={() => {
    setModalMode("add");
    setEditAddressData(null);
    setShowAddressModal(true);
  }}
>
  + Add New Address
</button>

</div>

              <button
                className="btn btn-success w-100 mt-4"
                onClick={handleProceed}
              >
                Proceed to Checkout
              </button>
            </div>
       
        </div>
      ) : (
        <div>
          <h5>Your cart is empty.</h5>
          <br />
          <button className="btn btn-info" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      )}

      {showAddressModal && (
  <Modal
    title={modalMode === "edit" ? "Edit Address" : "Add New Address"}
    onClose={() => setShowAddressModal(false)}
  >
    <AddressForm
      mode={modalMode}
      initialValues={editAddressData}
      onClose={() => setShowAddressModal(false)}
    />
  </Modal>
)}

    </div>
  );
};

export default Cart;
