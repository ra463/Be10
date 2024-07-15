"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header = ({ auth, setOpen }: { auth: string; setOpen: any }) => {
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="flex w-[100%] justify-end p-2">
      {auth ? (
        <div className="flex gap-2 items-center">
          <button
            onClick={handleOpen}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Data
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Login In
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
