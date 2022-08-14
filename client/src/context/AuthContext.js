import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./AuthReducer";
// import jwt_decode from "jwt-decode";

const INITIAL_STAGE = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  isFetching: false,

  error: false,
};

export const AuthContext = createContext(INITIAL_STAGE);

export const ContextProvider = ({ children }) => {
  // console.log(children);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STAGE);

  //this will be called for auto logout after token expired
  // const handleLogout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };
  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(state.user));
    // Cookies.set("user", JSON.parse(state.user));
    sessionStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
