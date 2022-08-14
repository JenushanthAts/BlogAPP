import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API } from "../../config";
import { useNavigate } from "react-router-dom";
export const Write = () => {
  const [validated, setValidated] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user.user.id;
  let navigate = useNavigate();
  // console.log(user);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setValidated(true);
        const res = await axios.post(`${API}/api/blog/createPost`, {
          title: blogTitle,
          imgUrl: imgUrl,
          description: blogDescription,
          userId: userId,
        });
        navigate("/");
        return res;
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="m-5">
          <h2 className="text-center">Write Your Post Here</h2>
          <Col xs={6}>
            <InputGroup className="mb-3">
              <Form.Control
                required
                placeholder="Post Title"
                aria-label="Post Title"
                aria-describedby="basic-addon1"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={6}>
            <InputGroup className="mb-3">
              <Form.Control
                required
                placeholder="Image Url"
                aria-label="Image Url"
                aria-describedby="basic-addon1"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12}>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Comments"
              className="mb-3"
            >
              <Form.Control
                required
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col xs={4}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
