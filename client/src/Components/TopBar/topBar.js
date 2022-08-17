import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import "./topBar.css";
// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/esm/Button";

// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../context/AuthAction";
import { AuthContext } from "../../context/AuthContext";

export const TopBar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();
  const handleSignout = () => {
    dispatch(Logout());
    navigate("/");
  };
  return (
    <>
      {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">EcBlogs</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            {user && (
              <Nav.Link href="/write" onClick={() => navigate("/write")}>
                Write
              </Nav.Link>
            )}

            {!user && (
              <Nav.Link onClick={() => navigate("/signin")}>Sign In</Nav.Link>
            )}
            {user && (
              <Nav.Link href="/" onClick={() => dispatch(Logout())}>
                Logout
              </Nav.Link>
            )}
          </Nav>
          {user && <h5>Hi {user.user.name}</h5>}
        </Container>
      </Navbar> */}
      <Navbar bg="dark" expand="lg" className="px-3" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to={`/`}>
            <img
              src="https://cdn.pixabay.com/photo/2016/04/01/00/22/cat-1298141_960_720.png"
              width={36}
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ background: "rgb(241,146,38)" }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
              variant="outline-warning"
              b
            >
              <Nav.Link href="/" className="link-warning">
                Home
              </Nav.Link>
              {/* <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              {user && (
                // <Nav.Link as={Link} to={`/write`} className="link-warning">
                //   Write
                // </Nav.Link>
                <Nav.Link href="/write" className="link-warning">
                  Add Blog
                </Nav.Link>
              )}
              {!user && (
                // <Nav.Link as={Link} to={"/signin"} className="link-warning">
                //   Sign In
                // </Nav.Link>
                <Nav.Link href="/signin" className="link-warning">
                  Sign In
                </Nav.Link>
              )}
            </Nav>
            <Form className="d-flex">
              {/* <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              /> */}
              {user && (
                <Button
                  variant="outline-warning"
                  className=""
                  onClick={handleSignout}
                >
                  Sign Out
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
