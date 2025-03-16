import React, { useState } from "react";
import OtherData from "./OtherData";

const User = ({
  data,
  usersArray,
  setUsers,
  setIsTodosPostsDisplayed,
  setSelectedID,
  setisOccupiedArr,
  isOccupiedArr,
  todoCompleteStatus,
  setIsNewUserDisplayed,
  setTodos,
  todos,
  setPosts,
  posts,
}) => {
  const { id, name, email, address } = data;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: name,
    email: email,
    address: address,
  });
  const [backGroundColor, setBackGroundColor] = useState(false);

  const deleteUser = () => {
    setUsers(usersArray.filter((user) => user.id !== id));
    setTodos(todos.filter((todo) => todo.userId !== id)); // deleting all of the associated todos of a certain user
    setPosts(posts.filter((post) => post.userId !== id)); // deleting all of the associated posts of a certain user
    if (isOccupiedArr[id - 1]) setIsTodosPostsDisplayed(false);
  };

  const updateUser = () => {
    setUsers(
      usersArray.map((user) => {
        if (user.id === id) {
          return { ...user, ...updateData };
        }
        return user;
      })
    );
  };

  function setOccupiedHelper() {
    const tempArr = [...isOccupiedArr];
    tempArr.fill(false); // first, turnning off all other users that might be turned on
    tempArr[id - 1] = true; //then set the specific user id to turn on true to set bg color
    setisOccupiedArr([...tempArr]);
  }

  return (
    <div
      className="user"
      id={id}
      style={{
        backgroundColor:
          backGroundColor && isOccupiedArr[id - 1] ? "orange" : "unset",
        borderColor: todoCompleteStatus[id - 1] ? "lime" : "red",
      }}
    >
      <div>
        <label
          className="users-label"
          onClick={() => {
            setIsTodosPostsDisplayed(true);
            setSelectedID(id);
            setBackGroundColor(true);
            setOccupiedHelper();
            setIsNewUserDisplayed(false);
          }}
        >
          ID : {id}
        </label>
      </div>

      <div>
        <label>Name : </label>
        <input
          type="text"
          defaultValue={name}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        ></input>
      </div>

      <div>
        <label>Email : </label>
        <input
          type="text"
          defaultValue={email}
          onChange={(e) =>
            setUpdateData({ ...updateData, email: e.target.value })
          }
        ></input>
      </div>
      <div
        className="user-lower-section"
        style={{ flexDirection: isMouseOver ? "column" : "row" }}
      >
        <div
          className="other-data-div"
          onMouseOver={() => setIsMouseOver(true)}
          onClick={() => setIsMouseOver(false)}
        >
          Other data
        </div>
        <div>
          {isMouseOver && (
            <OtherData
              address={address}
              setIsMouseOver={setIsMouseOver}
              setUpdateData={setUpdateData}
              updateData={updateData}
            />
          )}
        </div>
        <div className="buttons-in-lower-user-card">
          <button onClick={updateUser}>Update</button>
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default User;
