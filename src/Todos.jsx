import { useEffect, useState } from "react";

const Todos = ({ id, todos, setTodos }) => {
  const [todoID, setSelectedID] = useState(0);

  const handleMarkCompleted = () => {
    setTodos(
      todos.map((todo) =>
        todo.userId === id && todo.id === todoID
          ? { ...todo, completed: true }
          : todo
      )
    );
  };
  // onclick "mark completed" button will trigger  below useEffect
  // handleMarkCompleted whenever todoID updates
  useEffect(() => handleMarkCompleted(), [todoID]);

  return (
    <div id="todos-container">
      <div>
        <h4>
          Todos - user {id} <button>Add</button>
        </h4>
      </div>
      <div className="todos-per-user-container">
        {todos
          .filter((todo) => todo.userId === id)
          .map((userTodo) => {
            return (
              <div key={userTodo.id}>
                <div>Title : {userTodo.title}</div>
                {/* I used ternary operator as bollean values aren't printable instantly  */}
                <div>
                  Completed : {userTodo.completed ? "True" : "False"}
                  <span>
                    {!userTodo.completed && (
                      // the below id is the todo id
                      <button
                        onClick={() => {
                          setSelectedID(userTodo.id);
                          // handleMarkCompleted(); // I moved the function run to be in useEffect, as it won't
                          //effect immediatly
                        }}
                      >
                        Mark completed
                      </button>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
