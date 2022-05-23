import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChartClass from "../components/ChartClass";
import ChartAge from "../components/ChartAge";
import ChartAbsence from "../components/ChartAbsence";
import ChartScore from "../components/ChartScore";
import TotalWrapper from "../components/TotalWrapper";
import { getTotalStudentandFilter } from "../store/actions/student";

export default function HomeDashboard() {
  const dispatch = useDispatch();
  const [totalByClassType, setTotalByClassType] = useState({});
  const [totalByAgeCategory, setTotalByAgeCategory] = useState({});

  useEffect(() => {
    dispatch(getTotalStudentandFilter())
      .then(({ data }) => {
        setTotalByAgeCategory(data.ageCategory);
        setTotalByClassType(data.class);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="w-full px-3 pt-3 flex">
        <ChartClass data={totalByClassType} />
        <ChartAge data={totalByAgeCategory} />
        <ChartAbsence />
      </div>
      <div className="w-full px-3 flex">
        <ChartScore />
        <TotalWrapper />
      </div>
    </div>
  );
}
