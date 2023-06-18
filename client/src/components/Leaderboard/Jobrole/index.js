import React, { useState } from "react";
import styles from "./styles.module.css";

const userRoleNames = ["developer", "QA", "Techlead", "BA"];

const UserRoleName = ({ userRoleName }) => {
  const [selectedUserRoleName, setSelectedUserRoleName] = useState("");
  const handleRadioChange = (event) => {
    setSelectedUserRoleName(event.target.value);
    userRoleName(event.target.value);
  };

  const handleClearFilter = () => {
    setSelectedUserRoleName("");
    userRoleName("");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Filter By Job Role</h1>
      {userRoleNames.map((userRoleName) => (
        <div key={userRoleName} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="userRoleName"
            value={userRoleName}
            checked={selectedUserRoleName === userRoleName}
            onChange={handleRadioChange}
            id={`userRoleName${userRoleName}`}
          />
          <label className="form-check-label" htmlFor={`userRoleName${userRoleName}`}>
            {userRoleName}
          </label>
        </div>
      ))}
      <hr />
      {selectedUserRoleName && (
        <div>
          <p>Selected Job Role: {selectedUserRoleName}</p>
          <button onClick={handleClearFilter}>Clear Filter</button>
        </div>
      )}
    </div>
  );
};
export default UserRoleName;
