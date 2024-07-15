"use client";
import axios from "axios";
import React, { useState } from "react";
import Loader from "./Loader";

const UpdateModal = ({
  setOpen,
  data,
  getData,
}: {
  setOpen: any;
  data: any;
  getData: any;
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateModal = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const result = await axios.put("/api/info/updateInfo", {
      message: message,
      id: data?._id,
    });

    if (result.data.success == true) {
      setMessage("");
      setLoading(false);
      setOpen(false);
      getData();
      alert(result.data.message);
    }
  };

  const handleClose = () => {
    setMessage("");
    setOpen(false);
  };

  return (
    <div
      className="absolute left-0 right-0 z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <form
        onSubmit={(e) => handleUpdateModal(e)}
        className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div className="flex p-4 items-center flex-col gap-2">
          <h3
            className="text-base font-semibold leading-6 text-gray-900"
            id="modal-title"
          >
            Update Message
          </h3>
          <input
            value={data.message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter some Message"
          />
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
