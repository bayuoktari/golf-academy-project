import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getMonth } from "../helpers/monthHelper";
import { getAvgScore } from "../store/actions/student";
import ScoreBar from "../components/ScoreBar";

export default function ChartScore() {
  const [inputPeriod, setInputPeriod] = useState(new Date().getMonth() + 1);
  const [inputYear, setInputYear] = useState(new Date().getFullYear());
  const [isNoData, setIsNoData] = useState(false);
  const [score, setScore] = useState({});
  const dispatch = useDispatch();
  function handleChangeMonth(e) {
    setInputPeriod(e.target.value);
  }
  function handleChangeYear(e) {
    setInputYear(e.target.value);
  }

  function renderMonth() {
    let option = [];
    for (let i = 0; i <= 12; i++) {
      if (i === 0) {
        option.push(
          <option value="none" disabled hidden key={0}>
            Select Month
          </option>
        );
      } else {
        option.push(
          <option value={getMonth(i)} key={i}>
            {getMonth(i)}
          </option>
        );
      }
    }
    return option;
  }
  function renderYear() {
    let option = [];
    for (
      let i = new Date().getFullYear() - 3;
      i <= new Date().getFullYear();
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

  useEffect(() => {
    if (typeof inputPeriod === "number") {
      setInputPeriod(getMonth(inputPeriod - 1));
    }
    dispatch(getAvgScore(inputPeriod, inputYear)).then(({ data }) => {
      // console.log(data);
      if (data.scores === "No Data") {
        setIsNoData(true);
      } else {
        setIsNoData(false);

        setScore(data.scores);
      }
    });
  }, [inputPeriod, inputYear]);

  return (
    <div className="bg-white rounded shadow-lg mb-4 w-4/5 p-3">
      <h1 className="font-bold text-center">Students Average Score</h1>
      <div className="flex justify-center w-full">
        <select
          name="month"
          className="px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-5 mb-3 mr-1"
          defaultValue={getMonth(new Date().getMonth() - 1 + 1)}
          onChange={handleChangeMonth}
        >
          <option value="Semester 1">Semester 1</option>,
          <option value="Semester 2">Semester 2</option>
          {renderMonth()}
        </select>

        <select
          name="year"
          className="px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-5 mb-3 mr-2"
          defaultValue={new Date().getFullYear()}
          onChange={handleChangeYear}
        >
          {renderYear()}
        </select>
      </div>
      {isNoData ? (
        <h2 className="text-gray-700 text-center text-3xl my-5 font-bold">
          No Data
        </h2>
      ) : (
        <div className="flex overflow-x-scroll">
          <div className="flex flex-nowrap">
            <ScoreBar
              label="Golf Attitude"
              scoreKnow={score.knowGolfAttitude}
              scoreSkill={score.skillGolfAttitude}
            />
            <ScoreBar
              label="Golf Rules"
              scoreKnow={score.knowGolfRules}
              scoreSkill={score.skillGolfRules}
            />
            <ScoreBar
              label="Accuracy"
              scoreKnow={score.knowAccuracy}
              scoreSkill={score.skillAccuracy}
            />
            <ScoreBar
              label="Driver"
              scoreKnow={score.knowDriver}
              scoreSkill={score.skillDriver}
            />
            <ScoreBar
              label="Iron"
              scoreKnow={score.knowIron}
              scoreSkill={score.skillIron}
            />
            <ScoreBar
              label="Chip"
              scoreKnow={score.knowChip}
              scoreSkill={score.skillChip}
            />
            <ScoreBar
              label="Putt"
              scoreKnow={score.knowPutt}
              scoreSkill={score.skillPutt}
            />
            <ScoreBar
              label="Up & Down"
              scoreKnow={score.knowUpdown}
              scoreSkill={score.skillUpdown}
            />
            <ScoreBar
              label="Bunker"
              scoreKnow={score.knowBunker}
              scoreSkill={score.skillBunker}
            />
            <ScoreBar
              label="Impact Ball"
              scoreKnow={score.knowInpactBall}
              scoreSkill={score.skillInpactBall}
            />
            <ScoreBar
              label="Face Off Play"
              scoreKnow={score.knowFaceOffPlay}
              scoreSkill={score.skillFaceOffPlay}
            />
          </div>
        </div>
      )}
    </div>
  );
}
