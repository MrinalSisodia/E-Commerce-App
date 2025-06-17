import React, { useState } from "react";
import { useAddressContext } from "../context/AddressContext";
import { useOrderContext } from "../context/OrderContext";

const addressFields = [
  { name: "name", type: "text", placeholder: "Full Name" },
  { name: "street", type: "text", placeholder: "Street Address" },
  { name: "city", type: "text", placeholder: "City" },
  { name: "state", type: "text", placeholder: "State" },
  { name: "zip", type: "number", placeholder: "ZIP Code" }
];

const getEmptyAddress = () =>
  Object.fromEntries(addressFields.map(({ name }) => [name, ""]));

const UserProfile = () => {
  const {
    addresses,
    addAddress,
    deleteAddress,
    updateAddress
  } = useAddressContext();
  const { orders } = useOrderContext();

  const [newAddress, setNewAddress] = useState(getEmptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [editedAddress, setEditedAddress] = useState(null);

const handleAddAddress = () => {
  const isValid = addressFields.every(({ name }) => newAddress[name].trim() !== "");

  const zipRegex = /^\d{6}$/;
  if (!zipRegex.test(newAddress.zip)) {
    alert("Please enter a valid 6-digit ZIP code.");
    return;
  }

  if (!isValid) {
    alert("Please fill all fields.");
    return;
  }

  const success = addAddress({ ...newAddress });
  if (success) {
    setNewAddress(getEmptyAddress()); 
  }
};

  const startEditing = (address) => {
    setEditingId(address.id);
    setEditedAddress({ ...address });
  };

  const handleSaveEdit = () => {
    const isValid = addressFields.every(({ name }) => editedAddress[name]?.trim() !== "");

    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(editedAddress.zip)) {
      alert("Please enter a valid 6-digit ZIP code.");
      return;
    }

    if (isValid) {
      updateAddress(editingId, editedAddress);
      setEditingId(null);
      setEditedAddress(null);
    } else {
      alert("Please fill all fields");
    }
  };

  const renderAddressInputs = (addressState, setAddressState) =>
    addressFields.map(({ name, type, placeholder }) => (
      <input
        key={name}
        type={type}
        placeholder={placeholder}
        className="form-control mb-1"
        value={addressState[name]}
        onChange={(e) =>
          setAddressState({ ...addressState, [name]: e.target.value })
        }
      />
    ));

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>

      <div className="card p-3 mb-4">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> 123-456-7890</p>
      </div>

      <h4>Add a New Address</h4>
      <div className="mb-3">
        {renderAddressInputs(newAddress, setNewAddress)}
        <button className="btn btn-success" onClick={handleAddAddress}>Add Address</button>
      </div>

      <h4 className="mt-4">Saved Addresses</h4>
      {addresses.length > 0 ? addresses.map((address) => (
        <div key={address.id} className="card p-2 mb-2">
          {editingId === address.id ? (
            <>
              {renderAddressInputs(editedAddress, setEditedAddress)}
              <button className="btn btn-sm btn-outline-success me-2" onClick={handleSaveEdit}>Save</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{address.name}, {address.street}, {address.city}, {address.state} - {address.zip}</p>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <button
                  className="btn btn-md btn-outline-danger me-2"
                  onClick={() => deleteAddress(address.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-md btn-outline-primary"
                  onClick={() => startEditing(address)}
                >
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      )) : <p>No address saved.</p>}

      <h4 className="mt-4">Order History</h4>
      {orders?.length > 0 ? orders.map((order, i) => (
        <div key={i} className="card p-2 mb-2">
          <h6>Order #{i + 1}</h6>
          <ul>
            {order.items.map((item, j) => (
              <li key={j}>
                {item.name} × {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        </div>
      )) : <p>No past orders.</p>}
    </div>
  );
};

export default UserProfile;
