import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../config/axios";
import SetPassword from "../components/setPassword";
import { MultiStepForm, Step } from "react-multi-form";
import SuccessMessage from "../components/successMessage";
import Swal from "sweetalert2";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const [password, setPassword] = useState({ password: "", retype: "" });
  const [step, setStep] = useState(1);
  const [isMatch, setIsMatch] = useState(true);
  const { role } = useParams();
  const query = useQuery();
  const token = query.get("token");

  function handleChangePassword(e) {
    setPassword({ ...password, password: e.target.value });
  }
  function handleChangeRetype(e) {
    setPassword({ ...password, retype: e.target.value });
  }

  function changepass(e) {
    e.preventDefault();
    let baseUrl = "";
    if (role === "student") {
      baseUrl = "/student/resetpassword";
    } else if (role === "staff") {
      baseUrl = "/staff/resetpassword";
    }

    if (
      password.password === password.retype &&
      password.password &&
      password.retype
    ) {
      setIsMatch(true);
      axios({
        method: "PATCH",
        url: `auth${baseUrl}?token=${token}`,
        data: {
          password: password.password,
        },
      })
        .then(() => {
          setStep(step + 1);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response) {
            Swal.fire("Error!", err.response.data.errors.join(), "error");
          } else {
            Swal.fire("Error!", err, "error");
          }
        });
    } else {
      setIsMatch(false);
    }
  }

  return (
    <div className="p-3 lg:p-10 bg-cover bg-center bg-no-repeat bg-gray-200 min-h-screen">
      <div>
        <h1 className="text-center font-semibold text-3xl mb-5">
          Reset Your Password
        </h1>
        <div className="lg:w-2/3 mx-auto px-8 lg:px-20 py-7 bg-white rounded-lg shadow-md">
          <MultiStepForm activeStep={step}>
            <Step label="Set Password">
              <div>
                {!isMatch && (
                  <div className="bg-red-200 text-red-600 font-bold px-3 py-2 rounded-md">
                    <p>Password Not Match</p>
                  </div>
                )}
                <SetPassword
                  password={password}
                  changePassword={handleChangePassword}
                  retypePass={handleChangeRetype}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg my-4 w-1/2 block mx-auto"
                  onClick={changepass}
                >
                  Reset Password
                </button>
              </div>
            </Step>
            <Step label="Success">
              <SuccessMessage page="reset" />
            </Step>
          </MultiStepForm>
        </div>
      </div>
    </div>
  );
}
