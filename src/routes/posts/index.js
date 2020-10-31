const express = require('express');
const router = express.Router();
const Post = require("../../models/posts");
const User = require("../../models/users");

router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const posts = await Post.find({}).sort(mySort)
    .populate("comments")
    res.send(posts)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const post = await (await Post.findById(req.params.id))
    .populate("comments")
    res.send(post)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});


router.post("/", async (req, res) => {
  try {

    let post = new Post({
      ...req.body
    });

    await post.save();
      console.log(req.body)
    await User.findByIdAndUpdate(req.body.user._id, {
      $push: {
        post: post._id
      }
    })


    post = await Post.findById(post._id).populate("user");
    res.send(post);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postEdit = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body }
      },
      { new: true }
    );
    res.send(postEdit);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post) {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      res.send({ message: "Post Deleted", deletedPost });
    } else {
      res.status(401).send("You are not authorized to delete this Post.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;