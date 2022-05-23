import React from "react";
import { Link } from "react-router-dom";

export default function RowAbsence(props) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            {/* <img
              className="w-full h-full rounded-full"
              src={
                "https://st4.depositphotos.com/3277955/39107/v/950/depositphotos_391075196-stock-illustration-portrait-young-asian-man-wearing.jpg"
              }
              alt=""
            /> */}
            {props.report.Student.gender === "male" ? (
              <span className="fas fa-mars text-blue-600 text-2xl"></span>
            ) : (
              <span className="fas fa-venus text-pink-500 text-2xl"></span>
            )}
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {props.report.Student.fullname}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{props.report.date}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.report.checkInTime}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.report.checkOutTime}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link
          to={`/dashboard/student/attendance/${props.report.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-5 rounded-lg"
        >
          Show Detail
        </Link>
      </td>
    </tr>
  );
}
