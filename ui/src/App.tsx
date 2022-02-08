import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Navigator from "./components/Navigator";
import Footer from "./components/Footer";
//import Products from "./components/Products";
import { BrowserRouter as Router } from "react-router-dom";
import Banners from "./components/Banners";
import Loader from "./components/Loader";
import Register from "./components/Register";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";

const Products = lazy(() => import("./components/Products"));

export default function App() {
  return (
    <Router>
      <Navigator />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banners />
                <Home />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}
