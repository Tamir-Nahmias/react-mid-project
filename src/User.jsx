import React, { useEffect, useState } from "react";
import OtherData from "./OtherData";

const User = ({
  data,
  usersArray,
  setUsers,
  setIsTodosPostsDisplayed,
  setSelectedID,
  setisOccupiedArr,
  isOccupiedArr,
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
      id={id}
      style={{
        backgroundColor:
          backGroundColor && isOccupiedArr[id - 1] ? "orange" : "unset",
      }}
    >
      <label
        onClick={() => {
          setIsTodosPostsDisplayed(true);
          setSelectedID(id);
          setBackGroundColor(true);
          setOccupiedHelper();
        }}
      >
        ID : {id}
      </label>
      <br></br>
      <label>Name : </label>
      <input
        type="text"
        defaultValue={name}
        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
      ></input>
      <br></br>
      <label>Email : </label>
      <input
        type="text"
        defaultValue={email}
        onChange={(e) =>
          setUpdateData({ ...updateData, email: e.target.value })
        }
      ></input>
      <div className="user-lower-section">
        <div
          style={{
            backgroundColor: "lightblue",
            width: "fit-content",
            cursor: "pointer",
          }}
          onMouseOver={() => setIsMouseOver(true)}
          onClick={() => setIsMouseOver(false)}
        >
          Other data
        </div>
        {isMouseOver && (
          <OtherData
            address={address}
            setIsMouseOver={setIsMouseOver}
            setUpdateData={setUpdateData}
            updateData={updateData}
          />
        )}
        <span>
          <button onClick={updateUser}>Update</button>
          <button onClick={deleteUser}>Delete</button>
        </span>
      </div>
    </div>
  );
};

export default User;
