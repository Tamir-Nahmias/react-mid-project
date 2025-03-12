import React, { useState } from "react";

const OtherData = ({ address, setIsMouseOver, updateData, setUpdateData }) => {
  const { street, city, zipcode } = address;
  return (
    <div
      //   onClick={() => setIsMouseOver(false)}
      style={{ backgroundColor: "lime", width: "fit-content" }}
    >
      <label>Street : </label>
      <input
        type="text"
        defaultValue={street}
        onChange={(e) =>
          setUpdateData({
            ...updateData,
            address: { ...address, street: e.target.value },
          })
        }
      ></input>
      <br></br>
      <label>City : </label>
      <input
        type="text"
        defaultValue={city}
        onChange={(e) =>
          setUpdateData({
            ...updateData,
            address: { ...address, city: e.target.value },
          })
        }
      ></input>
      <br></br>
      <label>Zipcode : </label>
      <input
        type="text"
        defaultValue={zipcode}
        onChange={(e) =>
          setUpdateData({
            ...updateData,
            address: { ...address, zipcode: e.target.value },
          })
        }
      ></input>
    </div>
  );
};

export default OtherData;
