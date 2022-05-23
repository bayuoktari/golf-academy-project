import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactToolTip from "react-tooltip";
import Swal from "sweetalert2";
import { deleteStaff, fetchStaff } from "../store/actions/staff";

export default function RowTableStaff(props) {
  const dispatch = useDispatch();
  function handleDelete() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Swal.fire({
      title: `Are you sure want to delete ${props.staff.fullname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStaff(props.staff.id))
          .then(() => {
            dispatch(fetchStaff());
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
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src="https://st4.depositphotos.com/3277955/39107/v/950/depositphotos_391075196-stock-illustration-portrait-young-asian-man-wearing.jpg"
              alt=""
            />
          </div> */}
          {props.staff.gender === "male" ? (
            <span className="fas fa-mars text-blue-600 text-2xl"></span>
          ) : (
            <span className="fas fa-venus text-pink-500 text-2xl"></span>
          )}
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {props.staff.fullname}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{props.staff.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{props.staff.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{props.staff.phone}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.staff.address}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/dashboard/staff/${props.staff.id}`}>
          <i
            className="fas fa-eye text-blue-500 cursor-pointer mr-4 text-lg"
            data-tip
            data-for="edit"
          ></i>
          <ReactToolTip id="edit" type="info">
            <span>Detail Staff</span>
          </ReactToolTip>
        </Link>
        <i
          className="fas fa-user-times text-red-600 cursor-pointer text-lg"
          data-tip
          data-for="delete"
          onClick={handleDelete}
        ></i>
        <ReactToolTip id="delete" type="error">
          Delete Staff
        </ReactToolTip>
      </td>
    </tr>
  );
}
