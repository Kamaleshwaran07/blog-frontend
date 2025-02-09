import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { myContext } from "../Context/Authcontext";
import { useLocation } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
const Write = () => {
  const state = useLocation().state;
  // const [value, setValue] = useState(state.va"");
  const { baseurl, currentUser } = useContext(myContext);
  const [title, setTitle] = useState(state?.title || "");
  const [desc, setdesc] = useState(state?.desc || "");
  const [img, setImg] = useState(null);
  // const [date, setDate] = useState("");
  const [cat, setCat] = useState(state?.cat || "");
  const uid = currentUser?.id;
  const quillRef = useRef(null);
  const upload = async () => {
    try {
      const formdata = new FormData();
      formdata.append("file", img);
      const res = await axios.post("http://localhost:8800/upload", formdata);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(state.id)
    try {
      state
        ? await axios.put(
            `${baseurl}posts/${state.id}`,
            {
              title,
              desc: desc,
              cat,
              img: img ? imgUrl : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            `${baseurl}posts/addpost`,
            {
              title,
              desc: desc,
              cat,
              img: img ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5 flex gap-5">
      <Toaster />
      <div className="flex-5 flex flex-col gap-3">
        <input
          name="title"
          className=" p-3 border border-gray-400"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="h-[300px] overflow-y-scroll border border-gray-300">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={desc}
            className="h-full border-none"
            onChange={setdesc}
          />
        </div>
      </div>
      <div className="flex-2 flex flex-col gap-5">
        <div className="flex-1 flex-col gap-5 flex justify-between text-xs text-lightBrown border border-gray-400 p-2.5">
          <h1 className="text-2xl font-bold text-lightBrown">Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            type="file"
            alt=""
            id="file"
            className="hidden"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file" className="underline cursor-pointer">
            Upload Image
          </label>
          <div className="flex justify-between gap-3">
            <button className="cursor-pointer bg-white border border-teal-500 px-2 py-2 text-teal-500">
              Save as draft
            </button>
            <button
              onClick={handleSubmit}
              className="cursor-pointer border bg-teal-700 px-2 py-2 text-white"
            >
              Publish
            </button>
          </div>
        </div>
        <div className="text-sm flex flex-col p-2.5 flex-1 border border-gray-400 justify-between items">
          <h1 className="text-2xl font-bold text-lightBrown">Category</h1>
          <div className="flex gap-2 items-center text-teal-500">
            <input
              type="radio"
              checked={cat === "Art"}
              name="cat"
              value="Art"
              id="Art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Art">Art</label>
          </div>
          <div className="flex gap-2 items-center text-teal-500">
            <input
              type="radio"
              checked={cat === "Science"}
              name="cat"
              value="Science"
              id="Science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Science">Science</label>
          </div>
          <div className="flex gap-2 items-center text-teal-500">
            <input
              type="radio"
              checked={cat === "Technology"}
              name="cat"
              value="Technology"
              id="Technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Technology">Technology</label>
          </div>

          <div className="flex gap-2 items-center text-teal-500">
            <input
              type="radio"
              checked={cat === "Cinema"}
              name="cat"
              value="Cinema"
              id="Cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Cinema">Cinema</label>
          </div>
          <div className="flex gap-2 items-center text-teal-500">
            <input
              type="radio"
              checked={cat === "Design"}
              name="cat"
              value="Design"
              id="Design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Design">Design</label>
          </div>
          <div className="flex gap-2 items-center text-teal-500">
            <input
              type="radio"
              checked={cat === "Food"}
              name="cat"
              value="Food"
              id="Food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
