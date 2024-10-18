import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Orders from './pages/Orders/Orders'
import Auth from './pages/Auth/Auth'
import Cart from './pages/Cart/Cart'
import Landing from './pages/Landing/Landing'
import Payment from './pages/Payment/Payment'
import Results from './pages/Results/Results'
import ProductDetail from './pages/PorductDetail/ProductDetail'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './ProtectedRoute'

const stripePromise = loadStripe(
  "pk_test_51Q3gIHDl8SpKXVAJDELtDDexChfqgtA2zGk01zU9mdNj6NyCZW3Go1TNeL8kfQJjD7oGtaJCaUGzRfCIkMKVFw0H000EpaKidD"
);

const Routing = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must log in to access your orders"}
                redirect={"/payment"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />

          <Route
            path="/payment"
            element={
              <ProtectedRoute
                msg={"you must log in to pay"}
                redirect={"/payment"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;

