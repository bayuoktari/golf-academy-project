import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import RowScore from "../components/RowSocre";
import axios from "../config/axios";
import Swal from "sweetalert2";
import RadarChart from "../components/RadarChart";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Report() {
  const [allscore, setAllScore] = useState();
  const [tab, setTab] = useState(1);
  const history = useHistory();
  let query = useQuery();
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "POST",
      url: "student/score/" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        period: query.get("period"),
        year: query.get("year"),
      },
    })
      .then(({ data }) => {
        setAllScore(data.newScore);
      })
      .catch((err) => {
        history.goBack();
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
  }, []);

  // console.log(allscore);
  return (
    <div className="w-full flex-grow p-5">
      <p
        className="text-2xl mb-6 hover:text-green-600 cursor-pointer w-max"
        onClick={() => history.goBack()}
      >
        <i className="fas fa-arrow-circle-left"></i> Back
      </p>
      {!allscore ? null : (
        <div>
          <ul className="flex justify-center items-center my-4">
            <li
              className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
                tab === 1 ? "text-green-500 border-green-500" : ""
              } hover:curosor-pointer`}
              onClick={() => setTab(1)}
            >
              Table Score
            </li>
            <li
              className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
                tab === 2 ? "text-green-500 border-green-500" : ""
              } hover:curosor-pointer`}
              onClick={() => setTab(2)}
            >
              Data Chart
            </li>
          </ul>
          {tab === 1 ? (
            <div>
              <p>
                Nama : <strong>{allscore.Student.fullname}</strong>
              </p>
              <p className="my-4">
                Periode :{" "}
                <strong>{`${query.get("period")} ${query.get("year")}`}</strong>
              </p>

              <table className="table-fixed border border-black w-full">
                <tbody>
                  <tr>
                    <td
                      rowSpan={2}
                      className="border-black border w-10 font-bold text-center bg-yellow-100"
                    >
                      No
                    </td>
                    <td
                      rowSpan={2}
                      className="border-black border w-4/12 text-center font-bold bg-yellow-100"
                    >
                      Mata Pelajaran
                    </td>
                    <td
                      colSpan={3}
                      className="border-black border text-center font-bold bg-yellow-100"
                    >
                      Pengetahuan
                    </td>
                    <td
                      colSpan={3}
                      className="border-black border text-center font-bold bg-yellow-100"
                    >
                      Kemampuan
                    </td>
                  </tr>
                  <tr>
                    <td className="border-black border text-center font-bold bg-yellow-100">
                      Angka
                    </td>
                    <td className="border-black border text-center font-bold bg-yellow-100">
                      Predikat
                    </td>
                    <td className="border-black border text-center font-bold bg-yellow-100">
                      Deskripsi
                    </td>
                    <td className="border-black border text-center font-bold bg-yellow-100">
                      Angka
                    </td>
                    <td className="border-black border text-center font-bold bg-yellow-100">
                      Predikat
                    </td>
                    <td className="border-black border text-center font-bold bg-yellow-100">
                      Deskripsi
                    </td>
                  </tr>
                  <RowScore
                    number="I"
                    label="Golf Attitude"
                    knowScore={allscore.knowGolfAttitude}
                    skillScore={allscore.skillGolfAttitude}
                  />
                  <RowScore
                    number="II"
                    label="Golf Rules"
                    knowScore={allscore.knowGolfRules}
                    skillScore={allscore.skillGolfRules}
                  />
                  <RowScore number="III" label="Golf Technique" />
                  <RowScore
                    label="a. Accuracy"
                    knowScore={allscore.knowAccuracy}
                    skillScore={allscore.skillAccuracy}
                  />
                  <RowScore
                    label="b. Driver"
                    knowScore={allscore.knowDriver}
                    skillScore={allscore.skillDriver}
                  />
                  <RowScore
                    label="c. Iron"
                    knowScore={allscore.knowIron}
                    skillScore={allscore.skillIron}
                  />
                  <RowScore
                    label="d. Chip"
                    knowScore={allscore.knowChip}
                    skillScore={allscore.skillChip}
                  />
                  <RowScore
                    label="e. Putt"
                    knowScore={allscore.knowPutt}
                    skillScore={allscore.skillPutt}
                  />
                  <RowScore
                    label="f. Up/Down"
                    knowScore={allscore.knowUpdown}
                    skillScore={allscore.skillUpdown}
                  />
                  <RowScore
                    label="g. Bunker"
                    knowScore={allscore.knowBunker}
                    skillScore={allscore.skillBunker}
                  />
                  <RowScore
                    label="h. Impact Ball"
                    knowScore={allscore.knowInpactBall}
                    skillScore={allscore.skillInpactBall}
                  />
                  <RowScore
                    label="h. Face Off Play"
                    knowScore={allscore.knowFaceOffPlay}
                    skillScore={allscore.skillFaceOffPlay}
                  />
                  <tr>
                    <td className="border-black border text-center font-bold">
                      IV
                    </td>
                    <td className="border-black border pl-3 h-10">
                      Course Maintenance
                    </td>
                    <td
                      className="border-black border pl-3 h-10 font-bold"
                      colSpan={6}
                    >
                      {allscore.courseMaintenance}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <RadarChart dataScore={allscore} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
