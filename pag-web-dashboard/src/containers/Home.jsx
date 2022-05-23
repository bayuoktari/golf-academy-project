import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const userLogin = useSelector((state) => state.user.isLogin);
  return (
    <>
      <div className="lg:flex">
        <div className="hidden lg:flex items-center justify-center bg-green-100 flex-1 h-screen">
          <img
            src="https://pagi-golf.com/wp-content/uploads/2020/07/LOGO-PAGI-GOLF-2020-537x100.png"
            width="75%"
            alt="logo-img"
          />
        </div>
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12 bg-green-100 lg:bg-white flex justify-center lg:justify-center lg:px-12">
            <div className="cursor-pointer flex items-center">
              <div className="text-2xl text-green-800 tracking-wide ml-2 font-semibold">
                Golf Academy Portal
              </div>
            </div>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-green-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Log in
            </h2>
            <div className="mt-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      {userLogin ? <Redirect to="/dashboard" /> : ""}
    </>
  );
}
