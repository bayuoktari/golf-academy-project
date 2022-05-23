import React, { useRef } from "react";
import useState from "react-usestateref";
import RegisterForm from "../components/registerForm";
import FormParent from "../components/parentForm";
import SuccessMessage from "../components/successMessage";
import UploadFrom from "../components/uploadTransfer";
import axios from "../config/axios";
import Swal from "sweetalert2";
import { MultiStepForm, Step } from "react-multi-form";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const studentForm = useRef(null);
  const parentForm = useRef(null);
  const [studentInfo, setStudentInfo, studentInfoRef] = useState({});
  const [parentInfo, setParentInfo, parentInfoRef] = useState({});
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedSubdis, setSelectSubdis] = useState(0);
  const [imgFile, setImgFile] = useState("");
  const [profPict, setProfPict] = useState("");

  const dummyprofpict =
    "https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png";

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  function checkFormInput(data) {
    let isEmpty = false;
    for (var key in data) {
      if (key === "additionalInfo") {
        console.log("masook");
        if (!data.additionalInfo) {
          isEmpty = true;
          break;
        }
      }
      if (!data[key]) {
        isEmpty = false;
        break;
      } else {
        isEmpty = true;
      }
    }
    if (isEmpty) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmitStudent() {
    // console.log(studentForm.current.city);
    setStudentInfo({
      fullname: studentForm.current.fullname.value,
      email: studentForm.current.email.value,
      phone: studentForm.current.phone.value,
      education: studentForm.current.education.value,
      address: studentForm.current.address.value,
      // classType: studentForm.current.classType.value,
      birthDate: studentForm.current.dateOfBirth.value,
      additionalInfo: studentForm.current.additionalInfo.value,
      gender: studentForm.current.gender.value,
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
      subdistrict: selectedSubdis,
    });
  }

  function handleSubmitParent() {
    setParentInfo({
      parentFullname: parentForm.current.parentFullname.value,
      parentEmail: parentForm.current.parentEmail.value,
      parentPhone: parentForm.current.parentPhone.value,
      parentJob: parentForm.current.job.value,
    });
  }

  function handleRegister() {
    if (!imgFile) {
      Toast.fire({
        icon: "error",
        title: "Please Upload Payment Proof to Register",
      });
    } else {
      setLoading(true);
      const allForm = new FormData();

      allForm.append("transferProof", imgFile);
      allForm.append("profilePict", profPict);
      for (let props in studentInfo) {
        allForm.append(props, studentInfo[props]);
      }
      for (let props in parentInfo) {
        allForm.append(props, parentInfo[props]);
      }

      axios({
        method: "POST",
        url: "student/register",
        headers: {
          ["Access-Control-Allow-Origin"]: "*",
        },
        data: allForm,
      })
        .then((data) => {
          setLoading(false);
          setStep(step + 1);
        })
        .catch((err) => {
          setLoading(false);
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
  }

  return (
    <div className="p-3 lg:p-10 bg-cover bg-center bg-no-repeat bg-gray-200 min-h-screen">
      {loading ? (
        <div className="bg-black fixed h-full w-screen right-0 top-0 bg-opacity-50 z-50 flex justify-center items-center">
          <Loader type="Circles" color="#fff" height={80} width={80} />
        </div>
      ) : (
        ""
      )}
      <div>
        <h1 className="text-center font-semibold text-3xl mb-5">
          PAGI Registration Form
        </h1>
        <div className="lg:w-2/3 mx-auto px-8 lg:px-20 py-7 bg-white rounded-lg shadow-md">
          <MultiStepForm activeStep={step}>
            <Step label="Student Info">
              <div className="p-3 lg:p-2 bg-cover bg-center bg-no-repeat">
                <form ref={studentForm}>
                  <RegisterForm
                    formprovince={setSelectedProvince}
                    formcity={setSelectedCity}
                    formdistrict={setSelectedDistrict}
                    formsubdistrict={setSelectSubdis}
                    formProfPict={setProfPict}
                  />
                  <div className="flex justify-end w-full">
                    <button
                      className="btn bg-green-400 px-4 py-2 rounded text-white mt-5"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmitStudent();
                        const checkStudent = checkFormInput(
                          studentInfoRef.current
                        );

                        if (checkStudent) {
                          if (profPict && profPict !== dummyprofpict) {
                            setStep(step + 1);
                          } else {
                            Toast.fire({
                              icon: "error",
                              title: "All inputs must be filled ",
                            });
                          }
                        } else {
                          Toast.fire({
                            icon: "error",
                            title: "All inputs must be filled ",
                          });
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </Step>
            <Step label="Parent Info">
              <form ref={parentForm}>
                <FormParent />
              </form>
              <div className="flex justify-between w-full">
                <button
                  className="btn bg-green-400 px-4 py-2 rounded text-white mt-5"
                  onClick={() => setStep(step - 1)}
                >
                  Prev
                </button>
                <button
                  className="btn bg-green-400 px-4 py-2 rounded text-white mt-5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitParent();
                    const checkParent = checkFormInput(parentInfoRef.current);

                    if (checkParent) {
                      setStep(step + 1);
                    } else {
                      Toast.fire({
                        icon: "error",
                        title: "All inputs must be filled ",
                      });
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </Step>
            <Step label="Payment Proof">
              <UploadFrom file={setImgFile} />
              <div className="flex justify-between w-full">
                <button
                  className="btn bg-green-400 px-4 py-2 rounded text-white mt-5"
                  onClick={() => setStep(step - 1)}
                >
                  Prev
                </button>
                <button
                  className="btn bg-green-400 px-4 py-2 rounded text-white mt-5"
                  onClick={() => {
                    // setStep(step + 1);
                    handleRegister();
                  }}
                >
                  Register
                </button>
              </div>
            </Step>
            <Step label="Done">
              <SuccessMessage />
            </Step>
          </MultiStepForm>
        </div>
      </div>
    </div>
  );
}
