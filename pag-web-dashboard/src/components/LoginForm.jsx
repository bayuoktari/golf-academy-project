import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/user";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }
  return (
    <form>
      <div>
        <div className="label-input-login">Email Address</div>
        <input
          className="input-login"
          type="email"
          placeholder="user@mail.com"
          autoComplete="off"
          onChange={handleEmail}
        />
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <div className="label-input-login">Password</div>
        </div>
        <input
          className="input-login"
          type="password"
          placeholder="Enter your password"
          autoComplete="off"
          onChange={handlePassword}
        />
      </div>
      <div>
        {/* <a
              className="text-xs font-display font-semibold text-green-600 hover:text-green-800
                            cursor-pointer"
            >
              Forgot Password?
            </a> */}
      </div>
      <div className="mt-10">
        <button
          className="btn-wfull-green-500"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </div>
    </form>
  );
}
