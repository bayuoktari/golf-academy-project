import React from "react";

export default function Pagination({ page, pageSize, changePage }) {
  function renderItem() {
    const item = [];
    for (let i = 1; i <= pageSize; i++) {
      item.push(
        <li
          key={i}
          aria-current="page"
          className={`${
            page === i
              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          } relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer`}
          onClick={() => changePage(i)}
        >
          {i}
        </li>
      );
    }
    return item;
  }
  return (
    <ul
      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-5"
      aria-label="Pagination"
    >
      {page !== 1 && (
        <li
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => {
            changePage(page - 1);
          }}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </li>
      )}
      {renderItem()}
      {page !== pageSize && (
        <li
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => changePage(page + 1)}
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </li>
      )}
    </ul>
  );
}
