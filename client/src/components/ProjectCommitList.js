import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectCommitList = ({ owner, repo }) => {
  const [contributorCommits, setContributorCommits] = useState([]);

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
      const contributorCommitsPromises = [];

      for (const contributor of contributors) {
        const author = contributor.login;
        const url = `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}`;

        contributorCommitsPromises.push(axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }));
      }

      Promise.all(contributorCommitsPromises)
        .then(responses => {
          const contributorCommits = responses.map(response => ({
            name: response.data[0].commit.author.name,
            commits: response.data.map(commit => ({
              message: commit.commit.message,
              date: commit.commit.author.date
            }))
          }));
          setContributorCommits(contributorCommits);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  }, [owner, repo]);

  return (
    <div className="container">
      <h2 className="mt-3 mb-4">Project Commits by Contributor</h2>
      {contributorCommits.map(contributor => (
        <div key={contributor.name} className="mb-4">
          <h3>{contributor.name}</h3>
          <ul className="list-group">
            {contributor.commits.map(commit => (
              <li key={commit.message} className="list-group-item">
                <div className="d-flex flex-row justify-content-between">
                  <div className="mr-3">{commit.message}</div>
                  <div className="text-muted">{new Date(commit.date).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectCommitList;
