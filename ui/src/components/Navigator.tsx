import React from "react";
import { Link, NavLink } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Cart from "./Cart";

export default function Navigator() {
  const { width } = useWindowDimensions();
  return (
    <header className="sticky-top">
      <nav className="navigator navbar navbar-expand-sm nowrap navbar-light bg-light p-0 ">
        <div className="container">
          <Link to="/">
            <img
              src={`/static/images/logo.png`}
              className="logo navbar-brand"
              alt="Sabka Bazaar"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-label="Toggle navigation"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            data-bs-toggle={width > 575 ? "" : "collapse"}
            data-bs-target="#navbarNav"
          >
            <div className="me-auto navbar-nav navbar-nav-scroll">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "inactive nav-link"
                }
                to="/"
              >
                <strong>Home</strong>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "inactive nav-link"
                }
                to="/products"
              >
                <strong>Products</strong>
              </NavLink>
            </div>
            <section className="d-flex flex-column m-0 p-0 align-items-start">
              <div className="column p-0 m-1 navbar-nav">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-link col-sm-4 col-md-6"
                      : "inactive nav-link col-sm-4 col-md-6"
                  }
                  to="/login"
                >
                  <strong>Login</strong>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-link col-sm-4 col-md-6"
                      : "inactive nav-link col-sm-4 col-md-6"
                  }
                  to="/register"
                >
                  <strong>Register</strong>
                </NavLink>
              </div>
              <Cart />
            </section>
          </div>
        </div>
      </nav>
    </header>
  );
}
