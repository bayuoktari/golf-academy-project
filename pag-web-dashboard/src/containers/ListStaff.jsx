import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ReactToolTip from "react-tooltip";
// import TableStaff from "../components/TableStaff";
import { fetchStaff, deleteStaff } from "../store/actions/staff";

export default function ListStaff() {
  // const [searchInput, setSearchInput] = useState("");

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
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: "phone",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div>
            <Link to={`/dashboard/staff/${row.id}`}>
              <i
                className="fas fa-eye text-blue-500 cursor-pointer mr-4 text-lg"
                data-tip
                data-for="edit"
              ></i>
              <ReactToolTip id="edit" type="info">
                <span>Detail Staff</span>
              </ReactToolTip>
            </Link>
            <i
              className="fas fa-user-times text-red-600 cursor-pointer text-lg"
              data-tip
              data-for="delete"
              onClick={() => {
                handleDelete(row);
              }}
            ></i>
            <ReactToolTip id="delete" type="error">
              Delete Staff
            </ReactToolTip>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const listStaff = useSelector((state) => state.staff.staffList);
  const [staffData, setStaffData] = useState();

  function handleDelete(data) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Swal.fire({
      title: `Are you sure want to delete ${data.fullname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStaff(data.id))
          .then(() => {
            dispatch(fetchStaff());
            Toast.fire({
              icon: "success",
              title: "Delete Success",
            });
          })
          .catch(() => {
            Toast.fire({
              icon: "error",
              title: "Something When Wrong",
            });
          });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  useEffect(() => {
    setStaffData(listStaff);
  }, [listStaff]);

  function handleSearch(e) {
    const searchInput = e.target.value;
    const filteredStaff = listStaff.filter((val) => {
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
    setStaffData(filteredStaff);
  }
  return (
    <div className="w-full flex-grow p-5">
      <div className="w-full flex justify-between">
        <p className="text-xl pb-3 flex items-center">
          <i className="fas fa-list mr-3"></i> List All Staff
        </p>
        <Link
          to="/dashboard/addstaff"
          className="mb-3 bg-yellow-500 px-3 py-2 text-white font-bold rounded-md hover:bg-yellow-600 text-sm"
        >
          <span className="fas fa-plus-circle"></span> Add New Staff
        </Link>
      </div>
      <div className="bg-white overflow-auto">
        {/* <TableStaff search={searchInput} /> */}
        <DataTable
          noHeader
          columns={columns}
          defaultSortField="fullname"
          data={staffData}
          pagination
          highlightOnHover
          subHeader
          responsive
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
        />
      </div>
    </div>
  );
}
