import { Modal } from "@mui/material";

const EditTodo = ({
  open,
  handleClose,
  todoToUpdate,
  setTodoToUpdate,
  updateTodo,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <form
        className=" min-h-min w-1/2 absolute dark:bg-gray-700 bg-neutral-100 dark:text-white text-black m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col gap-5 justify-center items-center p-5"
        onSubmit={(e) =>
          updateTodo(
            e,
            todoToUpdate.todo_id,
            todoToUpdate.description,
            handleClose
          )
        }
      >
        <input
          className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={todoToUpdate?.description}
          onChange={(e) =>
            setTodoToUpdate({
              todo_id: todoToUpdate.todo_id,
              description: e.target.value,
            })
          }
        />
        <button
          className="flex self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default EditTodo;
