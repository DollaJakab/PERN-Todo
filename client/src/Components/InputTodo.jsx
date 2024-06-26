import React from "react";
import { useState } from "react";

const InputTodo = ({ postTodo }) => {
  // Todo Description field
  const [description, setDescription] = useState("");

  //* Form Submit function

  return (
    <>
      <div className="text-center text-3xl pt-5 dark:text-white">
        Pern Todo List
      </div>
      <form
        onSubmit={(e) => postTodo(e, description, setDescription)}
        className="flex m-auto w-1/2 mt-5"
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Todo:"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
