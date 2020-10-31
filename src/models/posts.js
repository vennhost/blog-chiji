const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const postSchema = new Schema({
   title: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   post: String,
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
   }]
}, {
    timestamps: true
})

var Post = mongoose.model("Post", postSchema);


module.exports = Post;
