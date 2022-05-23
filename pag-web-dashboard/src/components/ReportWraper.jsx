import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMonth } from "../helpers/monthHelper";
import axios from "../config/axios";
import Swal from "sweetalert2";

export default function ReportWrapper() {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [typePeriod, setTypePeriod] = useState("");
  const { id } = useParams();

  function handleDownload() {
    console.log(selectedPeriod);
    axios({
      url: `student/monthlyreport?period=${selectedPeriod}&year=${selectedYear}&studentId=${id}`,
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      responseType: "arraybuffer",
    })
      .then((response) => {
        let blob = new Blob([response.data], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Report-${selectedPeriod}-${selectedYear}.pdf`;
        link.click();
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: err.response.statusText,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: err,
          });
        }
      });
  }

  function renderYear() {
    let option = [];
    for (
      let i = new Date().getFullYear() - 4;
      i <= new Date().getFullYear() + 4;
      i++
    ) {
      if (i === new Date().getFullYear()) {
        option.push(
          <option value="none" disabled hidden key={0}>
            Select Year
          </option>
        );
      }
      option.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return option;
  }

  function renderMonth() {
    let options = [];
    for (let i = 1; i <= 12; i++) {
      options.push(
        <option value={getMonth(i)} key={i}>
          {getMonth(i)}
        </option>
      );
    }
    return options;
  }
  return (
    <div>
      <p className="text-xl pb-6 flex items-center">
        <i className="fas fa-info-circle mr-3"></i> Monthly Report
      </p>
      <div className="leading-loose">
        <div className="p-5 bg-white rounded shadow-xl ">
          <p className="text-center font-bold mb-4">Select Report Periode</p>
          <div className="flex justify-center flex-wrap">
            <div className="relative inline-block w-5/12 text-gray-600 mr-4 mb-3">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="reportType"
                defaultValue={"none"}
                onChange={(e) => setTypePeriod(e.target.value)}
              >
                <option value="none" disabled hidden>
                  --- Select Type ---
                </option>
                <option value="Monthly">Monthly</option>
                <option value="Semester">Semester</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
            <div className="relative inline-block w-5/12 text-gray-600 mr-4 mb-3">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="period"
                defaultValue={"none"}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="none" disabled hidden>
                  --- Select Period ---
                </option>
                {typePeriod === "Semester" ? (
                  <>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                  </>
                ) : (
                  typePeriod === "Monthly" && <>{renderMonth()}</>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
            <div className="relative inline-block w-3/4 text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                name="year"
                defaultValue={"none"}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="none" disabled hidden>
                  --- Select Year ---
                </option>
                {renderYear()}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <Link
            to={`/dashboard/student/report/${id}?period=${selectedPeriod}&year=${selectedYear}`}
          >
            <button className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white w-full rounded mt-3">
              Show Report
            </button>
          </Link>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-white w-full rounded mt-2"
            onClick={handleDownload}
          >
            <i className="fas fa-download"></i> Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
