import React, { useContext, useState } from "react";
import axios from "axios";
import { API } from "../../config";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  LoginFailure,
  LoginStart,
  LoginSuccess,
} from "../../context/AuthAction";
const SignIn = () => {
  //   return (
  let [authMode, setAuthMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  // console.log(dispatch);
  let navigate = useNavigate();
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    dispatch(LoginStart());
    try {
      const res = await axios.post(`${API}/api/user/signin`, {
        email: email,
        password: password,
      });
      dispatch(LoginSuccess(res.data));
      // console.log(result);
      navigate("/");
      return res.data;
    } catch (err) {
      dispatch(LoginFailure());
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API}/api/user/register`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(result);
      setAuthMode("signin");
      setName("");
      setEmail("");
      setPassword("");
      return result.data;
    } catch (err) {
      console.log(err);
    }
    setName("");
    setEmail("");
    setPassword("");
  };
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container" onSubmit={handleLogin}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                required
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                required
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleRegister}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
