import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import "./Single.css";
export const Single = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogAuthorId, setBlogAuthorId] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [blogCreated, setBlogCreated] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  let { postId } = useParams();
  // console.log(postId);
  useEffect(() => {
    const fetchBlogByID = async () => {
      try {
        const res = await axios.get(`${API}/api/blog/fetBlogByID/${postId}`);
        setBlogTitle(res.data.payload[0].post_title);
        setBlogAuthor(res.data.payload[0].user_name);
        setBlogAuthorId(res.data.payload[0].user_id);
        setBlogImg(res.data.payload[0].img_url);
        setBlogDescription(res.data.payload[0].post_description);
        setBlogCreated(res.data.payload[0].created_at);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogByID();
  }, [blogTitle, postId]);

  //event handler for deletin the blog
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API}/api/blog/deletBlog/${postId}`);
      navigate("/");
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  //check current user id and blog user id are same

  return (
    <>
      <Container>
        <Row className="m-5">
          <Col xs={12}>
            <img src={blogImg} className="img-fluid" alt={blogTitle} />
          </Col>
          <Col xs={8}>
            <h3>{blogTitle}</h3>
          </Col>
          {user && blogAuthorId === user?.user.id && (
            <Col xs={4}>
              <FiEdit style={{ cursor: "pointer" }} /> &nbsp;
              <RiDeleteBinLine
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
              />
            </Col>
          )}

          <Col xs={8}>
            <span className="text">{blogAuthor}</span>
          </Col>
          <Col xs={4}>
            <span className="text">{new Date(blogCreated).toDateString()}</span>
          </Col>
          <Col xs={11}>
            <p>{blogDescription}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
