import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "../config/axios";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: true,
      backgroundColor: "rgba(255, 99, 132,0.3)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

let options = {
  indexAxis: "x",
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 10,
      ticks: {
        precision: 0,
      },
    },
  },
};

export default function ChartAbsence() {
  const [dataAbsence, setDataAbsence] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: "/student/presence/chartpresence",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    }).then(({ data }) => {
      // console.log(data);
      setDataAbsence({
        labels: Object.keys(data.students),
        datasets: [
          {
            label: "Student Attendance",
            data: Object.values(data.students),
            fill: true,
            backgroundColor: "rgba(81, 219, 0,0.3)",
            borderColor: "rgba(77, 181, 16, 0.2)",
          },
          {
            label: "Staff Attendance",
            data: Object.values(data.staff),
            fill: true,
            backgroundColor: "rgba(245, 184, 17,0.4)",
            borderColor: "rgba(235, 151, 35, 0.2)",
          },
        ],
      });
    });
  }, []);
  return (
    <div className="bg-white rounded shadow-lg mb-4 w-1/2 p-2 mx-1">
      <h1 className="text-center mb-2 font-bold">Weekly Attendance</h1>
      <Line data={dataAbsence} options={options} />
    </div>
  );
}
