import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function LoadingComponent() {
  return (
    <div className="bg-black fixed h-full w-screen right-0 top-0 bg-opacity-50 z-50 flex justify-center items-center">
      <Loader type="Circles" color="#fff" height={80} width={80} />
    </div>
  );
}
