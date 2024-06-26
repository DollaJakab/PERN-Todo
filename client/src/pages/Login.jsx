import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = ({
  authenticated,
  isLogin,
  setIsLogin,
  validate,
  getUserInfo,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (authenticated) return <Navigate to="/todos" />;
  if (!isLogin) return <Navigate to="/register" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const token = await res.json();
        localStorage.setItem("token", token);
        await validate();
        await getUserInfo();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleLogin(e);
      }}
      className="flex flex-col h-screen justify-center gap-5 m-auto w-1/2 mt-5"
    >
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Email:"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Password:"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Login
      </button>
      <button
        className="cursor-pointer text-center dark:text-white text-black"
        onClick={(e) => setIsLogin(false)}
      >
        Don't have an account? Register!
      </button>
    </form>
  );
};

export default Login;
