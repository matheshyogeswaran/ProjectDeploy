const express = require("express");
const userRoute = express.Router();
const User = require("../models/user.model");
const fetch = require("node-fetch");
const axios = require("axios");

//git count
// async function updateUserCommitCount(username) {
//   try {
//     const response = await axios.get(
//       `https://api.github.com/users/${username}/repos`
//     );
//     const repos = response.data;

//     const commitCountByContributor = {};

//     for (const repo of repos) {
//       const response = await axios.get(
//         `https://api.github.com/repos/${username}/${repo.name}/commits`
//       );
//       const commits = response.data;

//       for (const commit of commits) {
//         const contributor = commit.author.login;

//         if (commitCountByContributor[contributor]) {
//           commitCountByContributor[contributor]++;
//         } else {
//           commitCountByContributor[contributor] = 1;
//         }
//       }
//     }

//     const contributors = Object.keys(commitCountByContributor);

//     for (const contributor of contributors) {
//       const user = await User.findOne({ GitHubUsername: contributor });

//       if (user) {
//         await User.updateOne(
//           { _id: user._id },
//           { $set: { commitCount: commitCountByContributor[contributor] } }
//         );
//       }
//     }

//     console.log(commitCountByContributor);
//     console.log("User commit counts updated");
//   } catch (error) {
//     console.error(error);
//   }
// }
// const username = "dreamshack1999";

// // Call the function initially
// updateUserCommitCount(username);

// // Schedule the function to be called every 6 hours
// const interval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
// setInterval(() => {
//   updateUserCommitCount(username);
// }, interval);

userRoute.route("/users/getUserNotifications/:userID").get(function (req, res) {
  const userID = req.params.userID;
  User.find({ _id: userID }, { notification: 1 }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

userRoute.route("/users/updateUserProfile").post(function (req, res) {
  const userID = req.body.userID;
  const updateObject = {
    GitHubUsername: req.body.newGithub,
    userJiraLink: req.body.newJira,
    orangeHrLink: req.body.newOrange,
    phone: req.body.newPhone
  }
  User.findOneAndUpdate({_id: userID},{$set:updateObject},(err, userData)=>{
    console.log(userData)
    res.json({message:"Successfully updated"})
  })
});


userRoute.route("/users/updateNotificationStatus").post(function (req, res) {
  const nid = req.body.nid;
  const uid = req.body.userID;

  User.findById(uid, (err, user) => {
    if (err) {
      res.status(500).json({ status: false, message: "Server Error" });
    } else {
      const notification = user.notification.find((notif) =>
        notif._id.equals(nid)
      );
      if (notification) {
        notification.status = true;
        user.save((err) => {
          if (err) {
            res.status(500).json({ status: false, message: "Server Error" });
          } else {
            res.json({ status: true, message: "Seen" });
          }
        });
      } else {
        res
          .status(404)
          .json({ status: false, message: "Notification not found" });
      }
    }
  });
});

// userRoute.route("/users/updateNotificationStatus").post(function (req, res) {
//   const nid = req.body.nid;
//   const uid = req.body.userID;
//   // console.log("Hello" + nid);
//   User.find({ _id: uid }, (err, users) => {
//     if (err) {
//       res.send(err);
//     } else {
//       const notification = users[0].notification.find((notif) =>
//         notif._id.equals(nid)
//       );
//       notification.status = true;
//       users.save((err) => {
//         if (err) {
//           res.json({ status: false, message: "failed" });
//         }else{
//           res.json({status:true, message:"Seen"})
//         }
//       });
//     }
//   });
// });

userRoute.route("/users/all").get(function (req, res) {
  const { userRoleName, sortBy, sortOrder } = req.query;
  const query = userRoleName ? { userRoleName } : {};
  let sortCriteria = {};
  // if (sortBy === "fname") {
  //   sortCriteria.fname = sortOrder === "asc" ? 1 : -1;
  // } else 
  if (sortBy === "rating") {
    sortCriteria.rating = sortOrder === "asc" ? 1 : -1;
  }
  User.find(query, {
    _id: 1,
    fname: 1,
    rating: 1,
    GitHubUsername: 1,
    userRoleName: 1,
    commitCount: 1,
  })
    .sort(sortCriteria)
    .exec((err, users) => {
      if (err) {
        res.send(err);
      } else {
        const parsedUsers = users.map((user) => ({
          _id: user._id,
          fname: user.fname,
          rating: parseInt(user.rating),
          userRoleName: user.userRoleName,
          GitHubUsername: user.GitHubUsername,
          commitCount: user.commitCount,
        }));
        res.json(parsedUsers);
      }
    });
});

//orange hr leave fetch
userRoute.route("/users/leave/:id").get(function (req, res) {
  User.find({ _id: req.params.id }, { taken: 1 }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});
//verify user
userRoute.route("/users/verifyuser").post(async (req, res) => {
  const result = req.body.result;
  const userID = req.body.userid;
  if (result === "allow") {
    User.updateOne({ _id: userID }, { $set: { approveStatus: true } })
      .then((result) => {
        console.log(result);
        return res.json({
          message: "User Verified Successfully",
          status: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          message: "Error in Verifying the User Role",
          status: false,
        });
      });
  } else if (result === "deny") {
    const deletedDocument = await User.findByIdAndDelete(userID);
    return res.json({
      message: "User Deleted Successfully",
      status: true,
      data: deletedDocument,
    });
  } else {
    return res.json({
      message: "Unknown Status",
      status: false,
    });
  }
});

//get which users a want to approve by admin
userRoute.route("/users/usersToApproved").get(function (req, res) {
  User.find({ approveStatus: false }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

// get rate of users ratings
userRoute.route("/users/getRate").get(function (req, res) {
  User.find(
    {},
    { _id: 1, fname: 1, rating: 1, GitHubUsername: 1 },
    (err, users) => {
      if (err) {
        res.send(err);
      } else {
        const parsedUsers = users.map((user) => ({
          _id: user._id,
          fname: user.fname,
          rating: parseInt(user.rating),
        }));
        res.json(parsedUsers);
      }
    }
  );
});

// add ratings for user
userRoute.route("/users/addRate").post(async (req, res) => {
  const rating = {
    rating1: parseInt(req.body.rating1),
    rating2: parseInt(req.body.rating2),
  };
  const rate = rating.rating1 + rating.rating2;

  User.updateOne(
    { _id: req.body.id },
    {
      $set: {
        rating: rate,
      },
    }
  )
    .then((result) => {
      return res.json({
        message: "rated successfully",
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        message: "Error in rating",
        status: false,
      });
    });
});

// get find by name
userRoute.route("/users/getFind").get(function (req, res) {
  User.find({ fname: { $in: ["MA"] } }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

//get BA users
userRoute.route("/users/getBA").get(function (req, res) {
  User.find({ userRoleName: { $in: ["BA"] } }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

// get QA users
userRoute.route("/users/getQA").get(function (req, res) {
  User.find({ userRoleName: { $in: ["QA"] } }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

//get developer
userRoute.route("/users/getDeveloper").get(function (req, res) {
  User.find({ userRoleName: { $in: ["Developer"] } }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

// get techlead
userRoute.route("/users/getTechLead").get(function (req, res) {
  User.find(
    { userRoleName: "Techlead" },
    { fname: 1, lname: 1 },
    (err, users) => {
      if (err) {
        res.send(err);
      } else {
        // const usersArray = projects.map((item) => item.users);
        // res.json(usersArray);
        res.json(users);
      }
    }
  );
});

// get members Profile
userRoute.route("/users/getMembersProfile/:id").get(function (req, res) {
  User.find({ _id: req.params.id }, {}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});
// get members
userRoute.route("/users/getMembers").get(function (req, res) {
  User.find(
    { userRoleName: { $in: ["developer", "QA", "BA"] } },
    { fname: 1, lname: 1 },
    (err, users) => {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    }
  );
});
// get all contributors
userRoute.route("/users/getContributors").get(function (req, res) {
  User.find(
    { userRoleName: { $in: ["Developer", "QA", "BA"] } },
    { fname: 1, lname: 1 },
    (err, users) => {
      if (err) {
        res.send(err);
      } else {
        var convertArray = users.map((item) => {
          return { value: item._id, label: item.fname + " " + item.lname };
        });
        res.json(convertArray);
      }
    }
  );
});

userRoute.route("/users/getBA").get(function (req, res) {
  User.find({ userRoleName: { $in: ["BA"] } }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

userRoute.route("/users/getTechLead/alphabet").get(function (req, res) {
  userQuery = { userRoleName: "Techlead" };
  sortQuery = { fname: 1 };
  User.find(userQuery, { fname: 1 }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  }).sort(sortQuery);
});

userRoute.route("/users/getQA/alphabet").get(function (req, res) {
  userQuery = { userRoleName: "QA" };
  sortQuery = { fname: 1 };
  User.find(userQuery, { fname: 1 }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  }).sort(sortQuery);
});

userRoute.route("/users/getBA/alphabet").get(function (req, res) {
  userQuery = { userRoleName: "BA" };
  sortQuery = { fname: 1 };
  User.find(userQuery, { fname: 1 }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  }).sort(sortQuery);
});

userRoute.route("/users/getDeveloper/alphabet").get(function (req, res) {
  userQuery = { userRoleName: "Developer" };
  sortQuery = { fname: 1 };
  User.find(userQuery, { fname: 1 }, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  }).sort(sortQuery);
});

// userRoute.route("/users/getBA/alphabet").get(function (req, res) {
//   sortQuery1 = req.query.sortAsc == 1 ? {fname: 1} : {}
//   User.find({ userRoleName: { $in: ["BA"] } }, (err, users) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(users);
//       }
//     }
//   ).sort(sortQuery);
// });

// userRoute.route("/users/getQA/alphabet").get(function (req, res) {
//   sortQuery = req.query.sortAsc == 1 ? {fname: 1} : {}
//   User.find({ userRoleName: { $in: ["QA"] } }, (err, users) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(users);
//       }
//     }
//   ).sort(sortQuery);
// });

// userRoute.route("/users/getTechlead/alphabet").get(function (req, res) {
//   sortQuery = req.query.sortAsc == 1 ? {fname: 1} : {}
//   User.find({ userRoleName: { $in: ["Teahlead"] } }, (err, users) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(users);
//       }
//     }
//   ).sort(sortQuery);
// });

// userRoute.route("/users").get(function (req, res) {
//   userQuery = req.query.roleName ? {userRoleName: req.query.roleName} : {}
//   sortQuery = req.query.sortAsc == 1 ? {fname: 1} : {}
//   User.find(
//     userQuery,
//     (err, users) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(users);
//       }
//     }
//   ).sort(sortQuery);
// });

// userRoute.route("/user/alphabet").get(function (req, res) {
//   userQuery = req.query.roleName ? {userRoleName: req.query.roleName} : {}
//   sortQuery = req.query.sortAsc == 1 ? {fname: 1} : {}
//   User.find(
//     userQuery,
//     (err, users) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(users);
//       }
//     }
//   ).sort(sortQuery);
// });

// userRoute.route("/user/commits").get(async function (req, res) {
//   userQuery = req.query.roleName ? {userRoleName: req.query.roleName} : {}

//   const owner = req.query.owner;
//   const repo = req.query.repo;

//   try {
//     const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);
//     const commitCount = response.data.length;
//     res.json({ commitCount });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch commit count." });
//   }

//   sortQuery = req.query.sortAsc == 1 ? {commitCount: 1} : {}
//   User.find(
//     userQuery,
//     (err, users) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(users);
//       }
//     }
//   ).sort(sortQuery);
// });

userRoute.route("/users/getLogin").get(async function (req, res) {
  const { GitHubUsername } = req.query;

  // Make request to GitHub API to retrieve number of commits for user
  const response = await fetch(
    `https://api.github.com/users/${GitHubUsername}/events`
  );
  const events = await response.json();
  const commits = events.filter((event) => event.type === "PushEvent");
  //.reduce((acc, event) => acc + event.payload.commits.length, 0);

  res.json({ commits });
});

module.exports = userRoute;
