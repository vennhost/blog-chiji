const express = require("express")
const User = require("../../models/users")
const Post = require("../../models/posts");
const Comment = require("../../models/comments");
const mongoose = require("mongoose")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
  
      let user = new User({
        ...req.body
      });
  
      await user.save();
        console.log(req.body)
      res.send(user);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  });

router.get("/", async (req, res) => {
    
    try {
        const users = await User.find({})
        .populate("posts")
        res.send(users)
        
    } catch (error) {
        res.send(error)
        
    }

})

router.get("/:id", async (req, res) => {
    const isIDValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (isIDValid) {
    try {
        const user = await User.findOne({_id: req.params.id})
        .populate("comments");
        user ? res.send(user) : res.status(404).send("No user found!");
        res.send(user)
        
    } catch (error) {
        res.send(error)
        
    }

    }else {
        res.status(404).send("User ID not Valid")
    }

})



router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (user) {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.send({ message: "User Deleted", deletedUser });
      } else {
        res.status(401).send("You are not authorized to delete this User.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const userEdit = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...req.body }
        },
        { new: true }
      );
      res.send(userEdit);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });



module.exports = router;