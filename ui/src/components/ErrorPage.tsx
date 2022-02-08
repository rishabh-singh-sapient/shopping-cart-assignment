import React from "react";

export default function ErrorPage(props: any) {
  return (
    <section className="d-flex flex-column w-100 align-items-center position-absolute">
      <div
        className="d-flex justify-content-center align-items-center -p-4"
        style={{ fontSize: "15rem" }}
      >
        <div>4</div>
        <div className="error-page"></div>
        <div>4</div>
      </div>
      <footer>
        <h4 className="mt-3" tabIndex={0}>
          Oops. The page you're looking for doesn't exist.
        </h4>
      </footer>
    </section>
  );
}
