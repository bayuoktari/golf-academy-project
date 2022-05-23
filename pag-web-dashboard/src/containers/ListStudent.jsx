import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../components/LoadingComponent";
import { getStudentList } from "../store/actions/student";
import DataTable from "react-data-table-component";
import formatDate from "../helpers/formatDate";
import ActionTable from "../components/ActionTable";

export default function ListStudent() {
  const { loading, listStudent } = useSelector((state) => state.student);
  const [studentData, setStudentData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentList());
  }, [dispatch]);

  useEffect(() => {
    setStudentData(listStudent);
    listStudent.map((el) => {
      console.log(el);
      el.createdAt = formatDate(el.createdAt);
    });
  }, [listStudent]);

  function handleSearch(e) {
    const searchInput = e.target.value;
    const filteredStudent = listStudent.filter((val) => {
      // console.log(listStudent);
      if (!searchInput) {
        return val;
      } else if (
        val.fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return val;
      } else {
        return false;
      }
    });
    setStudentData(filteredStudent);
  }

  let columns = [
    {
      name: "Full Name",
      selector: "fullname",
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
      center: true,
      cell: (row) => {
        // console.log(row);
        if (row.gender === "male") {
          return <span className="fas fa-mars text-blue-600 text-2xl"></span>;
        } else if (row.gender === "female") {
          return <span className="fas fa-venus text-pink-500 text-2xl"></span>;
        }
      },
    },
    {
      name: "Class Type",
      selector: "classType",
      sortable: true,
      cell: (row) => {
        if (row.classType) {
          return <p>{row.classType}</p>;
        } else {
          return <p>Not Set</p>;
        }
      },
    },
    {
      name: "Age Category",
      selector: "ageCategory",
      sortable: true,
      cell: (row) => {
        if (row.ageCategory) {
          return <p>{row.ageCategory}</p>;
        } else {
          return <p>Not Set</p>;
        }
      },
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Status",
      selector: "confirmEmail",
      sortable: true,
      cell: (row) => {
        console.log(row.confirmEmail);
        return (
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className={`absolute inset-0 opacity-50 rounded-full ${
                row.confirmEmail ? "bg-green-200" : "bg-red-200"
              }`}
            ></span>
            <span className="relative">
              {row.confirmEmail ? "Confirm" : "Need Follow Up"}
            </span>
          </span>
        );
      },
    },
    {
      name: "Reg. Date",
      selector: "createdAt",
      sortable: true,
      // cell: (row) => {
      //   row.createdAt = formatDate(row.createdAt);
      //   return <span>{row.createdAt}</span>;
      // },
    },
    {
      name: "Actions",
      cell: (row) => {
        return <ActionTable {...row} />;
      },
    },
  ];

  return (
    <div className="w-full flex-grow p-6">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          <div className="w-full">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> List All Students
            </p>
            <DataTable
              noHeader
              columns={columns}
              defaultSortField="fullname"
              data={studentData}
              pagination
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  name="name"
                  className="w-1/4 px-3 py-2 text-gray-700 border border-gray-300 rounded mt-5 mb-3"
                  autoComplete="off"
                  placeholder="Search by Student Name"
                  onChange={handleSearch}
                />
              }
              responsive
            />
          </div>
        </div>
      )}
    </div>
  );
}
