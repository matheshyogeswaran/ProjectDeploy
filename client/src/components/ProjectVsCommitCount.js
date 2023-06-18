import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function ProjectVsCommitCount({ owner }) {
  const [projectCommitCounts, setProjectCommitCounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.github.com/users/${owner}/repos`
      );
      const data = await response.json();
      const projects = data.map((repo) => repo.name);
      const commitCountsByProject = await Promise.all(
        projects.map(async (project) => {
          const commitResponse = await fetch(
            `https://api.github.com/repos/${owner}/${project}/commits`
          );
          const commitData = await commitResponse.json();
          const commitCount = commitData.length;
          return { project, commitCount };
        })
      );
      setProjectCommitCounts(commitCountsByProject);
    }

    fetchData();
  }, [owner]);

  const chartData = {
    labels: projectCommitCounts.map((project) => project.project),
    datasets: [
      {
        label: "My Commit Count",
        data: projectCommitCounts.map((project) => project.commitCount),
        backgroundColor: "#4dc9f6",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };

  return (
    <div className="container mt-3">
      <div className="card mb-3">
        <div className="card-header">
          <h2 className="h6 card-title">Commit Count by {owner}</h2>
        </div>

        <div className="card-body">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="card-footer text-muted">
          Data fetched from{" "}
          <a
            href={`https://github.com/${owner}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub API
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectVsCommitCount;
