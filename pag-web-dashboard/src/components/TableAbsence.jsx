import React from "react";
import RowAbsence from "./RowAbsence";
import ColTable from "./ColTable";

export default function TableAbsence(props) {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <ColTable title="Student Name" />
          <ColTable title="Date" />
          <ColTable title="Check In" />
          <ColTable title="Check Out" />
          <ColTable title="Actions" />
        </tr>
      </thead>
      <tbody>
        {!props.listReport ? (
          <tr>
            <td></td>
          </tr>
        ) : (
          props.listReport
            .filter((val) => {
              if (!props.search) {
                return val;
              } else if (
                val.Student.fullname
                  .toLowerCase()
                  .includes(props.search.toLowerCase())
              ) {
                return val;
              } else {
                return null;
              }
            })
            .map((report) => <RowAbsence report={report} key={report.id} />)
        )}
      </tbody>
    </table>
  );
}
