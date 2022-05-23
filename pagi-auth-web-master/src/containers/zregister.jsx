import React, { useState } from "react";
import RegisterForm from "../components/registerForm";
import SuccessMessage from "../components/successMessage";

export default function Register() {
  const [isSuccess, setIsSuccess] = useState(false);
  const bgUrl =
    "https://images.unsplash.com/photo-1591491653056-4313c0e2f379?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  function handleSuccess(status) {
    setIsSuccess(status);
  }
  return (
    <div
      className="p-3 lg:p-10 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="w-full lg:w-2/5 mx-auto">
        <div className="p-3 lg:p-10 bg-white rounded shadow-xl">
          <h1 className="text-3xl mb-6 text-center">Register Form</h1>
          {!isSuccess ? (
            <RegisterForm changeStatus={handleSuccess} />
          ) : (
            <SuccessMessage />
          )}
        </div>
      </div>
    </div>
  );
}
