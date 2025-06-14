import React, { createContext, useContext, useEffect, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    return localStorage.getItem("selectedAddressId") || null;
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (selectedAddressId)
      localStorage.setItem("selectedAddressId", selectedAddressId);
    else
      localStorage.removeItem("selectedAddressId");
  }, [selectedAddressId]);

 const addAddress = (address) => {
  const newAddress = { ...address, id: Date.now().toString() };
  setAddresses((prev) => [...prev, newAddress]);
  console.log("newAddress state", newAddress);
  return true; // ⬅️ Indicate successful addition
};


  const updateAddress = (id, updatedAddress) => {
  setAddresses((prev) =>
    prev.map((addr) =>
      addr.id === id ? { ...updatedAddress, id } : addr
    )
  );
}

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    toast.info("Address deleted");
    if (selectedAddressId === id) setSelectedAddressId(null);
    
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        selectedAddressId,
        setSelectedAddressId,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);
