const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    userRoleName: { type: String },
    fname: { type: String },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    userStatus: { type: Boolean },
    orangeHrLink: { type: String },
    GitHubUsername: { type: String },
    userJiraLink: { type: String },

    userImage: [{ type: Object}],
    feedback: { type: String},
    rating: { type: String},
    approveStatus:{type: Boolean, default: false},
    submittedOn: {type: Date, default: new Date()},
    taken: {type:String},
    commitCount:{type:Number},
    forgotPasswordLink:{type: String},
    

    notification: [
      {
        message:{type: String},
        timeDate: {type: Date, default: Date.now()},
        status: {type: Boolean, default: false}
      }
    ]

  },
  {
    collection: "userRoles",
  }
);
const model = mongoose.model("UserData", User);
module.exports = model;
