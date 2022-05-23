import React from "react";
import FormAddStaff from "../components/FormAddStaff";

export default function addStaff(props) {
  return (
    <div className="w-full flex-grow p-6">
      <FormAddStaff page={props.page} />
    </div>
  );
}
