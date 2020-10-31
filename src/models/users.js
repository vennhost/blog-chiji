const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   fname: String,
   lname: String,
   email: String,
   posts: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
   }]
});

var User = mongoose.model("User", userSchema);

// Export model
module.exports = User;

