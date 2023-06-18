import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function JiraTable({ projectName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8000/jira/${projectName}`);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [projectName]);

  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Summary</th>
          <th>Description</th>

          <th>Created Time</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.id}</td>
            <td>{item.summary}</td>
            <td>{item.description}</td>

            <td>{item.createdTime}</td>
            <td>{item.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JiraTable;
