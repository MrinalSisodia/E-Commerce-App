import React, { useState, useEffect, useRef } from "react";
import { useAddressContext } from "../context/AddressContext";
import { toast } from "react-toastify";

const addressFields = [
  { name: "name", type: "text", placeholder: "Full Name" },
  { name: "street", type: "text", placeholder: "Street Address" },
  { name: "city", type: "text", placeholder: "City" },
  { name: "state", type: "text", placeholder: "State" },
  { name: "zip", type: "number", placeholder: "ZIP Code" },
];

const getEmptyAddress = () =>
  Object.fromEntries(addressFields.map(({ name }) => [name, ""]));

const AddressForm = ({ mode = "add", initialValues = null, onClose }) => {
  const { addAddress, updateAddress } = useAddressContext();
  const [formState, setFormState] = useState(getEmptyAddress());
  const firstInputRef = useRef();

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setFormState(initialValues);
    } else {
      setFormState(getEmptyAddress());
    }
  }, [mode, initialValues]);

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    const isValid = addressFields.every(
      ({ name }) => formState[name].trim() !== ""
    );

    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(formState.zip)) {
      alert("Please enter a valid 6-digit ZIP code.");
      return;
    }

    if (!isValid) {
      alert("Please fill all fields.");
      return;
    }

    if (mode === "edit") {
      updateAddress(formState.id, formState);
    } else {
      addAddress({ ...formState });
    }

    onClose?.();
    toast.success("Address updated successfully.")
  };

  return (
    <div className="p-2">
      {addressFields.map(({ name, type, placeholder }, idx) => (
        <input
          key={name}
          type={type}
          placeholder={placeholder}
          className="form-control mb-2"
          value={formState[name]}
          onChange={(e) => {
  const { value } = e.target;

  if (name === "zip") {
    if (/^\d{0,6}$/.test(value)) {
      setFormState({ ...formState, [name]: value });
    }
  } else {
    setFormState({ ...formState, [name]: value });
  }
}}
          ref={idx === 0 ? firstInputRef : null}
        />
      ))}

      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          {mode === "edit" ? "Save Changes" : "Add Address"}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
