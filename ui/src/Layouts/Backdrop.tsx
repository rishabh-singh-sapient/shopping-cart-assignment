import React from "react";
import ReactDOM from "react-dom";

export default function Backdrop(props: any) {
  const backdrop: any = document.querySelector("#backdrop");
  return ReactDOM.createPortal(
    <div className="backdrop" tabIndex={0} onClick={props.onClose}>
      {props.children}
    </div>,
    backdrop
  );
}
