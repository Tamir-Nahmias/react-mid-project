import { useEffect, useState } from "react";
import "./App.css";
const USERS_URL =
  "https://jsonplaceholder.typicode.com/users?_sort=id&_order=asc";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
import axios from "axios";
import User from "./User";
import Todos from "./Todos";
import Posts from "./Posts";
// import NewUser from "./NewUser";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isTodosPostsDisplayed, setIsTodosPostsDisplayed] = useState(false);
  const [selectedID, setSelectedID] = useState(0); // needed to decide which specific user's todos and posts to show
  const [isOccupiedArr, setisOccupiedArr] = useState([]); // needed for bg coloring in orange
  const [todoCompleteStatus, settodoCompleteStatus] = useState([]); //array of booleans, telling which user completed his set of tasks
  const [counBlock, setCountBlock] = useState(0); // helps rendereding certain useEffects two times only . only in the second rendering the users array getting initialized , then we can use the array length
  const [usersSize, setUsersSize] = useState(0); // having the initial users array size fixed to able to work seamlessly.
  const [isNewUserDisplayed, setIsNewUserDisplayed] = useState(false); // flag to show or hide the new user section
  const [newUserDetails, setNewUserDetails] = useState({ name: "", email: "" });
  const [dynamicUsersSize, setDynamicUsersSize] = useState(0); // increasing counter used for new user ID

  const handleAddNewUser = () => {
    const tempObj = {
      id: dynamicUsersSize,
      name: newUserDetails.name,
      email: newUserDetails.email,
      address: { street: "", city: "", zipcode: "" },
    };
    setDynamicUsersSize(dynamicUsersSize + 1);
    setUsers([...users, tempObj]);
    setNewUserDetails({ ...newUserDetails, name: "", email: "" });
  };
  // initilazing users, posts and todos as a "DB"
  useEffect(() => {
    axios.get(USERS_URL).then(({ data }) => setUsers(data));
    axios.get(POSTS_URL).then(({ data }) => setPosts(data));
    axios.get(TODOS_URL).then(({ data }) => setTodos(data));
  }, []);

  // the following useEffect will listen to searchText.
  //  but for initial display it should listen
  //  to users (or any other state variable that has been initilized) as well
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, users]);
  useEffect(() => {
    if (counBlock < 2) {
      setCountBlock(counBlock + 1);
      setUsersSize(users.length);
    }
  }, [users]);

  useEffect(() => {
    setisOccupiedArr(Array(users.length).fill(false));
  }, [counBlock]);

  useEffect(() => {
    settodoCompleteStatus(Array(users.length).fill(false));
  }, [counBlock]);

  useEffect(() => {
    const tempArr = Array(
      Math.max(dynamicUsersSize + 1) // we need to make sure setting up an array
      // with at least the size of the lase inserted user id +1
    )
      .fill()
      .map(() => []);

    todos.forEach((todo) => tempArr[todo.userId - 1]?.push(todo.completed));

    tempArr.map((setCompletion, index) => {
      if (setCompletion.every((currentVal) => currentVal === true)) {
        todoCompleteStatus[index] = true;
        settodoCompleteStatus([...todoCompleteStatus]);
      } else {
        todoCompleteStatus[index] = false;
        settodoCompleteStatus([...todoCompleteStatus]);
      }
    });
  }, [todos, users]);

  useEffect(() => {
    setDynamicUsersSize(usersSize + 1);
  }, [usersSize]);

  return (
    <div className="main-app-container">
      <div className="users-container">
        <div id="search-tab">
          <label>Search : </label>
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button onClick={() => setIsNewUserDisplayed(true)}>Add</button>
        </div>
        {filteredUsers.map((user) => {
          return (
            <div key={user.id}>
              <User
                data={user}
                usersArray={users}
                setUsers={setUsers}
                setIsTodosPostsDisplayed={setIsTodosPostsDisplayed}
                setSelectedID={setSelectedID}
                setisOccupiedArr={setisOccupiedArr}
                isOccupiedArr={isOccupiedArr}
                todoCompleteStatus={todoCompleteStatus}
                setIsNewUserDisplayed={setIsNewUserDisplayed}
                setTodos={setTodos}
                todos={todos}
                setPosts={setPosts}
                posts={posts}
              ></User>
            </div>
          );
        })}
      </div>
      {isTodosPostsDisplayed && !isNewUserDisplayed && (
        <div className="posts-and-todos-container">
          <Todos id={selectedID} todos={todos} setTodos={setTodos}></Todos>
          <Posts id={selectedID} posts={posts} setPosts={setPosts}></Posts>
        </div>
      )}
      {isNewUserDisplayed && (
        <div className="add-new-user-container">
          <h4>Add new user</h4>
          <div className="inner-new-user-container">
            <div>
              <label>Name : </label>
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value !== "") {
                    handleAddNewUser();
                  }
                }}
                onChange={(e) =>
                  setNewUserDetails({ ...newUserDetails, name: e.target.value })
                }
                value={newUserDetails.name}
              ></input>
            </div>
            <div>
              <label>Email : </label>
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value != "") {
                    handleAddNewUser();
                  }
                }}
                onChange={(e) =>
                  setNewUserDetails({
                    ...newUserDetails,
                    email: e.target.value,
                  })
                }
                value={newUserDetails.email}
              ></input>
            </div>
            <div>
              <button onClick={() => setIsNewUserDisplayed(false)}>
                Cancel
              </button>
              <button onClick={handleAddNewUser}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
