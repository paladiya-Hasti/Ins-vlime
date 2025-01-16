


// router.get("/",(req,res)=>{
//   res.send("hello world")
// })
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, userName, email, password } = req.body;

//     if (!name || !userName || !email || !password) {
//       return res.status(422).json({ error: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
//     if (existingUser) {
//       return res
//         .status(422)
//         .json({ error: "User already exists with that email or username" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new USER({
//       name,
//       userName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/signin",(req,res)=>{
//   const {email,password}=req.body
//   if ( !email || !password) {
//     return res.status(422).json({ error: "All fields are required" });}
//     User.findOne({$for:[{email:email},{userName:userName}]})
// })
  




// module.exports = router;

const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require('jsonwebtoken');
const USER = require("../models/model");
router.get('/', (req, res) => {
  res.send("hello")
})

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !email || !userName || !password) {
      return res.status(422).json({ error: "Please add all the fields" })
  }
  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
      if (savedUser) {
          return res.status(422).json({ error: "User already exist with that email or userName" })
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {

          const user = new USER({
              name,
              email,
              userName,
              password: hashedPassword
          })

          user.save()
              .then(user => { res.json({ message: "Registered successfully" }) })
              .catch(err => { console.log(err) })
      })
  })




})

// router.post("/signin", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       return res.status(422).json({ error: "Please add email and password" })
//   }
//   USER.findOne({ email: email }).then((savedUser) => {
//       if (!savedUser) {
//           return res.status(422).json({ error: "Invalid email" })
//       }
//       res.send("ok")
//       bcrypt.compare(password, savedUser.password).then((match) => {
//         if (!match) {
//             return res.status(200).json({ message: "Signed in Successfully" })
//         } else {
//             return res.status(422).json({ error: "Invalid password" })
//         }
//     })
//           .catch(err => console.log(err))
//   })
// })



router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" })
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" })
        }
        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                // return res.status(200).json({ message: "Signed in Successfully" })
                const token = jwt.sign({ _id: savedUser.id },process.env.JWT_SECRET)
                const { _id, name, email, userName } = savedUser

                res.json({ token, user: { _id, name, email, userName } })

                console.log({ token, user: { _id, name, email, userName } })
            } else {
                return res.status(422).json({ error: "Invalid password" })
            }
        })
            .catch(err => console.log(err))
    })
})

module.exports = router;
