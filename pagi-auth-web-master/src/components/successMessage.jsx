import React from "react";

export default function successMessage(props) {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <i className="far fa-check-circle text-9xl text-green-400 my-3"></i>
      </div>
      <h1 className="text-green-300 text-center font-extrabold text-4xl mb-3">
        Success
      </h1>
      {props.page === "verify" ? (
        <p className="text-center">
          Email Has Been Verified,
          <br />
          Please Login to your account
        </p>
      ) : props.page === "reset" ? (
        <p className="text-center">
          Password Successfuly reset,
          <br />
          Please Login to your account
        </p>
      ) : (
        <p className="text-center">
          We received your personal information.
          <br />
          Our team will contact you by phone as soon as posible
          <br />
          Make sure your phone number is active
        </p>
      )}
    </div>
  );
}
