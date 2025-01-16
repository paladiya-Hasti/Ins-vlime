const mongoose=require("mongoose")
require("dotenv").config();
URL=process.env.URL
const DBconnect=async()=>{
  try {
    await mongoose.connect(URL)
    console.log("connect database");
  } catch (error) {
    console.log(error);
    
  }
}

module.exports=DBconnect
