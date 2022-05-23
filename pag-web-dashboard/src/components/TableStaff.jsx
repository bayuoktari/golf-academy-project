import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColTable from "../components/ColTable";
import RowTableStaff from "../components/RowTableStaff";
import { fetchStaff } from "../store/actions/staff";

export default function TableStaff(props) {
  const dispatch = useDispatch();
  const listStaff = useSelector((state) => state.staff.staffList);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <ColTable title="Fullname" />
          <ColTable title="Role" />
          <ColTable title="Email" />
          <ColTable title="Phone Number" />
          <ColTable title="Address" />
          <ColTable title="Actions" />
        </tr>
      </thead>
      <tbody>
        {listStaff
          .filter((val) => {
            if (!props.search) {
              return val;
            } else if (
              val.fullname.toLowerCase().includes(props.search.toLowerCase())
            ) {
              return val;
            } else {
              return null;
            }
          })
          .map((staff) => (
            <RowTableStaff staff={staff} key={staff.id} />
          ))}
      </tbody>
    </table>
  );
}
