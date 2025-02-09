import React, { useContext, useEffect, useState } from "react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/imag2.jpg";
import { Link, useLocation } from "react-router";
import Edit from "../assets/pen.png";
import Delete from "../assets/trash-bin.png";
import Menu from "./Menu";
import { myContext } from "../Context/Authcontext";
import axios from "axios";
import moment from "moment";

const Single = () => {
  const [post, setPost] = useState({});
  const { baseurl, currentUser } = useContext(myContext);
  /*Extracting the category */
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  /* Fetching the posts data*/
  const fetchdata = async () => {
    const res = await axios.get(`${baseurl}posts/${postId}`);

    setPost(res.data);
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(`${baseurl}posts/${id}`);
    fetchdata();
  };
  useEffect(() => {
    fetchdata();
  }, [postId]);
  return (
    <div className="flex gap-12">
      <div className="flex-5 flex flex-col gap-8" id="content">
        <img src={`../upload/${post?.img}` || null} alt="" className="w-full h-[300px] object-cover" />{" "}
        <div className="flex items-center gap-2 text-base mt-3" id="user">
          {post.userImg !== "null" ? (
            <img
              src={post.userImg}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <></>
          )}
          <div className="" id="info">
            <span className="font-bold">{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser && (
            <div className="flex gap-2">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="edit" className="w-5 h-5 cursor-pointer" />
              </Link>
              <button className="" onClick={() => handleDelete(post.id)}>
                <img
                  src={Delete}
                  alt="delete"
                  className="w-5 h-5 cursor-pointer"
                />
              </button>
            </div>
          )}
        </div>
        <h1 className="text-4xl text-[#333]">{post?.title}</h1>
        <p className="text-justify leading-8">{post?.desc}</p>
      </div>
      <div className="flex-2">
        <Menu cat={post?.cat} />{" "}
      </div>
    </div>
  );
};

export default Single;
