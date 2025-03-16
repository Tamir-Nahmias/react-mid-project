import { useEffect, useState } from "react";

const Todos = ({ id, todos, setTodos }) => {
  const [todoID, setSelectedID] = useState(0);
  const [isNewDisplayed, setIsNewDisplayed] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddNewTodo = () => {
    const todosCount = todos.filter((todo) => todo.userId === id);
    const tempObj = {
      userId: id,
      id: todosCount.length + 1,
      title: title,
      completed: false,
    };
    setTodos([...todos, tempObj]);
    setTitle("");
  };

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
      {isNewDisplayed && (
        <div className="add-todo-container">
          <h4>New todo - user {id}</h4>
          <div>
            <label>Title : </label>
            <input
              type="text"
              name="title"
              placeholder="Write a todo..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              // defaultValue="default value"
            ></input>
          </div>
          <div id="todo-cancel-and-add-buttons">
            <button onClick={() => setIsNewDisplayed(false)}>Cancel</button>
            <button onClick={handleAddNewTodo}>Add</button>
          </div>
        </div>
      )}

      {!isNewDisplayed && (
        <div className="todos-per-user-container">
          <section id="todos-header">
            <h4>Todos - user {id}</h4>
            <button onClick={() => setIsNewDisplayed(true)}>Add</button>
          </section>
          {todos
            .filter((todo) => todo.userId === id)
            .map((userTodo) => {
              return (
                <div key={userTodo.id}>
                  <div>
                    <label>Title : </label>
                    {userTodo.title}
                  </div>
                  {/* I used ternary operator as bollean values aren't printable instantly  */}
                  <div className="todos-completed-div">
                    <div>
                      <label>Completed : </label>
                      {userTodo.completed ? "True" : "False"}
                    </div>
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
      )}
    </div>
  );
};

export default Todos;
