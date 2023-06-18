import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ProjectCommitChart = ({ owner, repo }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const authToken = "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";
    const contributorsUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;

    axios.get(contributorsUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(contributorsResponse => {
      const contributors = contributorsResponse.data;
      const contributorPromises = [];

      for (const contributor of contributors) {
        const author = contributor.login;
        const url = `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}`;

        contributorPromises.push(axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }));
      }

      Promise.all(contributorPromises)
        .then(responses => {
          const contributorCommits = responses.map(response => ({
            name: response.data[0].commit.author.name,
            commitCount: response.data.length,
          }));
          setContributors(contributorCommits);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  }, [owner, repo]);

  const data = {
    labels: contributors.map(contributor => contributor.name),
    datasets: [
      {
        label: 'Contributor Commits',
        data: contributors.map(contributor => contributor.commitCount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="container">
      <h3 className="mt-3 mb-4">Project Commits by Contributor Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProjectCommitChart;
