import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

export default function DashboardHeader() {
  const userLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch({
      type: "SET_USER_LOGIN",
      status: false,
    });
    localStorage.removeItem("access_token");
  }
  return (
    <>
      <div className="w-full items-center bg-white py-4 px-6 hidden sm:flex">
        <div className="w-1/2">
          <h1 className="font-bold text-2xl text-green-800">
            Golf Academy Dashboard
          </h1>
        </div>
        <div className="relative w-1/2 flex justify-end">
          <button
            className="rounded bg-green-500 p-2 text-white"
            onClick={handleLogout}
          >
            Logout <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
      {!userLogin ? <Redirect to="/" /> : ""}
    </>
  );
}
