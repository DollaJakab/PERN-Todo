import React from "react";
import { useState, useEffect } from "react";
import InputTodo from "../Components/InputTodo";
import ListTodos from "../Components/ListTodos";
import EditTodo from "../Components/EditTodo";
import { Navigate } from "react-router-dom";

const Todos = ({ authenticated, setAuth, logOut, user }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  //* GET ALL TODOS

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //* POST A TODO

  const postTodo = async (e, description, setDescription) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        getTodos();
      }
      setDescription("");
    } catch (error) {
      console.error(error.message);
    }
  };

  //* DELETE A TODO

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //* UPDATE A TODO

  const updateTodo = async (e, id, description, handleClose) => {
    try {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ description: description }),
      });
      if (response.ok) {
        await getTodos();
        handleClose();
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <div className="flex justify-end items-center p-3 gap-3 font-bold ">
        <p className="dark:text-white text-black"> {user?.user_name}</p>
        <button
          onClick={() => logOut()}
          className="justify-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign out
        </button>
      </div>
      <InputTodo postTodo={postTodo} />
      <ListTodos
        todos={todos}
        getTodos={getTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      <EditTodo />
    </div>
  );
};

export default Todos;
