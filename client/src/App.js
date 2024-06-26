import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const setAuth = (bool) => setAuthenticated(bool);

  const validate = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/auth/verify", {
      headers: {
        token: token,
      },
    });
    const jsonRes = await response.json();
    if (jsonRes === true) {
      setAuth(true);
    }
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/auth/", {
      headers: {
        token: token,
      },
    });
    const jsonRes = await response.json();
    setUser(jsonRes);
  };

  const logOut = async () => {
    setAuth(false);
    localStorage.clear();
  };

  useEffect(() => {
    validate();
    getUserInfo();
  }, []);
  return (
    <div className="min-h-screen w-screen bg-radient-ellipse-c from-neutral-100 to-neutral-200 dark:from-slate-800 from-0% dark:to-slate-900 to-70%">
      <Routes>
        <Route
          path="login"
          element={
            <Login
              authenticated={authenticated}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              validate={validate}
              getUserInfo={getUserInfo}
            />
          }
        />
        <Route
          path="register"
          element={
            <Register
              authenticated={authenticated}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              validate={validate}
              getUserInfo={getUserInfo}
            />
          }
        />
        <Route
          path="todos"
          element={
            <Todos
              authenticated={authenticated}
              setAuth={setAuth}
              logOut={logOut}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
