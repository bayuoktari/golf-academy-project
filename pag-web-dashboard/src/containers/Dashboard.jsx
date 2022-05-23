import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import HomeDashboard from "../containers/HomeDashboard";
import ListUser from "./ListStudent";
import AbsenceReport from "./AbsenceReport";
import AddStaff from "./AddStaff";
import ListStaff from "./ListStaff";
import DetailStudent from "./DetailStudent";
import StaffAbsence from "./StaffAbsence";
import DetailAbsence from "./DetailAbsence";
import Report from "./Report";

export default function Dashboard() {
  const { path } = useRouteMatch();
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <DashboardHeader />
        <div className="w-full flex flex-col h-screen overflow-y-scroll">
          <Switch>
            <Route exact path={path}>
              <HomeDashboard />
            </Route>
            <Route exact path={`${path}/student`}>
              <ListUser />
            </Route>
            <Route exact path={`${path}/staff`}>
              <ListStaff />
            </Route>
            <Route exact path={`${path}/student/attendance`}>
              <AbsenceReport />
            </Route>
            <Route exact path={`${path}/staff/attendance`}>
              <StaffAbsence />
            </Route>
            <Route path={`${path}/student/report/:id`}>
              <Report />
            </Route>
            <Route path={`${path}/staff/attendance/:id`}>
              <DetailAbsence page="Staff" />
            </Route>
            <Route path={`${path}/student/attendance/:id`}>
              <DetailAbsence page="Student" />
            </Route>
            <Route path={`${path}/student/:id`}>
              <DetailStudent />
            </Route>
            <Route path={`${path}/staff/:id`}>
              <AddStaff page="detail" />
            </Route>
            <Route path={`${path}/addstaff`}>
              <AddStaff />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
