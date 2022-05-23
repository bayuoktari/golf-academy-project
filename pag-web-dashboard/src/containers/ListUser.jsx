import React, { useEffect, useState } from "react";
import TableUser from "../components/TableUser";
import { useSelector, useDispatch } from "react-redux";
import { getStudentList } from "../store/actions/student";
import LoadingComponent from "../components/LoadingComponent";
import Pagination from "../components/Pagination";

const itemPerPage = 10;

export default function ListUser() {
  const { loading, listStudent } = useSelector((state) => state.student);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentData, setStudentData] = useState([]);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(0);
  const [keywordSearch, setKeywordSearch] = useState("");

  useEffect(() => {
    dispatch(getStudentList()).then(() => {
      setPageSize(Math.ceil(listStudent.length / itemPerPage));
    });
  }, [dispatch]);

  useEffect(() => {
    setPagination();
  }, [listStudent, currentPage]);

  function setPagination() {
    let allStudent = listStudent;
    if (keywordSearch) {
      allStudent = listStudent.filter((el) =>
        el.fullname.toLowerCase().includes(keywordSearch.toLowerCase())
      );
    }
    const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * itemPerPage;
    const endIndex =
      currentPage === 1 ? startIndex + itemPerPage : startIndex + itemPerPage;
    const slicedData = allStudent.slice(startIndex, endIndex);
    setStudentData(slicedData);
  }

  function changePage(page) {
    setCurrentPage(page);
  }

  function handleSearch(e) {
    setCurrentPage(1);
    const searchInput = e.target.value;
    setKeywordSearch(searchInput);
    const filteredStudent = listStudent.filter((val) => {
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
    const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * itemPerPage;
    const endIndex =
      currentPage === 1 ? startIndex + itemPerPage : startIndex + itemPerPage;
    const slicedData = filteredStudent.slice(startIndex, endIndex);
    setStudentData(slicedData);
    setPageSize(Math.ceil(filteredStudent.length / itemPerPage));
  }

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
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              name="name"
              className="w-1/4 px-3 py-2 text-gray-700 bg-white rounded mt-5 mb-3"
              autoComplete="off"
              placeholder="Search by Student Name"
              onChange={handleSearch}
            />
            <Pagination
              page={currentPage}
              pageSize={pageSize}
              changePage={changePage}
            />
          </div>
          <div className="bg-white overflow-auto">
            <TableUser listStudent={studentData} />
          </div>
        </div>
      )}
    </div>
  );
}
