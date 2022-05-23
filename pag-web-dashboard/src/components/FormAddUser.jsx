import React from "react";

export default function FormAddUser(props) {
  return (
    <div className="w-full lg:w-3/4 my-6 pr-0 lg:pr-2">
      <p className="text-xl pb-6 flex items-center">
        {props}
        <i className="fas fa-id-badge mr-3"></i>
        {props.page === "detail" ? "Detail Staff" : "Add New Staff"}
      </p>
      <div className="leading-loose">
        <form className="p-10 bg-white rounded shadow-xl">
          <div className="inline-block mt-2 w-full pr-1">
            <label className="block text-sm text-gray-600" htmlFor="status">
              Role
            </label>
            <div className="relative inline-block w-1/4 text-gray-600">
              <select
                className="w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline"
                placeholder="Select Role"
              >
                <option>Admin</option>
                <option>Coach</option>
                <option>Student</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
            {/* <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              required=""
              autoComplete="off"
              placeholder="New User Name"
              aria-label="Name"
            /> */}
          </div>
          <div className="inline-block mt-2 w-full pr-1">
            <label className="block text-sm text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              required=""
              autoComplete="off"
              placeholder="User Full Name"
              aria-label="Name"
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="email"
              name="email"
              type="email"
              required=""
              autoComplete="off"
              placeholder="User Email Address"
              aria-label="Email"
            />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="block text-sm text-gray-600" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="phone"
              name="phone"
              type="text"
              required=""
              autoComplete="off"
              placeholder="Phone Number (08123456789)"
              aria-label="phone"
            />
          </div>
          <div className="mt-2">
            <label className=" block text-sm text-gray-600" htmlFor="address">
              Address
            </label>
            <textarea
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="message"
              name="message"
              rows="2"
              required=""
              placeholder="User Full Address"
              aria-label="address"
            ></textarea>
          </div>
          <div className="mt-3">
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded hover:bg-green-800"
              type="submit"
            >
              <i className="fas fa-plus"></i> Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
