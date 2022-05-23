import React, { useEffect, useState } from "react";
// import TableAbsence from "../components/TableAbsence";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { getAttendanceReport } from "../store/actions/student";
import { getMonth } from "../helpers/monthHelper";
import { secondsToHMS, hmsToSeconds } from "../helpers/duration";

export default function AbsenceReport() {
  const listReport = useSelector((state) => state.student.absenceReport);
  const [filterReport, setFilterReport] = useState();
  const [inputMonth, setInputMonth] = useState(new Date().getMonth() + 1);
  const [inputYear, setInputYear] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  let colTable = [
    {
      name: "Student Name",
      selector: "Student.fullname",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Check In Time",
      selector: "checkInTime",
      sortable: true,
    },
    {
      name: "Check Out Time",
      selector: "checkOutTime",
      sortable: true,
    },
    {
      name: "Total Duration",
      sortable: true,
      cell: (row) => {
        if (row.checkInTime && row.checkOutTime) {
          return (
            <p>
              {secondsToHMS(
                hmsToSeconds(row.checkOutTime) - hmsToSeconds(row.checkInTime)
              )}
            </p>
          );
        } else {
          return <p>--:--:--</p>;
        }
      },
    },
    {
      name: "Action",
      sortable: false,
      cell: (row) => {
        return (
          <Link
            to={`/dashboard/student/attendance/${row.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-5 rounded-lg"
          >
            Show Detail
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAttendanceReport());
  }, [dispatch]);

  useEffect(() => {
    setFilterReport(listReport);
  }, [listReport]);

  function handleSearch(e) {
    const searchInput = e.target.value;
    const filteredReport = listReport.filter((val) => {
      // console.log(listStudent);
      if (!searchInput) {
        return val;
      } else if (
        val.Student.fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return val;
      } else {
        return false;
      }
    });
    setFilterReport(filteredReport);
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
          <option value={i} key={i}>
            {getMonth(i)}
          </option>
        );
      }
    }
    return option;
  }
  function handleChangeMonth(e) {
    setInputMonth(e.target.value);
  }
  function handleChangeYear(e) {
    setInputYear(e.target.value);
  }
  function handleButtonFilter(e) {
    if (!inputMonth && !inputYear) {
      dispatch(getAttendanceReport());
    } else {
      dispatch(getAttendanceReport({ month: inputMonth, year: inputYear }));
    }
  }
  function renderYear() {
    let option = [];
    for (
      let i = new Date().getFullYear();
      i >= new Date().getFullYear() - 5;
      i--
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
  return (
    <div className="w-full flex-grow p-6">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-calendar mr-3"></i> Monthly Student Attendance
        Report
      </p>
      <div className="bg-white overflow-auto">
        <DataTable
          noHeader
          defaultSortField="date"
          defaultSortAsc={false}
          columns={colTable}
          data={filterReport}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <div className="w-full flex justify-between">
              <input
                type="text"
                name="name"
                className="w-1/4 px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-5 mb-3"
                autoComplete="off"
                placeholder="Search by Student Name"
                onChange={handleSearch}
              />
              <div>
                <select
                  name="month"
                  className="px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-5 mb-3 mr-1"
                  defaultValue="none"
                  onChange={handleChangeMonth}
                >
                  {renderMonth()}
                </select>

                <select
                  name="year"
                  className="px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-5 mb-3 mr-2"
                  defaultValue="none"
                  onChange={handleChangeYear}
                >
                  {renderYear()}
                </select>
                <button
                  className="px-8 py-1 rounded-md bg-green-400 hover:bg-green-500 text-white"
                  onClick={handleButtonFilter}
                >
                  Filter
                </button>
              </div>
            </div>
          }
          responsive
        />
        {/* <TableAbsence listReport={listReport} search={searchInput} /> */}
      </div>
    </div>
  );
}
