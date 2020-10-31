const express = require('express');
const router = express.Router();
 const Post = require("../../models/posts");
const User = require("../../models/users");
const Comment = require("../../models/comments");
const db = require("../../models");

router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const comments = await Comment.find({}).sort(mySort)
    .populate("user")
    res.send(comments)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const comment = await (await Comment.findById(req.params.id))
    .populate("user")
    res.send(comment)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});


router.post("/", async (req, res) => {
  try {

    let comment = new Comment({
      ...req.body
    });

    await comment.save();
      console.log(req.body)
    await Post.findByIdAndUpdate(req.body.post._id, {
      $push: {
        comment: comment._id
      }
    })
    await User.findByIdAndUpdate(req.body.user._id, {
        $push: {
          comment: comment._id
        }
      })


    comment = await (await Comment.findById(comment._id).populate({path: "post",  populate: {path: "posts"}}));
    res.send(comment);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const commentEdit = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body }
      },
      { new: true }
    );
    res.send(commentEdit);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (comment) {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      res.send({ message: "Comment Deleted", deletedComment });
    } else {
      res.status(401).send("You are not authorized to delete this Comment.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;