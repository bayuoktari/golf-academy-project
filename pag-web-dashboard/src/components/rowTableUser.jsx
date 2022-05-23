import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactToolTip from "react-tooltip";
import {
  deleteStudent,
  getStudentList,
  sendConfirmEmail,
} from "../store/actions/student";

export default function RowTableUser(props) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const dispatch = useDispatch();

  function sendEmail() {
    dispatch(sendConfirmEmail(props.student.id))
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Email has been sent",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.errors,
        });
      });
  }
  function handleDelete() {
    Swal.fire({
      title: `Are you sure want to delete ${props.student.fullname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(props.student.id))
          .then(() => {
            dispatch(getStudentList());
            Toast.fire({
              icon: "success",
              title: "Delete Success",
            });
          })
          .catch(() => {
            Toast.fire({
              icon: "error",
              title: "Something When Wrong",
            });
          });
      }
    });
  }

  return (
    <tr key={props.student.id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            {/* <img
              className="w-full h-full rounded-full"
              src="https://st4.depositphotos.com/3277955/39107/v/950/depositphotos_391075196-stock-illustration-portrait-young-asian-man-wearing.jpg"
              alt=""
            /> */}
            {props.student.gender === "male" ? (
              <span className="fas fa-mars text-blue-600 text-2xl"></span>
            ) : (
              <span className="fas fa-venus text-pink-500 text-2xl"></span>
            )}
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {props.student.fullname}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.student.email}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.student.education}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.student.phone}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className={`absolute inset-0 opacity-50 rounded-full ${
              props.student.confirmEmail ? "bg-green-200" : "bg-red-200"
            }`}
          ></span>
          <span className="relative">
            {props.student.confirmEmail ? "Confirm" : "Need Follow Up"}
          </span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <div className={props.student.confirmEmail ? "hidden" : "inline"}>
          <i
            className="fas fa-envelope text-green-600 cursor-pointer mr-4 text-lg"
            data-tip
            data-for="sendEmail"
            onClick={sendEmail}
          ></i>
          <ReactToolTip id="sendEmail" type="success">
            Send Confirmation Email
          </ReactToolTip>
        </div>
        <Link to={`/dashboard/student/${props.student.id}`}>
          <i
            className="fas fa-eye text-blue-500 cursor-pointer mr-3 text-lg"
            data-tip
            data-for="detail"
          ></i>
          <ReactToolTip id="detail" type="info">
            Detail Student
          </ReactToolTip>
        </Link>
        <i
          className="fas fa-user-times text-red-600 cursor-pointer text-lg"
          data-tip
          data-for="delete"
          onClick={handleDelete}
        ></i>
        <ReactToolTip id="delete" type="error">
          Delete Student
        </ReactToolTip>
      </td>
    </tr>
  );
}
