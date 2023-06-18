import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function JiraTableAll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8000/jiras/all`);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Summary</th>
          <th>Link</th>
          <th>Project Name</th>
          <th>Created Time</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.id}</td>
            <td>{item.summary}</td>
            <td>
              {" "}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            </td>
            <td>{item.projectName}</td>
            <td>{item.createdTime}</td>
            <td>{item.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JiraTableAll;
