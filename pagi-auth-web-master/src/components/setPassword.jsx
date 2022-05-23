import React from "react";

export default function FormPassword(props) {
  return (
    <div className="lg:w-3/4 mx-auto">
      <h1 className="text-center font-semibold text-2xl mb-6">
        Set Up Your Password
      </h1>
      <form>
        <div className="mt-2">
          <label
            className="block text-sm text-gray-600 mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2"
            id="password"
            name="password"
            type="password"
            placeholder="New Password"
            autoComplete="off"
            aria-label="password"
            value={props.password.password}
            onChange={props.changePassword}
          />
        </div>
        <div className="mt-2">
          <label
            className="block text-sm text-gray-600 mb-2"
            htmlFor="retype password"
          >
            Re-Type Password
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="retype password"
            name="retype password"
            type="password"
            placeholder="Re-Type Password"
            autoComplete="off"
            value={props.password.retype}
            aria-label="retype password"
            onChange={props.retypePass}
          />
        </div>
      </form>
    </div>
  );
}
