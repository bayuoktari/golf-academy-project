import React, { useState } from "react";

export default function ParentForm(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="lg:w-3/4 mx-auto">
      <h1 className="text-center font-semibold text-2xl mb-6">
        Parent Information
      </h1>
      <div className="mt-2">
        <label
          className="block text-sm text-gray-600 mb-2"
          htmlFor="parentFullname"
        >
          Parent Full Name
        </label>
        <input
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2"
          id="parentFullname"
          name="parentFullname"
          type="text"
          placeholder="Parent Full Name"
          autoComplete="off"
          aria-label="Name"
        />
      </div>
      <div className="inline-block mt-2 w-1/2 pr-1">
        <label
          className="block text-sm text-gray-600 mb-2"
          htmlFor="parentEmail"
        >
          Parent Email
        </label>
        <input
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
          id="parentEmail"
          name="parentEmail"
          type="email"
          required=""
          placeholder="example@mail.com"
          aria-label="parentEmail"
          autoComplete="off"
        />
      </div>
      <div className="inline-block mt-2 pl-1 w-1/2">
        <label
          className=" block text-sm text-gray-600 mb-2"
          htmlFor="parentPhone"
        >
          Parent Phone Number
        </label>
        <input
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
          id="parentPhone"
          name="parentPhone"
          type="text"
          value={phoneNumber}
          placeholder="081234217821"
          aria-label="parentPhone"
          autoComplete="off"
          onChange={(e) => {
            const regex = /^[0-9\b]+$/;
            const value = e.target.value;
            if (value === "" || regex.test(value)) {
              setPhoneNumber(value);
            }
          }}
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm text-gray-600 mb-2" htmlFor="job">
          Parent Job
        </label>
        <input
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2"
          id="job"
          name="job"
          type="text"
          placeholder="Parent Job"
          autoComplete="off"
          aria-label="Name"
        />
      </div>
      {/* </form> */}
    </div>
  );
}
