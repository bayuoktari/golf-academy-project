import React from "react";

export default function RowScore({ number, label, knowScore, skillScore }) {
  function getScore(score) {
    if (score >= 85 && score <= 100) {
      return "A";
    } else if (score >= 66 && score < 85) {
      return "B";
    } else if (score >= 46 && score <= 65) {
      return "C";
    } else if (score > 0 && score <= 45) {
      return "D";
    } else {
      return "";
    }
  }

  return (
    <tr>
      <td className="border-black border text-center font-bold">
        {number || ""}
      </td>
      <td className="border-black border pl-3 h-10">{label}</td>
      <td className="border-black border text-center font-bold h-10">
        {knowScore}
      </td>
      <td className="border-black border text-center font-bold h-10">
        {getScore(knowScore)}
      </td>
      <td className="border-black border text-center font-bold h-10"></td>
      <td className="border-black border text-center font-bold h-10">
        {skillScore}
      </td>
      <td className="border-black border text-center font-bold h-10">
        {getScore(skillScore)}
      </td>
      <td className="border-black border text-center font-bold h-10"></td>
    </tr>
  );
}
