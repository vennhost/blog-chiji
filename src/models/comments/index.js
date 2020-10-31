const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
   },
   comment: String
}, {
    timestamps: true
})


module.exports = mongoose.model('Comment', commentSchema);