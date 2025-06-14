import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductList from './pages/ProductList.jsx';
import Wishlist from './pages/Wishlisht.jsx';
import Cart from './pages/Cart.jsx';
import ProductDetail from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import UserProfile from './pages/UserProfile.jsx'; 
import SearchResults from './pages/SearchResult.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      {path:"/products/by-category/:category" , element: <ProductList />},
      { path: '/wishlist', element: <Wishlist/> } ,
       { path: '/cart', element: <Cart/> } ,
        { path: '/products/:productId', element: <ProductDetail/> } ,
        {path:"/search", element:<SearchResults />},
{ path: '/checkout', element: <Checkout/> },
{ path: '/user-profile', element: <UserProfile/> }            


    ]
  }
]);




createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

