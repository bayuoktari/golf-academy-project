import React, { useState } from "react";

export default function UploadTransfer({ file }) {
  const [imgFile, setImgFile] = useState("");
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl mb-6">
        Upload Bank Transfer
      </h1>
      <p className="text-center font-medium text-xl">
        Please Transfer to This Bank Account
      </p>
      <h3 className="text-center font-semibold text-xl mt-5">BANK BNI</h3>
      <h3 className="text-center font-semibold text-xl">6666667973</h3>
      <p className="text-center font-light text-xl">a/n</p>
      <p className="text-center font-semibold text-xl">
        Perkumpulan Akademi Golf Indonesia
      </p>
      <p className="text-center mt-10">Upload Bank Transfer Proof</p>
      {imgFile ? (
        <img src={imgFile} className="w-1/2 block mx-auto my-5" alt="imgBank" />
      ) : (
        ""
      )}
      <input
        type="file"
        className="block mx-auto px-2 py-2 text-gray-700 bg-gray-100 rounded"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files.length !== 0) {
            // console.log(e.target.files[0]);
            file(e.target.files[0]);
            setImgFile(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
    </div>
  );
}
