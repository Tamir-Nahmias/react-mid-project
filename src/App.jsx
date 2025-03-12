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

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isTodosPostsDisplayed, setIsTodosPostsDisplayed] = useState(false);
  const [selectedID, setSelectedID] = useState(0); // needed to decide which specific user's todos and posts to show
  const [isOccupiedArr, setisOccupiedArr] = useState([]); // needed for bg coloring in orange
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
    setisOccupiedArr(Array(users.length).fill(false));
  }, []);

  // useEffect(() => {
  //   isTodosPostsDisplayed
  //     ? setBackGroundColor("orange")
  //     : setBackGroundColor("unset");
  // }, [isTodosPostsDisplayed]);

  return (
    <div className="main-app-container">
      <div className="users-container">
        <div>
          <label>Search</label>
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button>Add</button>
        </div>
        {filteredUsers.map((user) => {
          return (
            <div className="user" key={user.id}>
              <User
                data={user}
                usersArray={users}
                setUsers={setUsers}
                setIsTodosPostsDisplayed={setIsTodosPostsDisplayed}
                setSelectedID={setSelectedID}
                setisOccupiedArr={setisOccupiedArr}
                isOccupiedArr={isOccupiedArr}
              ></User>
            </div>
          );
        })}
      </div>
      {isTodosPostsDisplayed && (
        <div className="posts-and-todos-container">
          <Todos id={selectedID} todos={todos} setTodos={setTodos}></Todos>
          <Posts id={selectedID} posts={posts}></Posts>
        </div>
      )}
    </div>
  );
}

export default App;
