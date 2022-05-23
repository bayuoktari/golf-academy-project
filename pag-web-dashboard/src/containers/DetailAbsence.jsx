import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStaffAbsenceById } from "../store/actions/staff";
import { getAbsenceById } from "../store/actions/student";
import AbsenceContainer from "../components/AbsenceContainer";
import Swal from "sweetalert2";

export default function DetailAbsence(props) {
  const dispatch = useDispatch();
  const [detailAbsence, setDetailAbsence] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (props.page === "Student") {
      dispatch(getAbsenceById(id))
        .then(({ data }) => {
          setDetailAbsence(data);
        })
        .catch((err) => {
          Swal.fire("Error!", err.response.data.errors.join(), "error");
        });
    } else if (props.page === "Staff") {
      dispatch(getStaffAbsenceById(id))
        .then(({ data }) => {
          setDetailAbsence(data);
        })
        .catch((err) => {
          Swal.fire("Error!", err.response.data.errors.join(), "error");
        });
    }
  }, [props, dispatch, id]);
  return (
    <div className="w-full flex-grow p-5">
      <div className="flex flex-wrap">
        <AbsenceContainer page="Check In" detail={detailAbsence} />
        {detailAbsence.checkOutTime ? (
          <AbsenceContainer page="Check Out" detail={detailAbsence} />
        ) : null}
      </div>
    </div>
  );
}
