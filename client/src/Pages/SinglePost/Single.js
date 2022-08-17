import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DeleteModal } from "../../Components/DeleteModal/DeleteModal";
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
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(" ");
  const [desc, setDesc] = useState("");
  const { user } = useContext(AuthContext);
  const [updateMode, setUpdateMode] = useState(false);
  let navigate = useNavigate();
  let { postId } = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchBlogByID = async () => {
      try {
        const res = await axios.get(`${API}/api/blog/fetBlogByID/${postId}`);
        setPost(res.data.payload[0]);
        setTitle(res.data.payload[0].post_title);
        setDesc(res.data.payload[0].post_description);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogByID();
  }, [postId]);

  //event handler for deleting the blog
  const handleShow = () => setShow(true);
  const handleDelete = async () => {
    console.log(user.user.id);
    setShow(true);
    try {
      const res = await axios.delete(
        `${API}/api/blog/deleteBlog/${postId}`,
        { data: { userId: user.user.id } },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  //event handler for updating the blog
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API}/api/blog/updateBlog/${postId}`,
        {
          userId: user.user.id,
          title,
          desc,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      window.location.reload("/");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <DeleteModal
          show={show}
          setShow={setShow}
          handleDelete={handleDelete}
        />
        <Row className="mt-5 mb-3">
          <Col sm={12} md={12}>
            <img
              src={post.img_url}
              className="blogImg"
              alt={post.post_title}
              // rounded
              // width={300}
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col sm={9} md={9}>
            <span className="text">Author : {post.user_name}</span>
          </Col>
          <Col sm={3} md={3}>
            <span className="text">
              Created at : {new Date(post.created_at).toDateString()}
            </span>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={12}>
            {updateMode ? (
              <input
                type="text"
                className="form-control mt-3"
                id="exampleFormControlInput1"
                value={title}
                // placeholder="name@example.com"
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <>
                {user && post.user_id === user?.user.id && (
                  <>
                    <FiEdit
                      onClick={() => setUpdateMode(true)}
                      className="icon editColor"
                    />{" "}
                    &nbsp;&nbsp;
                    <RiDeleteBinLine
                      onClick={handleShow}
                      className="icon deleteColor"
                    />
                  </>
                )}
                <h3 className="alignText text-capitalize">{post.post_title}</h3>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            {updateMode ? (
              <textarea
                className="form-control mt-3 mb-3"
                aria-label="With textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={5}
              ></textarea>
            ) : (
              <p className="text-justify">{post.post_description}</p>
            )}
          </Col>
        </Row>
        {updateMode && (
          // <Row className="mt-3">
          //   <Col xs={4} sm={4}>
          <Row className="justify-content-md-start justify-content-sm-center mb-3">
            <Col>
              <button className="btn btn-warning " onClick={handleUpdate}>
                Update
              </button>
              &nbsp;
              <button
                className="btn btn-secondary "
                onClick={() => setUpdateMode(false)}
              >
                Cancel
              </button>
            </Col>
            <Col xs lg="2"></Col>
          </Row>

          //   </Col>
          // </Row>
        )}
      </Container>
    </>
  );
};
