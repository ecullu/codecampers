const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------

const Position = new Schema({
  summary: { type: String, required: true },
  title: { type: String, required: true },
  company: { 
              name: {type: String, required: true }
            }
})

const usersSchema = new Schema({
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  

  linkedInId: { type: String, required: true },
  emailAddress: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  headline: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  pictureUrls: {
    _total: { type: String, required: true },
    values: { type: [String], required: true }
  },
  positions: {
    _total: { type: String, required: true },
    values: { type: [Position], required: true }
  },
  personal: {
    githubName: { type: String, required: true},
    degree: { type: String },
    portfolioUrl: { type: String }
  },
  bootcamp: {
    campName: { type: String, required: true },
    location: { type: String, required: true },
    course: { type: String, required: true }
  },
  review: {
    ratio: { type: String },
    investment: { type: String },
    advantages: { type: String },
    instructor: { type: String }
  },
  createdAt: { type: Date, default: Date.now },

})

module.exports = {
  User: createModel('User', usersSchema)
}
