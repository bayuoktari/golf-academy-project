import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import axios from "../config/axios";
// import "react-datepicker/dist/react-datepicker.css";

export default function RegisterForm(props) {
  // const [startDate, setStartDate] = useState(new Date());
  const [profpict, setProfPict] = useState(
    "https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png"
  );
  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdis, setSubDis] = useState([]);
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    education: "",
    address: "",
    birthDate: "",
    gender: "",
    province: "",
    city: "",
    district: "",
    subdistrict: "",
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
    if (selectedProvince) {
      fetch(
        "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" +
          selectedProvince
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.kota_kabupaten);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      fetch(
        "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=" +
          selectedCity
      )
        .then((response) => response.json())
        .then((data) => {
          setDistrict(data.kecamatan);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(
        "https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=" +
          selectedDistrict
      )
        .then((response) => response.json())
        .then((data) => {
          setSubDis(data.kelurahan);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedDistrict]);

  function handleChangeFullname(e) {
    setUserData({ ...userData, fullname: e.target.value });
  }
  function handleChangeEmail(e) {
    setUserData({ ...userData, email: e.target.value });
  }
  function handleChangePhone(e) {
    const regex = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || regex.test(value)) {
      //  this.setState({ value })
      setUserData({ ...userData, phone: value });
    }
  }
  function handleChangeEducation(e) {
    setUserData({ ...userData, education: e.target.value });
  }
  function handleChangeAddress(e) {
    setUserData({ ...userData, address: e.target.value });
  }
  function handleChangeAdditionalInfo(e) {
    setUserData({ ...userData, additionalInfo: e.target.value });
  }

  // function checkFiled(data) {
  //   for (var key in data) {
  //     if (!data[key]) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }

  // function registerClick(e) {
  //   e.preventDefault();
  //   const fieldComplte = checkFiled(userData);
  //   if (fieldComplte) {
  //     axios({
  //       method: "POST",
  //       url: "student/register",
  //       data: {
  //         ...userData,
  //       },
  //     })
  //       .then(() => {
  //         props.changeStatus(true);
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //       });
  //   } else {
  //     setError("All fields must be filled");
  //   }
  // }

  return (
    // <form>
    <div>
      <h1 className="text-center font-semibold text-2xl mb-6">
        Student Information
      </h1>
      <div className="flex flex-col items-center mt-2 w-full pr-1">
        <img
          src={profpict}
          alt="profpict"
          className="w-32 rounded-full h-32 object-cover"
        />
        <label className="cursor-pointer mt-3">
          <span className="mt-2 leading-normal px-4 py-2 bg-green-500 text-white text-sm rounded-full">
            Upload Photo
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length !== 0) {
                // console.log(e.target.files[0]);
                props.formProfPict(e.target.files[0]);
                setProfPict(URL.createObjectURL(e.target.files[0]));
              } else {
                props.formProfPict("");
                setProfPict(
                  "https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png"
                );
              }
            }}
          />
        </label>
      </div>
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
          onChange={handleChangeFullname}
        />
      </div>
      <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
        <label className=" block text-sm text-gray-600">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
          onChange={(e) =>
            setUserData({ ...userData, birthDate: e.target.value })
          }
        />
      </div>
      <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
        <label className="block text-sm text-gray-600" htmlFor="gender">
          Gender
        </label>
        <div className="relative inline-block w-full text-gray-600">
          <select
            className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
            name="gender"
            defaultValue="none"
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
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
      <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
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
          onChange={handleChangeEmail}
        />
      </div>
      <div className="inline-block mt-2 pl-1 w-full lg:w-1/2">
        <label className=" block text-sm text-gray-600" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
          id="phone"
          name="phone"
          type="text"
          value={userData.phone}
          placeholder="081234217821"
          aria-label="phone"
          onChange={handleChangePhone}
          autoComplete="off"
        />
      </div>
      <div className="inline-block mt-2 w-full pr-1">
        <label className="block text-sm text-gray-600" htmlFor="status">
          Education
        </label>
        <div className="relative inline-block w-full text-gray-600">
          <select
            className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
            placeholder="Select Role"
            name="education"
            defaultValue="none"
            onChange={handleChangeEducation}
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
      {/* <div className="inline-block mt-2 w-full pr-1">
        <label className="block text-sm text-gray-600" htmlFor="status">
          Class Category
        </label>
        <div className="relative inline-block w-full text-gray-600">
          <select
            className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
            placeholder="Select Role"
            name="classType"
            defaultValue="none"
            onChange={handleChangeEducation}
          >
            <option value="none" disabled hidden>
              Select Class
            </option>
            <option value="Toddler">Toddler ( 3 - 5th )</option>
            <option value="Super Junior">Super Junior ( 6 - 8th )</option>
            <option value="Junior">Junior ( 9 - 18th )</option>
            <option value="Amatir">Amatir ( 19 - 25th )</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <i className="fas fa-caret-down"></i>
          </div>
        </div>
      </div> */}
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
          onChange={handleChangeAddress}
        ></textarea>
      </div>
      <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
        <label className="block text-sm text-gray-600" htmlFor="province">
          Province
        </label>
        <div className="relative inline-block w-full text-gray-600">
          <select
            className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
            name="province"
            defaultValue="none"
            onChange={(e) => {
              let provinceText = e.target.options[e.target.selectedIndex].text;
              setUserData({ ...userData, province: provinceText });
              setSelectedProvince(e.target.value);
              props.formprovince(provinceText);
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
      <div className="inline-block mt-2 w-full lg:w-1/2 pr-1">
        <label className="block text-sm text-gray-600" htmlFor="city">
          City
        </label>
        <div className="relative inline-block w-full text-gray-600">
          <select
            className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
            name="city"
            defaultValue="none"
            onChange={(e) => {
              let cityText = e.target.options[e.target.selectedIndex].text;
              setUserData({ ...userData, city: cityText });
              setSelectedCity(e.target.value);
              props.formcity(cityText);
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
            defaultValue="none"
            onChange={(e) => {
              let districtText = e.target.options[e.target.selectedIndex].text;
              setUserData({ ...userData, district: districtText });
              setSelectedDistrict(e.target.value);
              props.formdistrict(districtText);
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
            defaultValue="none"
            onChange={(e) => {
              let subDisText = e.target.options[e.target.selectedIndex].text;
              setUserData({ ...userData, subdistrict: subDisText });
              props.formsubdistrict(subDisText);
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
          onChange={handleChangeAdditionalInfo}
        ></textarea>
      </div>
      {/* <div className="mt-6">
        <button
          className="px-4 py-3 text-white w-full tracking-wider bg-green-600 rounded"
          type="submit"
          onClick={registerClick}
        >
          Register
        </button>
      </div> */}
      {/* // </form> */}
    </div>
  );
}
