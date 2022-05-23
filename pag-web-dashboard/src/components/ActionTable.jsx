import React from "react";
import ReactToolTip from "react-tooltip";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteStudent,
  getStudentList,
  sendConfirmEmail,
} from "../store/actions/student";

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

export default function ActionTable(props) {
  const dispatch = useDispatch();
  function sendEmail() {
    dispatch(sendConfirmEmail(props.id))
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
      title: `Are you sure want to delete ${props.fullname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(props.id))
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
    <div>
      <div className={props.confirmEmail ? "hidden" : "inline"}>
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
      <Link to={`/dashboard/student/${props.id}`}>
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
    </div>
  );
}
