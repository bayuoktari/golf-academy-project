import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addStaff, editStaff } from "../store/actions/staff";
import { useHistory, useParams } from "react-router-dom";
import { getCity, getDistrict, getSubdis } from "../helpers/addressinfo";
import Swal from "sweetalert2";
import axios from "../config/axios";

export default function FormAddStaff(props) {
  const formStaff = useRef({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(true);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdis, setSubDis] = useState([]);
  const [formProvince, setFormProvince] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formDistrict, setFormDistrict] = useState("");
  const [formSubdis, setFormSubdis] = useState("");

  useEffect(() => {
    if (props.page === "detail") {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
    fetch("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => response.json())
      .then((data) => {
        setProvince(data.provinsi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmitStaff(e) {
    e.preventDefault();
    const staffData = {
      fullname: formStaff.current.name.value,
      email: formStaff.current.email.value,
      phone: formStaff.current.phone.value,
      role: formStaff.current.role.value,
      gender: formStaff.current.gender.value,
      address: formStaff.current.address.value,
      province: formProvince,
      city: formCity,
      district: formDistrict,
      subdistrict: formSubdis,
    };
    dispatch(addStaff(staffData))
      .then(() => {
        Swal.fire("Success!", "Add Staff Success!", "success");
        history.push("/dashboard/staff");
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.errors.join(), "error");
      });
  }

  function resetPassword(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: "/staff/resetpassword/" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(() => {
        Swal.fire("Success!", "Email has been sent !", "success");
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire("Error!", err.response.data.errors.join(), "error");
        } else {
          Swal.fire("Error!", err, "error");
        }
      });
  }

  function handleEditForm(e) {
    e.preventDefault();
    const staffData = {
      fullname: formStaff.current.name.value,
      email: formStaff.current.email.value,
      phone: formStaff.current.phone.value,
      role: formStaff.current.role.value,
      gender: formStaff.current.gender.value,
      address: formStaff.current.address.value,
      province: formProvince,
      city: formCity,
      district: formDistrict,
      subdistrict: formSubdis,
    };
    dispatch(editStaff(staffData, id))
      .then(() => {
        Swal.fire("Edit Success!", "Staff has been edited!", "success");
        history.push("/dashboard/staff");
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.errors.join(), "error");
      });
  }
  useEffect(() => {
    if (props.page === "detail" && province.length > 0) {
      let dataprovince, datacity, datadistrict, datasubdistrict;
      axios({
        url: "staff/" + id,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          setIsEdit(false);
          formStaff.current.name.value = data.fullname;
          formStaff.current.email.value = data.email;
          formStaff.current.phone.value = data.phone;
          formStaff.current.address.value = data.address;
          formStaff.current.gender.value = data.gender;
          formStaff.current.role.value = data.role;
          dataprovince = data.province;
          datacity = data.city;
          datadistrict = data.district;
          datasubdistrict = data.subdistrict;
          const prov = province.find((item) => item.nama === dataprovince);
          formStaff.current.province.value = prov.id;
          setFormProvince(prov.nama);
          getCity(prov.id)
            .then(({ kota_kabupaten }) => {
              setCity(kota_kabupaten);
              const selectcity = kota_kabupaten.find(
                (item) => item.nama === datacity
              );
              formStaff.current.city.value = selectcity.id;
              setFormCity(selectcity.nama);
              return getDistrict(selectcity.id);
            })
            .then(({ kecamatan }) => {
              setDistrict(kecamatan);
              const selectDistrict = kecamatan.find(
                (item) => item.nama === datadistrict
              );
              formStaff.current.district.value = selectDistrict.id;
              setFormDistrict(selectDistrict.nama);
              return getSubdis(selectDistrict.id);
            })
            .then(({ kelurahan }) => {
              setSubDis(kelurahan);
              const selectSubdis = kelurahan.find(
                (item) => item.nama === datasubdistrict
              );
              formStaff.current.subdistrict.value = selectSubdis.id;
              setFormSubdis(selectSubdis.nama);
            });
        })
        .catch((err) => {
          // console.log(err);
          if (err.response) {
            Swal.fire({
              icon: "error",
              title: err.response.data.errors.join(),
            });
          } else {
            Swal.fire({
              icon: "error",
              title: err,
            });
          }
        });
    }
  }, [province]);

  function renderEditButton() {
    if (!isEdit) {
      return (
        <div>
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded hover:bg-green-800"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
          >
            Edit Staff
          </button>
          <button
            className="px-4 py-1 ml-3 text-white font-light tracking-wider bg-yellow-500 rounded hover:bg-yellow-800"
            type="submit"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-yellow-500 rounded hover:bg-yellow-600"
            type="submit"
            onClick={handleEditForm}
          >
            Save Changes
          </button>
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded hover:bg-red-600 ml-3"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            Cancel
          </button>
        </div>
      );
    }
  }
  return (
    <div className="w-full lg:w-3/4 my-1 pr-0 lg:pr-2">
      <p className="text-xl pb-6 flex items-center">
        <i className="fas fa-id-badge mr-3"></i>{" "}
        {props.page === "detail" ? "Detail Saff" : "Add New Staff"}
      </p>
      <div className="leading-loose">
        <form className="p-10 bg-white rounded shadow-xl" ref={formStaff}>
          <div className="inline-block mt-2 w-full pr-1">
            <label className="block text-sm text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              disabled={!isEdit}
              autoComplete="off"
              placeholder="Staff Full Name"
              aria-label="Name"
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="email"
              name="email"
              type="email"
              disabled={!isEdit}
              autoComplete="off"
              placeholder="Staff Email Address"
              aria-label="Email"
            />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="block text-sm text-gray-600" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="phone"
              name="phone"
              type="text"
              disabled={!isEdit}
              autoComplete="off"
              placeholder="Phone Number (08123456789)"
              aria-label="phone"
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="role">
              Role
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                placeholder="Select Role"
                name="role"
                defaultValue="none"
                disabled={!isEdit}
              >
                <option value="none" disabled hidden>
                  --- Select Role ---
                </option>
                <option value="admin">Admin</option>
                <option value="coach">Coach</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="role">
              Gender
            </label>
            <div className="relative inline-block w-full text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                placeholder="Select Role"
                name="gender"
                defaultValue="none"
                disabled={!isEdit}
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
          <div className="mt-2">
            <label className=" block text-sm text-gray-600" htmlFor="address">
              Address
            </label>
            <textarea
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="address"
              name="address"
              rows="2"
              disabled={!isEdit}
              placeholder="Staff Full Address"
              aria-label="address"
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
          <div className="mt-3">
            {props.page === "detail" ? (
              renderEditButton()
            ) : (
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded hover:bg-green-800"
                type="submit"
                onClick={handleSubmitStaff}
              >
                <i className="fas fa-plus"></i> Add New Staff
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
