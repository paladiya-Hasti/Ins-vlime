const mongoose=require("mongoose")
require("dotenv").config();

const DBconnect=async()=>{
  try {
    await mongoose.connect("mongodb+srv://ins-clone-11:hasti1234@cluster0.c7xkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("connect database");
  } catch (error) {
    console.log(error);
    
  }
}

module.exports=DBconnect
