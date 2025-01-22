const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");

router.get("/allPosts", requireLogin, (req, res) => {
  POST.find()
    .populate("postedBy", "name")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  console.log(pic);

  if (!body || !pic) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  req.user;
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name").then((myposts) => {
      res.json(myposts);
    });
});


router.put("/like", requireLogin, async (req, res) => {
  try {
    const result = await POST.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.user._id } },
      { new: true }
    ).populate("postedBy","_id name")
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err });
  }
});

router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const result = await POST.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).populate("postedBy","_id name")
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err });
  }
});

router.put("/comment", requireLogin, async (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  try {
    const result = await POST.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name");
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
  try {
     
      const post = await POST.findOne({ _id: req.params.postId }).populate("postedBy", "_id");

      if (!post) {
          return res.status(404).json({ error: "Post not found" });
      }

      
      if (post.postedBy._id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: "Unauthorized action" });
      }

        await post.deleteOne();

      res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});





router.get("/myfollwingpost",requireLogin,(req,res)=>{
  POST.find({postedBy:{$in:req.user.following}})
  .populate("postedBy","_id name")
.populate("comments.postedBy","_id name")
.then(posts=>{res.json(posts)})
.catch(err=>{console.log(err)})
})

router.put("/uploadProfilePic",requireLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.user._id,{
    $ser:{photo:req.body.pic}
  },{
    new:true
  }).exce((err,result)=>{
    if(err){
      res.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
})
module.exports = router;
