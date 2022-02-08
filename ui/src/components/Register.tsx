import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const fNameRef = useRef<HTMLInputElement>(null);
  const lNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const paswrdRef = useRef<HTMLInputElement>(null);
  const confirmPaswrdRef = useRef<HTMLInputElement>(null);
  const [focusInput, setFocusInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const namePattern =
    /^(?=.*\w)(?!.*[0-9])(?!.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).{3,10}$/;
  const emailPattern = /^([a-z0-9.]+@([a-z]{3,})+\.[a-z]{2,3})(?!.*\s)$/;
  const paswrdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,15}$/;

  const errorLabels = [
    "Must contain at least three letters in First name and no special characters allowed",
    "Must contain at least three letters in Last name and no special characters allowed",
    "Must contain valid email address. Please check and type again",
    "Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters.",
    "Must contain the same password as above mentioned in the password field",
  ];

  const formSubmitHandler = (e: any) => {
    e.preventDefault();

    if (!namePattern.test(fNameRef.current!.value)) {
      fNameRef.current!.focus();
      setError(errorLabels[0]);
      fNameRef.current!.value = "";
    } else if (!namePattern.test(lNameRef.current!.value)) {
      lNameRef.current!.focus();
      setError(errorLabels[1]);
      lNameRef.current!.value = "";
    } else if (!emailPattern.test(emailRef.current!.value)) {
      emailRef.current!.focus();
      setError(errorLabels[2]);
      emailRef.current!.value = "";
    } else if (!paswrdPattern.test(paswrdRef.current!.value)) {
      paswrdRef.current!.focus();
      setError(errorLabels[3]);
      paswrdRef.current!.value = "";
    } else if (paswrdRef.current!.value !== confirmPaswrdRef.current!.value) {
      confirmPaswrdRef.current!.focus();
      setError(errorLabels[4]);
      confirmPaswrdRef.current!.value = "";
    } else {
      setError("");
      navigate("/");
    }
  };

  const ErrorSpan = (
    <small id="error-span" className="text-danger">
      {error !== "" && focusInput === error && error}
    </small>
  );

  return (
    <main className="d-flex flex-row row p-3 w-100">
      <section className="col-md-5 col-sm-12 d-flex flex-column mt-5 justify-content-top align-items-center">
        <header>
          <h3>
            <strong>Signup</strong>
          </h3>
          <small>
            <strong>We do not share you personal details with anyone.</strong>
          </small>
        </header>
      </section>
      <section className="col-md-7 col-sm-12 mb-4">
        <form
          className="form-group col-md-6 user-form"
          aria-label="Register Form"
          onSubmit={formSubmitHandler}
        >
          <small>&#32;</small>
          {ErrorSpan}
          <br />
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            title={errorLabels[0]}
            placeholder="First Name"
            className="form-control"
            aria-describedby="error-span"
            ref={fNameRef}
            onFocus={() => setFocusInput(errorLabels[0])}
            onBlur={() => setFocusInput("")}
            autoFocus
            required
          />
          <br />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            title={errorLabels[1]}
            placeholder="Last Name"
            className="form-control"
            aria-describedby="error-span"
            ref={lNameRef}
            onFocus={() => setFocusInput(errorLabels[1])}
            onBlur={() => setFocusInput("")}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            title={errorLabels[2]}
            placeholder="Email"
            className="form-control"
            aria-describedby="error-span"
            ref={emailRef}
            onFocus={() => setFocusInput(errorLabels[2])}
            onBlur={() => setFocusInput("")}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            title={errorLabels[3]}
            placeholder="Password"
            className="form-control"
            aria-describedby="error-span"
            ref={paswrdRef}
            onFocus={() => setFocusInput(errorLabels[3])}
            onBlur={() => setFocusInput("")}
            required
          />
          <br />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            title={errorLabels[4]}
            placeholder="Confirm Password"
            className="form-control"
            aria-describedby="error-span"
            ref={confirmPaswrdRef}
            onFocus={() => setFocusInput(errorLabels[4])}
            onBlur={() => setFocusInput("")}
            required
          />
          <br />
          <button className="btn btn-danger w-100 rounded-0" type="submit">
            Signup
          </button>
        </form>
      </section>
    </main>
  );
}
