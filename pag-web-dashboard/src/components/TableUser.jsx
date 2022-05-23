import React from "react";
import RowTableUser from "./RowTableUser";
import ColTable from "../components/ColTable";

export default function TableUser(props) {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <ColTable title="Name" />
          <ColTable title="Email" />
          <ColTable title="Education" />
          <ColTable title="Phone Number" />
          <ColTable title="Status" />
          <ColTable title="Actions" />
        </tr>
      </thead>
      <tbody>
        {props.listStudent
          // .filter((val) => {
          //   if (!props.search) {
          //     return val;
          //   } else if (
          //     val.fullname.toLowerCase().includes(props.search.toLowerCase())
          //   ) {
          //     return val;
          //   } else {
          //     return null;
          //   }
          // })
          .map((student) => (
            <RowTableUser student={student} key={student.id} />
          ))}
      </tbody>
    </table>
  );
}
