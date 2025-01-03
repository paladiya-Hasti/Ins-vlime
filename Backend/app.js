const express = require("express");
const app = express();
const DBconnect = require("./config/data");
require("./models/model")
const cors=require("cors")
const port = 5000;

app.use(cors())
app.use(express.json())
app.use(require("./router/auth"))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
DBconnect()
});
