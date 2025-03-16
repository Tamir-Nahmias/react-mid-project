import React, { useState } from "react";

const OtherData = ({ address, setIsMouseOver, updateData, setUpdateData }) => {
  const { street, city, zipcode } = address;
  const [addressHelper, setAddressHelper] = useState({
    street: "",
    city: "",
    zipcode: "",
  }); // inner state varilable obj
  return (
    <div
      className="other-data-container"
      //   onClick={() => setIsMouseOver(false)}
    >
      <div>
        <label>Street : </label>
        <input
          type="text"
          defaultValue={street}
          onChange={(e) => {
            setAddressHelper({ ...addressHelper, street: e.target.value });
            setUpdateData({
              ...updateData,
              address: { ...address, ...addressHelper },
            });
          }}
        ></input>
      </div>

      <div>
        <label>City : </label>
        <input
          type="text"
          defaultValue={city}
          onChange={(e) => {
            setAddressHelper({ ...addressHelper, city: e.target.value });
            setUpdateData({
              ...updateData,
              address: { ...address, ...addressHelper },
            });
          }}
        ></input>
      </div>

      <div>
        <label>Zipcode : </label>
        <input
          type="text"
          defaultValue={zipcode}
          onChange={(e) => {
            setAddressHelper({ ...addressHelper, zipcode: e.target.value });
            setUpdateData({
              ...updateData,
              address: { ...address, ...addressHelper },
            });
          }}
        ></input>
      </div>
    </div>
  );
};

export default OtherData;
