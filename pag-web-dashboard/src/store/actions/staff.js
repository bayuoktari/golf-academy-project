import axios from "../../config/axios";
import Swal from "sweetalert2";

export function addStaff(staffdata) {
  return function () {
    return axios({
      method: "POST",
      url: "staff/register",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        fullname: staffdata.fullname,
        email: staffdata.email,
        phone: staffdata.phone,
        address: staffdata.address,
        role: staffdata.role,
        gender: staffdata.gender,
        province: staffdata.province,
        city: staffdata.city,
        district: staffdata.district,
        subdistrict: staffdata.subdistrict,
      },
    });
  };
}

export function fetchStaff() {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "staff",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_STAFF_LIST",
          staff: data.staff,
        });
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.errors.join(), "error");
      });
  };
}

export function deleteStaff(idStaff) {
  return function () {
    return axios({
      method: "DELETE",
      url: "staff/" + idStaff,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
  };
}

export function editStaff(data, idStaff) {
  return function () {
    return axios({
      method: "PUT",
      url: "staff/" + idStaff,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        data,
      },
    });
  };
}

export function getStaffAttendance(data) {
  return function (dispatch) {
    let month = null;
    let year = null;
    if (!data) {
      month = new Date().getMonth() + 1;
      year = new Date().getFullYear();
    } else {
      month = data.month;
      year = data.year;
    }
    axios({
      method: "POST",
      url: "/staff/presence",
      headers: {
        access_token: localStorage.access_token,
      },
      data: {
        month: month,
        year: year,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_ABSENCE_STAFF",
          reports: data,
        });
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.errors.join(), "error");
      });
  };
}

export function getStaffAbsenceById(id) {
  return function () {
    return axios({
      method: "GET",
      url: "staff/presence/" + id,
      headers: {
        access_token: localStorage.access_token,
      },
    });
  };
}
