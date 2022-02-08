import React from "react";

export default function Footer() {
  return (
    <footer className="d-flex justify-content-center bg-white fixed-bottom">
      <h6>
        Copyright &copy; {new Date().getFullYear()} Sabka Bazaar Grocery
        Supplies Pvt Ltd
      </h6>
    </footer>
  );
}
