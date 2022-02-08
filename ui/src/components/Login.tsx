import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const paswrdRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [focusInput, setFocusInput] = useState("");
  const navigate = useNavigate();

  const emailPattern = /^([a-z0-9.]+@([a-z]{3,})+\.[a-z]{2,3})(?!.*\s)$/;
  const paswrdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,15}$/;

  const errorLabels = [
    "Must contain valid email address. Please check the email address",
    "Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters.",
  ];

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    if (!emailPattern.test(emailRef.current!.value)) {
      emailRef.current!.focus();
      setError(errorLabels[0]);
    } else if (!paswrdPattern.test(paswrdRef.current!.value)) {
      paswrdRef.current!.focus();
      setError(errorLabels[1]);
    } else {
      setError("");
      navigate("/");
    }
  };

  const ErrorSpan = (
    <small id="error-span" className="text-danger">
      {error !== "" && error === focusInput && error}
    </small>
  );

  return (
    <main className="d-flex flex-row row p-3 w-100">
      <section className="col-md-5 col-sm-12 d-flex flex-column mt-5 justify-content-top align-items-center">
        <header>
          <h3>
            <strong>Login</strong>
          </h3>
          <small>
            <strong>
              Get access to your Orders, Wishlist and Recommendations.
            </strong>
          </small>
        </header>
      </section>
      <section className="col-md-7 col-sm-12">
        <form
          className="form-group col-md-6 user-form"
          onSubmit={formSubmitHandler}
        >
          <small>&#32;</small>
          {ErrorSpan}
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            title={errorLabels[0]}
            placeholder="Email"
            className="form-control"
            aria-describedby="error-span"
            ref={emailRef}
            onFocus={() => setFocusInput(errorLabels[0])}
            onBlur={() => setFocusInput("")}
            autoFocus
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            title={errorLabels[1]}
            placeholder="Password"
            className="form-control"
            aria-describedby="error-span"
            ref={paswrdRef}
            onFocus={() => setFocusInput(errorLabels[1])}
            onBlur={() => setFocusInput("")}
            required
          />
          <br />
          <button className="btn btn-danger w-100 rounded-0" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
