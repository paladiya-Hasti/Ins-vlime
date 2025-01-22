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


// router.put("/follow",requireLogin,(req,res)=>{
//   USER.findByIdAndUpdate(req.body.followId,{
//     $push:{followers:req.user._id}
//   },{
//     new:true
//   },(err,result)=>{
//     if(err){
//       return res.status(422).json({error:err})
//     }
//     USER.findByIdAndUpdate(req.user._id,{
//       $push:{following:req.body.followId}
//     },{
//       new:true
//     }).then(res=>res.json())
//     .then(err=>{return res.status(422).json({error:err})})
//   })
// })

// router.put("/unfollow",requireLogin,(req,res)=>{
//   USER.findByIdAndUpdate(req.body.followId,{
//     $pull:{followers:req.user._id}
//   },{
//     new:true
//   },(err,result)=>{
//     if(err){
//       return res.status(422).json({error:err})
//     }
//     USER.findByIdAndUpdate(req.user._id,{
//       $pull:{following:req.body.followId}
//     },{
//       new:true
//     }).then(res=>res.json())
//     .then(err=>{return res.status(422).json({error:err})})
//   })
// })


// Follow API
router.put("/follow", requireLogin, async (req, res) => {
  try {
    // दूसरे उपयोगकर्ता के followers में लॉग-इन उपयोगकर्ता को जोड़ें
    const followedUser = await USER.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    );

    if (!followedUser) {
      return res.status(404).json({ error: "User to follow not found" });
    }

    // लॉग-इन उपयोगकर्ता के following में दूसरे उपयोगकर्ता को जोड़ें
    const currentUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $push: { following: req.body.followId } },
      { new: true }
    );

    res.json({ followedUser, currentUser });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

// Unfollow API
router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    // दूसरे उपयोगकर्ता के followers से लॉग-इन उपयोगकर्ता को हटाएँ
    const unfollowedUser = await USER.findByIdAndUpdate(
      req.body.followId,
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    if (!unfollowedUser) {
      return res.status(404).json({ error: "User to unfollow not found" });
    }

    // लॉग-इन उपयोगकर्ता के following से दूसरे उपयोगकर्ता को हटाएँ
    const currentUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.body.followId } },
      { new: true }
    );

    res.json({ unfollowedUser, currentUser });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});


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
