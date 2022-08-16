import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import "./Single.css";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
export const Single = () => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(" ");
  const [desc, setDesc] = useState("");
  const { user } = useContext(AuthContext);
  const [updateMode, setUpdateMode] = useState(false);
  let navigate = useNavigate();
  let { postId } = useParams();

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

  //event handler for deletin the blog
  const handleDelete = async () => {
    console.log(user.user.id);
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
        <Row className="m-5">
          <Col xs={12}>
            <img
              src={post.img_url}
              className="img-fluid"
              alt={post.post_title}
            />
          </Col>
          {updateMode ? (
            <Form.Group className="mb-3 w-50 mt-4" controlId="formBasicEmail">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          ) : (
            <>
              <Col xs={8}>
                <h3>{post.post_title}</h3>
              </Col>
              {user && post.user_id === user?.user.id && (
                <Col xs={4}>
                  <FiEdit
                    onClick={() => setUpdateMode(true)}
                    style={{ cursor: "pointer" }}
                  />{" "}
                  &nbsp;
                  <RiDeleteBinLine
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              )}
            </>
          )}

          <Col xs={8}>
            <span className="text">Author: {post.user_name}</span>
          </Col>
          <Col xs={4}>
            <span className="text">
              {new Date(post.created_at).toDateString()}
            </span>
          </Col>
          {updateMode ? (
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comments"
              className="mb-3 p-2"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: "150px" }}
              />
            </FloatingLabel>
          ) : (
            <>
              {" "}
              <Col xs={11}>
                <p>{post.post_description}</p>
              </Col>
            </>
          )}
        </Row>
        {updateMode && (
          <div className="d-flex justify-content-end m-3">
            <Button variant="warning" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};
