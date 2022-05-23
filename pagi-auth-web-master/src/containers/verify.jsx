import React, { useState } from "react";
import axios from "../config/axios";
import { useLocation, Redirect } from "react-router-dom";
import { MultiStepForm, Step } from "react-multi-form";
import FormPassword from "../components/setPassword";
import SuccessMessage from "../components/successMessage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Verify() {
  const query = useQuery();
  const token = query.get("token");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState({ password: "", retype: "" });
  const [isMatch, setIsMatch] = useState(true);

  async function handleNextStep(e) {
    e.preventDefault();
    // console.log();
    if (step === 1) {
      if (password.password === password.retype) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }

      if (isMatch) {
        axios({
          method: "POST",
          url: `auth/student/verify?token=${token}`,
          data: {
            password: password.password,
          },
        })
          .then(() => {
            setStep(step + 1);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    } else if (step === 2) {
    }
  }

  function handleChangePassword(e) {
    setPassword({ ...password, password: e.target.value });
  }
  function handleChangeRetype(e) {
    setPassword({ ...password, retype: e.target.value });
  }

  // console.log(password);
  return (
    <div className="bg-gray-200 h-screen p-3">
      <h1 className="text-center font-semibold text-3xl mb-5">
        Verify Your Account
      </h1>
      {token ? (
        <div className="lg:w-1/2 mx-auto px-10 py-7 bg-white rounded-lg shadow-md">
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
                <div className="flex flex-row w-full justify-end">
                  <button
                    className="btn bg-green-400 px-4 py-2 rounded text-white mt-5 "
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
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
