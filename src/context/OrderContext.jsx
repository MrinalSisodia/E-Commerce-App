import { createContext, useContext, useEffect, useState } from "react";


const OrderContext = createContext();

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


export const useOrderContext = () => useContext(OrderContext);
