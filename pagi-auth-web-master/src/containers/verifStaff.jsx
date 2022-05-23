import React, { useState } from "react";
import axios from "../config/axios";
import { useLocation, Redirect } from "react-router-dom";
import { MultiStepForm, Step } from "react-multi-form";
import FormPassword from "../components/setPassword";
import SuccessMessage from "../components/successMessage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function VerifStaff() {
  const query = useQuery();
  const token = query.get("token");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState({ password: "", retype: "" });
  const [isMatch, setIsMatch] = useState(true);

  function handleChangePassword(e) {
    setPassword({ ...password, password: e.target.value });
  }
  function handleChangeRetype(e) {
    setPassword({ ...password, retype: e.target.value });
  }
  function submitPassword() {
    if (password.password !== password.retype) {
      setIsMatch(false);
    } else {
      setIsMatch(true);
      axios({
        method: "POST",
        url: "/auth/staff/verify",
        data: {
          password: password.password,
          token,
        },
      })
        .then(() => {
          setStep(2);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="bg-gray-200 h-screen p-3">
      <h1 className="text-center font-semibold text-3xl mb-5">
        Verify Your Account
      </h1>
      {token ? (
        <div className="w-1/2 mx-auto px-10 py-7 bg-white rounded-lg shadow-md">
          <MultiStepForm activeStep={step}>
            <Step label="Password">
              <div>
                {!isMatch ? (
                  <div className="bg-red-200 text-red-600 font-bold px-3 py-2 rounded-md">
                    <p>Password Not Match</p>
                  </div>
                ) : (
                  ""
                )}
                <FormPassword
                  password={password}
                  changePassword={handleChangePassword}
                  retypePass={handleChangeRetype}
                />
                <button
                  className="btn bg-green-400 px-4 py-2 rounded text-white mt-5 mx-auto block"
                  onClick={submitPassword}
                >
                  Create New Password
                </button>
              </div>
            </Step>
            <Step label="Confirm">
              <SuccessMessage page="verify" />
            </Step>
          </MultiStepForm>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}
