import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/ShowmanLogo1.png";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { myContext } from "../Context/Authcontext.jsx";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { baseurl } = useContext(myContext);
  /*Extracting the category */
  const cat = useLocation().search;
  const getDocument = (html) => {
    const htmlDoc = new DOMParser().parseFromString(html, "text/html");
    return htmlDoc.body.innerHTML;
  };
  /* Fetching the posts data*/
  const fetchdata = async () => {
    const res = await axios.get(`${baseurl}/api/posts/${cat}`);

    setPosts(res.data);
    // console.log(res.data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchdata();
  }, [cat]);
  return (
    <div id="home">
      <div className="flex flex-col mt-12 gap-[150px]">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`flex gap-[100px] ${
              post.id % 2 !== 0 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="relative flex-2" id="img">
              <img
                src={post.img}
                alt={post.title}
                className=" w-full max-h-[400px] object-cover"
              />
            </div>
            <div className="flex-3 flex flex-col justify-between" id="content">
              <Link to={`/post/${post.id}`}>
                <h1 className="text-5xl">{post.title}</h1>
              </Link>
              <p className="text-xl line-clamp-2">{getDocument(post.description)}</p>
              <button
                className="w-max px-2 py-2 border border-teal-500 text-teal-500 hover:border-white hover:text-black hover:bg-lightgreen"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                Read more...
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
