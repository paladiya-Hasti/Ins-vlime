const express = require("express");
const app = express();
const DBconnect = require("./config/data");
require("./models/model")
require("dotenv").config();
require("./models/post")
const cors = require('cors');
app.use(cors());
const port = 5000;
console.log(process.env);

app.use(express.json())
app.use(require("./router/auth"))
app.use(require("./router/createPost"))
app.use(require("./router/user"))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
DBconnect()
});
