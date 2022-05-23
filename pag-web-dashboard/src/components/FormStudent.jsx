import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "../config/axios";
import Swal from "sweetalert2";
import LoadingComponent from "./LoadingComponent";
import { fetchDetailStudent, editStudent } from "../store/actions/student";
import { getCity, getDistrict, getSubdis } from "../helpers/addressinfo";

export default function FormStudent() {
  const [isEdit, setIsEdit] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [photoChange, setPhotoChange] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdis, setSubDis] = useState([]);
  const [formProvince, setFormProvince] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formDistrict, setFormDistrict] = useState("");
  const [formSubdis, setFormSubdis] = useState("");
  const [profPict, setProfPict] = useState("");
  const [trfProof, setTrfProof] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const studentForm = useRef({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const detailStudent = useSelector((state) => state.student.detailStudent);
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
    fetch("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => response.json())
      .then((data) => {
        setProvince(data.provinsi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchDetailStudent(id));
  }, []);

  function resetPassword(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: "/student/resetpassword/" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(() => {
        Toast.fire({
          icon: "success",
          text: "Email has been sent to student",
        });
      })
      .catch((err) => {
        if (err.response) {
          Toast.fire({
            icon: "error",
            text: err.response.data.errors.join(),
          });
        } else {
          Toast.fire({
            icon: "error",
            text: err,
          });
        }
      });
  }

  function uploadProfPict(e) {
    setLoadingUpload(true);
    e.preventDefault();
    const photo = new FormData();

    photo.append("image", newImage);
    photo.append("dummy", "testdummy");

    axios({
      method: "PATCH",
      url: "/student/" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: photo,
    })
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Successfully Edited",
        });
        setProfPict(URL.createObjectURL(newImage));
        setPhotoChange(false);
        setNewImage("");
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
      })
      .finally(() => {
        setLoadingUpload(false);
      });
  }

  useEffect(() => {
    if (province.length > 0) {
      setPhoneNumber(detailStudent.phone);
      // console.log(detailStudent);
      let dataprovince, datacity, datadistrict, datasubdistrict;
      studentForm.current.fullname.value = detailStudent.fullname;
      studentForm.current.email.value = detailStudent.email;
      studentForm.current.dateOfBirth.value = detailStudent.birthDate;
      studentForm.current.phone.value = detailStudent.phone;
      studentForm.current.address.value = detailStudent.address;
      studentForm.current.additionalInfo.value = detailStudent.additionalInfo;
      studentForm.current.education.value = detailStudent.education;
      studentForm.current.gender.value = detailStudent.gender;
      studentForm.current.classType.value = detailStudent.classType;
      studentForm.current.handicap.value = detailStudent.handicap || 0;
      studentForm.current.ageCategory.value = detailStudent.ageCategory;
      dataprovince = detailStudent.province;
      datacity = detailStudent.city;
      datadistrict = detailStudent.district;
      datasubdistrict = detailStudent.subdistrict;
      setProfPict(detailStudent.profilePicture);
      setTrfProof(detailStudent.trfProof);
      const prov = province.find((item) => item.nama === dataprovince);
      setFormProvince(prov.nama);
      studentForm.current.province.value = prov.id;
      getCity(prov.id)
        .then(({ kota_kabupaten }) => {
          setCity(kota_kabupaten);
          const selectcity = kota_kabupaten.find(
            (item) => item.nama === datacity
          );
          studentForm.current.city.value = selectcity.id;
          setFormCity(selectcity.nama);
          return getDistrict(selectcity.id);
        })
        .then(({ kecamatan }) => {
          setDistrict(kecamatan);
          const selectDistrict = kecamatan.find(
            (item) => item.nama === datadistrict
          );
          studentForm.current.district.value = selectDistrict.id;
          setFormDistrict(selectDistrict.nama);
          return getSubdis(selectDistrict.id);
        })
        .then(({ kelurahan }) => {
          setSubDis(kelurahan);
          const selectSubdis = kelurahan.find(
            (item) => item.nama === datasubdistrict
          );
          studentForm.current.subdistrict.value = selectSubdis.id;
          formSubdis(selectSubdis.nama);
        })
        .catch((err) => {});
    }
  }, [detailStudent, province]);

  function handleChangeEdit(e) {
    e.preventDefault();
    setIsEdit(!isEdit);
    dispatch(fetchDetailStudent(id));
  }
  function handleSaveBtn(e) {
    e.preventDefault();
    const studentData = {
      fullname: studentForm.current.fullname.value,
      email: studentForm.current.email.value,
      birthDate: studentForm.current.dateOfBirth.value,
      phone: studentForm.current.phone.value,
      address: studentForm.current.address.value,
      education: studentForm.current.education.value,
      gender: studentForm.current.gender.value,
      ageCategory: studentForm.current.ageCategory.value,
      classType: studentForm.current.classType.value,
      additionalInfo: studentForm.current.additionalInfo.value,
      handicap: studentForm.current.handicap.value,
      province: formProvince,
      city: formCity,
      district: formDistrict,
      subdistrict: formSubdis,
    };
    dispatch(editStudent(studentData, id))
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

  return (
    <div>
      <p className="text-xl pb-6 flex items-center">
        <i className="fas fa-info-circle mr-3"></i> Detail Student
      </p>
      <div className="leading-loose">
        <form className="p-10 bg-white rounded shadow-xl" ref={studentForm}>
          {!photoChange ? (
            <div>
              <img
                src={
                  profPict ||
                  "https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png"
                }
                alt="profpict"
                className="w-32 mx-auto block rounded-lg h-32 object-cover"
              />
              <label className="cursor-pointer mt-3 mx-auto block w-32">
                <span className="mt-2 leading-normal px-4 py-2 bg-green-500 text-white text-sm rounded-full ">
                  Change Photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      setPhotoChange(true);
                      // props.formProfPict(e.target.files[0]);
                      setNewImage(e.target.files[0]);
                    } else {
                      // props.formProfPict("");
                      setPhotoChange(false);
                      setNewImage("");
                    }
                  }}
                />
              </label>
            </div>
          ) : (
            <div>
              <img
                src={URL.createObjectURL(newImage)}
                alt="profpict"
                className="w-32 mx-auto block rounded-lg h-32 object-cover"
              />
              {loadingUpload && <LoadingComponent />}
              <button
                className="mt-2 leading-normal px-4 py-2 block mx-auto bg-green-500 text-white text-sm rounded-full"
                onClick={uploadProfPict}
              >
                Upload New Photo
              </button>
            </div>
          )}

          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="fullname">
              Full Name
            </label>
            <input
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Your Full Name"
              autoComplete="off"
              aria-label="Name"
              disabled={!isEdit}
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className=" block text-sm text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              disabled={!isEdit}
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="gender">
              Gender
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="gender"
                disabled={!isEdit}
                defaultValue={studentForm.current.gender}
              >
                <option value="none" disabled hidden>
                  --- Select Gender ---
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="email"
              name="email"
              type="email"
              required=""
              placeholder="example@mail.com"
              aria-label="Email"
              autoComplete="off"
              disabled={!isEdit}
            />
          </div>
          <div className="inline-block mt-2 pl-1 w-1/2">
            <label className=" block text-sm text-gray-600" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="phone"
              name="phone"
              type="text"
              value={phoneNumber}
              required=""
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                const value = e.target.value;
                if (value === "" || regex.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              placeholder="081234217821"
              aria-label="phone"
              autoComplete="off"
              disabled={!isEdit}
            />
          </div>
          <div className="inline-block mt-2 w-full pr-1">
            <label className="block text-sm text-gray-600" htmlFor="status">
              Education
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                disabled={!isEdit}
                name="education"
                defaultValue={studentForm.current.education}
              >
                <option value="none" disabled hidden>
                  Select Education
                </option>
                <option value="TK">Kindegarten</option>
                <option value="SD">Primary School</option>
                <option value="SMP">Junior High School</option>
                <option value="SMA">Senior High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master Degree">Master Degree</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block mt-2 w-full pr-1">
            <label className="block text-sm text-gray-600" htmlFor="status">
              Class Type
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                placeholder="Select Role"
                disabled={!isEdit}
                name="classType"
              >
                <option value="none" disabled hidden>
                  Select Class
                </option>
                <option value="Toddler">Toddler ( 3 - 5th )</option>
                <option value="Super Junior">Super Junior ( 6 - 8th )</option>
                <option value="Junior">Junior ( 9 - 18th )</option>
                <option value="Amateur">Amatir ( 19 - 25th )</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block mt-2 w-full pr-1">
            <label
              className="block text-sm text-gray-600"
              htmlFor="ageCategory"
            >
              Age Category
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                disabled={!isEdit}
                name="ageCategory"
              >
                <option value="none" disabled hidden>
                  Select Category
                </option>
                <option value="A Boy">A Boy</option>
                <option value="A Girl">A Girl</option>
                <option value="B Boy">B Boy</option>
                <option value="B Girl">B Girl</option>
                <option value="C Boy">C Boy</option>
                <option value="C Girl">C Girl</option>
                <option value="D Boy">D Boy</option>
                <option value="D Girl">D Girl</option>
                <option value="E Boy">E Boy</option>
                <option value="E Girl">E Girl</option>
                <option value="Amateur Male">Amateur Male</option>
                <option value="Amateur Female">Amateur Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label className=" block text-sm text-gray-600" htmlFor="address">
              Address
            </label>
            <textarea
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="address"
              name="address"
              rows="3"
              required=""
              placeholder="Full Address"
              aria-label="address"
              disabled={!isEdit}
            ></textarea>
          </div>
          <div className="inline-block w-full lg:w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="province">
              Province
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="province"
                disabled={!isEdit}
                defaultValue="none"
                onChange={(e) => {
                  setFormProvince(
                    e.target.options[e.target.selectedIndex].text
                  );
                  getCity(e.target.value).then((data) => {
                    setCity(data.kota_kabupaten);
                  });
                }}
              >
                <option value="none" disabled hidden>
                  --- Select Province ---
                </option>
                {province.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block w-full lg:w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="city">
              City
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="city"
                disabled={!isEdit}
                defaultValue="none"
                onChange={(e) => {
                  setFormCity(e.target.options[e.target.selectedIndex].text);
                  getDistrict(e.target.value).then(({ kecamatan }) => {
                    setDistrict(kecamatan);
                  });
                }}
              >
                <option value="none" disabled hidden>
                  --- Select City ---
                </option>
                {city.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="city">
              Kecamatan
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="district"
                disabled={!isEdit}
                defaultValue="none"
                onChange={(e) => {
                  setFormDistrict(
                    e.target.options[e.target.selectedIndex].text
                  );
                  getSubdis(e.target.value).then(({ kelurahan }) => {
                    setSubDis(kelurahan);
                  });
                }}
              >
                <option value="none" disabled hidden>
                  --- Select Kecamatan ---
                </option>
                {district.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="city">
              Kelurahan
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="subdistrict"
                disabled={!isEdit}
                defaultValue="none"
                onChange={(e) => {
                  setFormSubdis(e.target.options[e.target.selectedIndex].text);
                }}
              >
                <option value="none" disabled hidden>
                  --- Select Kelurahan ---
                </option>
                {subdis.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="handicap">
              Handicap
            </label>
            <input
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="handicap"
              name="handicap"
              type="number"
              placeholder="Handicap"
              autoComplete="off"
              aria-label="handicap"
              disabled={!isEdit}
            />
          </div>
          <div className="mt-2">
            <label
              className=" block text-sm text-gray-600"
              htmlFor="additionalInfo"
            >
              Additional Info
            </label>
            <textarea
              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="additionalInfo"
              name="additionalInfo"
              rows="3"
              required=""
              placeholder="Achievement or Other Information"
              aria-label="additionalInfo"
              disabled={!isEdit}
            ></textarea>
          </div>
          <div className="mt-3">
            {/* {trfProof ? (
              <button
                className="px-2 py-1 text-white tracking-wider block mb-3 bg-yellow-500 hover:bg-yellow-500 rounded"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  Swal.fire({
                    imageUrl: trfProof,
                    imageAlt: "Bank Proof image",
                  });
                }}
              >
                Show Transfer Proof
              </button>
            ) : (
              ""
            )} */}

            {!isEdit ? (
              <div>
                <button
                  className="px-4 py-2 text-white tracking-wider bg-yellow-500 hover:bg-yellow-500 rounded"
                  type="submit"
                  onClick={handleChangeEdit}
                >
                  Edit Student Data
                </button>
                <button
                  className="px-4 py-2 ml-3 text-white tracking-wider bg-green-500 hover:bg-green-600 rounded"
                  type="submit"
                  onClick={resetPassword}
                >
                  Reset Password
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="px-4 py-2 text-white tracking-wider bg-green-600 rounded"
                  type="submit"
                  onClick={handleSaveBtn}
                >
                  Save Changes
                </button>
                <button
                  className="px-4 py-2 text-white tracking-wider bg-red-600 rounded ml-5"
                  type="submit"
                  onClick={handleChangeEdit}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
