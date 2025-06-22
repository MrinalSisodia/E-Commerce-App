import React, { useEffect, useState } from "react";
import { useAddressContext } from "../context/AddressContext";
import { useOrderContext } from "../context/OrderContext";
import { useLocation } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import Modal from "../components/Modal";


const UserProfile = () => {
  const {
    addresses,
    deleteAddress,
    selectedAddressId,
    setSelectedAddressId,
  } = useAddressContext();

  const { orders } = useOrderContext();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [editData, setEditData] = useState(null);

  const openAddModal = () => {
    setModalMode("add");
    setEditData(null);
    setShowModal(true);
  };

  const openEditModal = (address) => {
    setModalMode("edit");
    setEditData(address);
    setShowModal(true);
  };

  useEffect(() => {
    if (location.hash === "#order-section") {
      const el = document.getElementById("order-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>

      <div className="card p-3 mb-4 mt-4">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> 123-456-7890</p>
      </div>

      <section id="my-addresses">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>My Addresses</h4>
          <button className="btn btn-outline-primary btn-sm" onClick={openAddModal}>
            + Add New Address
          </button>
        </div>

        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address.id}
                className={`card p-3 address-card ${
                  selectedAddressId === address.id ? "selected" : ""
                }`}
              >
                <p className="mb-1">
                  {address.name}, {address.street}, {address.city}, {address.state} - {address.zip}
                </p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => openEditModal(address)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteAddress(address.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-sm ${
                      selectedAddressId === address.id
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setSelectedAddressId(address.id)}
                  >
                    {selectedAddressId === address.id ? "Default address" : "Set as Default"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No address saved.</p>
          )}
        </div>
      </section>

      <section id="order-section" className="mt-5">
        <h4>Order History</h4>
        {orders?.length > 0 ? (
          [...orders]
            .slice(-10)
            .reverse()
            .map((order, i) => (
              <div key={order.id} className="card p-3 mb-4 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Order #{orders.length - i}</h6>
                  <small className="text-muted">
                    {new Date(order.date).toLocaleDateString()}
                  </small>
                </div>

                <ul className="list-group list-group-flush mb-3">
                  {order.items.map((item, j) => (
                    <li
                      key={j}
                      className="list-group-item px-0 py-1 d-flex justify-content-between"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="fw-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-2">
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </div>

                {order.address && (
                  <small className="text-muted">
                    <strong>Delivered to:</strong> {order.address.name}, {order.address.street},{" "}
                    {order.address.city}, {order.address.state} – {order.address.zip}
                  </small>
                )}
              </div>
            ))
        ) : (
          <p>No past orders.</p>
        )}
      </section>

      {showModal && (
        <Modal
          title={modalMode === "edit" ? "Edit Address" : "Add New Address"}
          onClose={() => setShowModal(false)}
        >
          <AddressForm
            mode={modalMode}
            initialValues={editData}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
