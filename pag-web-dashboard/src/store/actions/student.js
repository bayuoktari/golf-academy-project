import axios from "../../config/axios";
import Swal from "sweetalert2";

export function getStudentList(data) {
  return function (dispatch) {
    dispatch({ type: "SET_LOADING", loading: true });
    return axios({
      method: "GET",
      url: "student",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_LIST_STUDENT",
          students: data.student,
        });
      })
      .catch((err) => {
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
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", loading: false });
      });
  };
}
export function getAttendanceReport(data) {
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
      url: "student/presence",
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
          type: "SET_ABSENCE_STUDENT",
          reports: data,
        });
      })
      .catch((err) => {
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
  };
}

export function sendConfirmEmail(data) {
  return function () {
    return axios({
      method: "GET",
      url: "student/sendemail/" + data,
      headers: {
        access_token: localStorage.access_token,
      },
    });
  };
}

export function deleteStudent(idStudent) {
  return function () {
    return axios({
      method: "DELETE",
      url: "student/" + idStudent,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
  };
}

export function fetchDetailStudent(idStudent) {
  return function (dispatch) {
    return axios({
      method: "GET",
      url: "student/" + idStudent,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_DETAIL_STUDENT",
          detail: data,
        });
      })
      .catch((err) => {
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
  };
}

export function editStudent(studentData, idStudent) {
  return function () {
    return axios({
      method: "PUT",
      url: "student/" + idStudent,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        studentData,
      },
    });
  };
}

export function getAbsenceById(id) {
  return function () {
    return axios({
      method: "GET",
      url: "student/presence/" + id,
      headers: {
        access_token: localStorage.access_token,
      },
    });
  };
}
export function getTotalStudentandFilter() {
  return function () {
    return axios({
      method: "GET",
      url: "student/categoryfilter",
      headers: {
        access_token: localStorage.access_token,
      },
    });
  };
}

export function getAvgScore(period, year) {
  return function () {
    return axios({
      method: "GET",
      url: `student/avgscore?period=${period}&year=${year}`,
      headers: {
        access_token: localStorage.access_token,
      },
    });
  };
}
