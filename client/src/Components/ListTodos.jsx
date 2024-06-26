import { MdDelete, MdMoreVert } from "react-icons/md";
import { useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, getTodos, deleteTodo, updateTodo }) => {
  const [todoToUpdate, setTodoToUpdate] = useState(null);
  const [open, setOpen] = useState(false);

  //* MODAL STATE

  const handleOpen = (todo) => {
    setTodoToUpdate(todo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col gap-5 dark:text-white text-center w-1/2 mx-auto mt-5">
      {todos.map((todo) => {
        return (
          <div
            key={todo.todo_id}
            className="dark:bg-gray-700 bg-white p-3 rounded-lg flex justify-between align-start"
          >
            <h1>{todo.description}</h1>
            <div className="flex text-xl gap-1">
              <button
                onClick={() => {
                  deleteTodo(todo.todo_id);
                }}
                className="text-red-600"
              >
                <MdDelete />
              </button>

              <button onClick={() => handleOpen(todo)}>
                <MdMoreVert />
              </button>
            </div>
            {todoToUpdate && (
              <EditTodo
                open={open}
                handleClose={handleClose}
                updateTodo={updateTodo}
                todoToUpdate={todoToUpdate}
                setTodoToUpdate={setTodoToUpdate}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListTodos;
