const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");

router.get("./allPosts",requireLogin, (req, res) => {
  POST.find()
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});
router.post("/createpost", requireLogin, (req, res) => {
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

module.exports = router;
