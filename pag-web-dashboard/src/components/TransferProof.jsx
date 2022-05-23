import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import axios from "../config/axios";
import Swal from "sweetalert2";

const defaultImg =
  "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";

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

export default function TransferProof() {
  const [imgTrf, setImgTrf] = useState(defaultImg);
  const [photoChange, setPhotoChange] = useState(false);
  const [loadingUpload, setLodingUpload] = useState(false);
  const [newImg, setNewImg] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios({
      method: "GET",
      url: "/student/transferproof?studentId=" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        // console.log(data.url);
        setImgTrf(data.url);
      })
      .catch((err) => {});
  }, [id]);

  function uploadProfPict() {
    setLodingUpload(true);
    const newData = new FormData();
    newData.append("image", newImg);
    newData.append("studentId", id);
    axios({
      method: "PATCH",
      url: "/student/transferproof",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: newData,
    })
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Successfully Edited",
        });
        setPhotoChange(false);
        setImgTrf(URL.createObjectURL(newImg));
        setNewImg("");
      })
      .catch((err) => {
        if (err.response) {
          Toast.fire({
            icon: "success",
            title: err.response.data.errors.join(),
          });
        } else {
          Toast.fire({
            icon: "success",
            title: err,
          });
        }
      })
      .finally(() => {
        setLodingUpload(false);
      });
  }

  return (
    <div>
      {loadingUpload && <LoadingComponent />}
      <p className="text-xl pb-6 flex items-center">
        <i className="fas fa-info-circle mr-3"></i> Bank Transfer Proof
      </p>
      <div className="p-5 bg-white rounded shadow-xl mb-4">
        {!photoChange ? (
          <div>
            <img
              src={imgTrf}
              alt="transfer proof"
              className="w-3/4 block mx-auto"
            />
            <div className="flex justify-center">
              <label className="cursor-pointer mt-3 mx-auto block">
                <span className="mt-2 leading-normal px-4 py-2 bg-green-500 text-white text-sm rounded-full ">
                  Change Transfer Proof
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      setPhotoChange(true);
                      setNewImg(e.target.files[0]);
                    } else {
                      setPhotoChange(false);
                      setNewImg("");
                    }
                  }}
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <img
              src={URL.createObjectURL(newImg)}
              alt="transfer proof"
              className="w-3/4 block mx-auto"
            />
            <div className="flex justify-center">
              <button
                className="mt-2 leading-normal px-4 py-2 block mx-auto bg-green-500 text-white text-sm rounded-full"
                onClick={uploadProfPict}
              >
                Upload New Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
