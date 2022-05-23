import React from "react";
import { useHistory } from "react-router-dom";
import FormStudent from "../components/FormStudent";
import ReportWrapper from "../components/ReportWraper";
import FormParent from "../components/FormParent";
import TransferImg from "../components/TransferProof";

export default function DetailStudent() {
  const history = useHistory();
  return (
    <div className="w-full flex-grow p-6">
      <p
        className="text-2xl mb-6 hover:text-green-600 cursor-pointer w-max"
        onClick={() => history.goBack()}
      >
        <i className="fas fa-arrow-circle-left"></i> Back
      </p>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/5 my-1 pr-0 lg:pr-2">
          <FormStudent />
          <FormParent />
        </div>
        <div className="w-full lg:w-2/5 my-1 pr-0 lg:pr-2">
          <TransferImg />
          <ReportWrapper />
        </div>
      </div>
    </div>
  );
}
