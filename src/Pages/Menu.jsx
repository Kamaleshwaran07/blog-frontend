import React, { useContext, useEffect, useState } from "react";
import image1 from "../assets/image1.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import { myContext } from "../Context/Authcontext";
import axios from "axios";

const Menu = ({ cat }) => {
  const [post, setPost] = useState([]);
  const { baseurl } = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  /* Fetching the posts data*/

  const fetchdata = async () => {
    const res = await axios.get(`${baseurl}/api/posts/?cat=${cat}`);
    const posts = res.data;

    let filter = posts.filter((pst) => pst.id !== parseFloat(postId));

    setPost(filter);
  };

  useEffect(() => {
    fetchdata();
  }, [cat]);
  return (
    <div className="flex-2 flex flex-col gap-6">
      <h1 className="text-xl">Other posts you may like</h1>
      {post.map((post) => (
        <div key={post.id} className={`flex flex-col gap-3`}>
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-[200px] object-cover"
          />

          <Link to={`/post/${post.id}`}>
            <h2 className="text-3xl text-[#555]">{post.title}</h2>
          </Link>

          <button
            className="w-max px-2 py-2 border border-teal-500 text-teal-500 hover:border-white hover:text-black hover:bg-lightgreen"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            Read more...
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
