# Address  & Order Context – Code Explanation


## Address Context
### Sets initial state & updates to local staorage
```jsx
const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);
```

### Provides functions for add, update & delete Address
```jsx
  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setAddresses((prev) => [...prev, newAddress]);
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
    if (selectedAddressId === id) setSelectedAddressId(null);
  }
```

### Sets Selected Id state to be used for updating & checkout page address selection 
```jsx
 const [selectedAddressId, setSelectedAddressId] = useState(() => {
    return localStorage.getItem("selectedAddressId") || null;
  });

 useEffect(() => {
    if (selectedAddressId)
      localStorage.setItem("selectedAddressId", selectedAddressId);
    else
      localStorage.removeItem("selectedAddressId");
  }, [selectedAddressId]);
```

### Provides all values to children
```jsx
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
```


## Order Context 

###
```jsx
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cartItems, address) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      address,
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
```