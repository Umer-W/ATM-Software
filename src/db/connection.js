const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/ATM-Database")
.then(()=>{
    console.log("ATM-Database connected successfully")
})
.catch((err)=>{
    console.log(err)
})
