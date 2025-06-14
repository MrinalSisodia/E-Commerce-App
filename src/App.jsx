import { Outlet } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AddressProvider } from './context/AddressContext';
import { OrderProvider } from './context/OrderContext';

// ✅ Toastify imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <AddressProvider>
              <OrderProvider>
                {/* ✅ Global Toast Container */}
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
                
                <Nav />
                <main>
                  <Outlet />
                </main>
              </OrderProvider>
            </AddressProvider>
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}

export default App;
