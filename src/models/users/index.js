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


module.exports = mongoose.model('User', userSchema);