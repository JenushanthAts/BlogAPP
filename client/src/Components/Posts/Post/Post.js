import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
const Post = ({ blogs }) => {
  // console.log(blogs);

  return (
    <>
      {blogs &&
        blogs?.map((ele, index) => (
          <div className="post" key={index}>
            <img className="postImg" src={ele.img_url} alt="blog" />
            <div className="postInfo">
              <div className="postCats">
                <span className="postCat">Author :{ele.user_name}</span>
                {/* ))} */}
              </div>
              <Link to={`/post/${ele.post_id}`} className="link">
                <span className="postTitle"> {ele.post_title} </span>
              </Link>
              <hr />
              <span className="postDate">
                {new Date(ele.created_at).toDateString()}
                {/* {new Date(post.createdAt).toDateString()} */}
              </span>
            </div>
            <p className="postDesc">{ele.post_description}</p>
          </div>
        ))}
    </>
  );
};

export default Post;
