import axios from "../../config/axios";
import Swal from "sweetalert2";

export function login(data) {
  return function (dispatch) {
    axios({
      method: "POST",
      url: "/staff/login",
      data: {
        email: data.email,
        password: data.password,
      },
    })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        dispatch({
          type: "SET_USER_LOGIN",
          status: true,
        });
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.errors.join(), "error");
      });
  };
}
