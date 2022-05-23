import React from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  return (
    <div className="relative bg-green-400 h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-4">
        <Link
          to="/dashboard"
          className="text-white text-3xl font-semibold uppercase hover:text-gray-50"
        >
          <img
            src="https://pagi-golf.com/wp-content/uploads/2020/07/LOGO-PAGI-GOLF-2020-537x100.png"
            alt="logo-pagi"
          />
        </Link>
        {/* <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <i className="fas fa-plus mr-3"></i> New Report
        </button> */}
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <Link
          to="/dashboard"
          className={`flex items-center ${
            pathname === "/dashboard" ? "bg-green-600" : ""
          } text-white py-4 pl-4 nav-item`}
        >
          <i className="fas fa-home mr-3"></i>
          Dashboard
        </Link>
        <Link
          to="/dashboard/student"
          className={`flex items-center ${
            pathname === "/dashboard/student" ? "bg-green-600" : ""
          } text-white py-4 pl-4 nav-item`}
        >
          <i className="fas fa-user-graduate mr-3"></i>
          Student List
        </Link>
        <Link
          to="/dashboard/staff"
          className={`flex items-center ${
            pathname === "/dashboard/staff" ? "bg-green-600" : ""
          } text-white py-4 pl-4 nav-item`}
        >
          <i className="fas fa-users mr-3"></i>
          Staff List
        </Link>
        <Link
          to={`${url}/student/attendance`}
          className={`flex items-center ${
            pathname === "/dashboard/student/attendance" ? "bg-green-600" : ""
          } text-white py-4 pl-4 nav-item`}
        >
          <i className="fas fa-check-square mr-3"></i>
          Student Attendance
        </Link>
        <Link
          to={`${url}/staff/attendance`}
          className={`flex items-center ${
            pathname === "/dashboard/staff/attendance" ? "bg-green-600" : ""
          } text-white py-4 pl-4 nav-item`}
        >
          <i className="fas fa-business-time mr-3"></i>
          Staff Attendance
        </Link>
      </nav>
    </div>
  );
}
