import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../config/axios";

export default function FormParent() {
  const { id } = useParams();
  const history = useHistory();
  const [parent, setParent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const formParent = useRef(null);

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

  useEffect(() => {
    axios({
      method: "GET",
      url: "student/parent?studentId=" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        setParent(data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (parent.fullname) {
      setPhoneNumber(parent.phone);
      formParent.current.parentFullname.value = parent.fullname;
      formParent.current.parentEmail.value = parent.email;
      formParent.current.parentPhone.value = parent.phone;
      formParent.current.job.value = parent.job;
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [parent]);

  function handleSaveParent(e) {
    e.preventDefault();
    axios({
      method: "PUT",
      url: "student/parent?studentId=" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        fullname: formParent.current.parentFullname.value,
        email: formParent.current.parentEmail.value,
        phone: formParent.current.parentPhone.value,
        job: formParent.current.job.value,
      },
    })
      .then(() => {
        history.push("/dashboard/student");
        Toast.fire({
          icon: "success",
          title: "Successfully Edited",
        });
      })
      .catch((err) => {
        if (err.response) {
          Toast.fire({
            icon: "error",
            title: err.response.data.errors.join(),
          });
        } else {
          Toast.fire({
            icon: "error",
            title: err,
          });
        }
      });
  }

  function handleAddParent(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "student/addparent",
      data: {
        parentFullname: formParent.current.parentFullname.value,
        parentEmail: formParent.current.parentEmail.value,
        parentPhone: formParent.current.parentPhone.value,
        parentJob: formParent.current.job.value,
        idStudent: id,
      },
    })
      .then(() => {
        history.push("/dashboard/student");
        Toast.fire({
          icon: "success",
          title: "Successfully Add Parent",
        });
      })
      .catch((err) => {
        if (err.response) {
          Toast.fire({
            icon: "error",
            title: err.response.data.errors.join(),
          });
        } else {
          Toast.fire({
            icon: "error",
            title: err,
          });
        }
      });
  }

  return (
    <div>
      <p className="text-xl pb-4 mt-4 flex items-center">
        <i className="fas fa-info-circle mr-3"></i> Parent Data
      </p>
      <form className="p-10 bg-white rounded shadow-xl" ref={formParent}>
        <div className="mt-2">
          <label
            className="block text-sm text-gray-600 mb-2"
            htmlFor="parentFullname"
          >
            Parent Full Name
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2"
            id="parentFullname"
            name="parentFullname"
            disabled={!isEdit}
            type="text"
            placeholder="Parent Full Name"
            autoComplete="off"
            aria-label="Name"
          />
        </div>
        <div className="inline-block mt-2 w-1/2 pr-1">
          <label
            className="block text-sm text-gray-600 mb-2"
            htmlFor="parentEmail"
          >
            Parent Email
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="parentEmail"
            name="parentEmail"
            disabled={!isEdit}
            type="email"
            required=""
            placeholder="example@mail.com"
            aria-label="parentEmail"
            autoComplete="off"
          />
        </div>
        <div className="inline-block mt-2 pl-1 w-1/2">
          <label
            className=" block text-sm text-gray-600 mb-2"
            htmlFor="parentPhone"
          >
            Parent Phone Number
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="parentPhone"
            name="parentPhone"
            type="text"
            value={phoneNumber}
            disabled={!isEdit}
            placeholder="081234217821"
            aria-label="parentPhone"
            autoComplete="off"
            onChange={(e) => {
              const regex = /^[0-9\b]+$/;
              const value = e.target.value;
              if (value === "" || regex.test(value)) {
                setPhoneNumber(value);
              }
            }}
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600 mb-2" htmlFor="job">
            Parent Job
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2"
            id="job"
            name="job"
            type="text"
            disabled={!isEdit}
            placeholder="Parent Job"
            autoComplete="off"
            aria-label="Name"
          />
        </div>
        {!parent.fullname ? (
          <button
            className="px-4 py-2 text-white tracking-wider bg-green-500 hover:bg-green-600 rounded"
            type="submit"
            onClick={handleAddParent}
          >
            Add Parent
          </button>
        ) : !isEdit ? (
          <button
            className="px-4 py-2 text-white tracking-wider bg-yellow-500 hover:bg-yellow-600 rounded"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
          >
            Edit Parent Data
          </button>
        ) : (
          <div>
            <button
              className="px-4 py-2 text-white tracking-wider bg-green-600 rounded"
              type="submit"
              onClick={handleSaveParent}
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 text-white tracking-wider bg-red-600 rounded ml-5"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
