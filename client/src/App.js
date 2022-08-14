import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { TopBar } from "./Components/TopBar/topBar";
import { AuthContext, ContextProvider } from "./context/AuthContext";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import { Single } from "./Pages/SinglePost/Single";
import { Write } from "./Pages/Write/Write";

function App() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <ContextProvider>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route
            path="/signin"
            element={user ? <Navigate to="/" replace /> : <SignIn />}
          />

          <Route path="post/:postId" exact element={<Single />} />
          {user && <Route path="/write" element={<Write />} />}
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
