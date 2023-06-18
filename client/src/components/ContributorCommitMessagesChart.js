import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

function ContributorCommitMessagesChart({ owner, repo }) {
  const [contributorMessages, setContributorMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
      const data = await response.json();
      const contributors = Array.from(new Set(data.map(commit => commit.author.login)));
      const messagesByContributor = contributors.map(contributor => {
        const messages = data.filter(commit => commit.author.login === contributor)
                            .map(commit => commit.commit.message);
        const name = data.find(commit => commit.author.login === contributor).commit.author.name;
        return { contributor, name, messages, commitCount: messages.length };
      });
      setContributorMessages(messagesByContributor);
    }

    fetchData();
  }, [owner, repo]);

  const chartData = {
    labels: contributorMessages.map(contributor => contributor.name),
    datasets: [
      {
        label: 'Commit Count',
        data: contributorMessages.map(contributor => contributor.commitCount),
        backgroundColor: '#4dc9f6',
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
          <h2 className="h6 card-title">Contributors vs Commit Count</h2>
        </div>
        
        <div className="card-body">
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div className="card-footer text-muted">
          Data fetched from{' '}
          <a href={`https://github.com/${owner}/${repo}/commits`} target="_blank" rel="noopener noreferrer">
            GitHub API
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContributorCommitMessagesChart;
