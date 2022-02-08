import React from "react";
import Backdrop from "../Layouts/Backdrop";

export default function Loader() {
  return (
    <Backdrop>
      <div className="loader"></div>
    </Backdrop>
  );
}
