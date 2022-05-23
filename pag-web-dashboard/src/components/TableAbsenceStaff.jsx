import React from "react";
import ColTable from "./ColTable";
import RowStaffAbsence from "./RowStaffAbsence";

export default function TableAbsence(props) {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <ColTable title="Staff Name" />
          <ColTable title="Date" />
          <ColTable title="Check In" />
          <ColTable title="Check Out" />
          <ColTable title="Actions" />
        </tr>
      </thead>
      <tbody>
        {!props.report ? (
          <tr>
            <td></td>
          </tr>
        ) : (
          props.report
            .filter((val) => {
              if (!props.search) {
                return val;
              } else if (
                val.Staff.fullname
                  .toLowerCase()
                  .includes(props.search.toLowerCase())
              ) {
                return val;
              } else {
                return null;
              }
            })
            .map((report) => (
              <RowStaffAbsence report={report} key={report.id} />
            ))
        )}
      </tbody>
    </table>
  );
}
