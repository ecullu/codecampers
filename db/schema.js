const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  // password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  

  linkedInId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  headline: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  pictureUrls: {
                _total: { type: String, required: true },
                values: { type: [String], required: true }
              },
  emailAddress: { type: String, required: true },
  // positions: {
  //             values: { type: [String], required: true }
  //             },
  // educations: {
  //             values: { type: [String], required: true }
  //             },

  githubName: { type: String },
  createdAt: { type: Date, default: Date.now },

})

module.exports = {
  User: createModel('User', usersSchema)
}
