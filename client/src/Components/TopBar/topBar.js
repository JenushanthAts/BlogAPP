import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import "./topBar.css";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../context/AuthAction";
import { AuthContext } from "../../context/AuthContext";

export const TopBar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" variant="light">
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
      </Navbar>
    </>
  );
};
