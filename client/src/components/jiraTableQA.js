import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function JiraTableQA() {
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
    <table className="table table-striped table-bordered  border border-dark">
      <thead className="thead-dark">
        <tr>
        <th className="text-white bg-dark text-center">ID</th>
        <th className="text-white bg-dark text-center">Description</th>
        <th className="text-white bg-dark text-center">Project Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="text-center">{item.id}</td>
        <td className="text-center">{item.description}</td>
        <td className="text-center">{item.projectName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JiraTableQA;
