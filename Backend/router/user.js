const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const USER = mongoose.model("USER");
const POST = mongoose.model("POST");

router.get("/user/:id", async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await POST.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "_id"
    );

    res.status(200).json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/follow",requireLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user._id}
  },{
    new:true
  },(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    USER.findByIdAndUpdate(req.user._id,{
      $push:{following:req.body.followId}
    },{
      new:true
    }).then(res=>res.json())
    .then(err=>{return res.status(422).json({error:err})})
  })
})

router.put("/unfollow",requireLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.body.followId,{
    $pull:{followers:req.user._id}
  },{
    new:true
  },(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    USER.findByIdAndUpdate(req.user._id,{
      $pull:{following:req.body.followId}
    },{
      new:true
    }).then(res=>res.json())
    .then(err=>{return res.status(422).json({error:err})})
  })
})

router.put("/uploadProfilePic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: er });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
