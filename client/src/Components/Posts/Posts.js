import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../config";
import Post from "./Post/Post";
import "./Posts.css";
export const Posts = () => {
  const [blogs, setBlogs] = useState("");
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API}/api/blog/fetchBlogs`);
        setBlogs(res.data.payload);
        return res;
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [blogs]);
  return (
    <>
      <h2 className="text-center">Our Blogs</h2>
      <div className="posts">
        <Post blogs={blogs} />
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
    </>
  );
};
