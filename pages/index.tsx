"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import axios from "axios";
import UpdateModal from "@/components/UpdateModal";

const Home = () => {
  let auth = "";
  if (typeof window !== "undefined") {
    auth = Cookies.get("token") || "";
  }

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/info/getInfo");

    if (data.success === true) {
      setMessages(data.info);
      setLoading(false);
    }
  };

  const handleDelete = async (e: any, id: string) => {
    e.preventDefault();
    const { data } = await axios.delete("/api/info/deleteInfo", {
      data: {
        id,
      },
    });
    if (data.success === true) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    auth && (
      <div className="relative">
        <Header setOpen={setOpen} auth={auth} />
        {open && <Modal setOpen={setOpen} getData={getData} />}
        <div className="mt-5 flex flex-col px-5 gap-3 items-center">
          {messages && messages.length > 0 ? (
            messages.map((message: any, index: number) => (
              <div
                key={index}
                className="p-3 px-4 bg-slate-100 rounded-md shadow w-full flex items-center justify-between"
              >
                <span>{message?.message}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleDelete(e, message?._id)}
                    className="p-3"
                  >
                    Delete
                  </button>
                  <button onClick={() => setOpenModal(true)} className="p-3">
                    Update
                  </button>
                </div>
                {openModal && (
                  <UpdateModal
                    setOpen={setOpenModal}
                    data={message}
                    getData={getData}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-3 rounded-md shadow-md w-full">
              No Messages
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Home;
