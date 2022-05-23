import React from "react";
import { Radar } from "react-chartjs-2";

export default function RadarChart({ dataScore }) {
  const data = {
    labels: [
      "Golf Attitude",
      "Golf Rules",
      "Accuracy",
      "Driver",
      "Iron",
      "Chip",
      "Putt",
      "Up / Down",
      "Bunker",
      "Impact Ball",
      "Face Off Play",
    ],
    datasets: [
      {
        label: "Pengetahuan",
        data: [
          dataScore.knowGolfAttitude,
          dataScore.knowGolfRules,
          dataScore.knowAccuracy,
          dataScore.knowDriver,
          dataScore.knowIron,
          dataScore.knowChip,
          dataScore.knowPutt,
          dataScore.knowUpdown,
          dataScore.knowBunker,
          dataScore.knowInpactBall,
          dataScore.knowFaceOffPlay,
        ],
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Kemampuan",
        data: [
          dataScore.skillGolfAttitude,
          dataScore.skillGolfRules,
          dataScore.skillAccuracy,
          dataScore.skillDriver,
          dataScore.skillIron,
          dataScore.skillChip,
          dataScore.skillPutt,
          dataScore.skillUpdown,
          dataScore.skillBunker,
          dataScore.skillInpactBall,
          dataScore.skillFaceOffPlay,
        ],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(5, 150, 105)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };
  return (
    <div className="mt-8">
      <h1 className="font-bold text-center text-3xl mb-5">Radar Chart</h1>
      <div className="w-3/4 block mx-auto">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
