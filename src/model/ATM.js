const mongoose=require("mongoose")


const ATMschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true

    },
    accountnumber:{
        type:Number,
        required:true,
        unique:true

    },
    confirmnumber:{
        type:Number,
        required:true,
        unique:true

    },
    balance:{
        type:Number,
        default:1000
    
    }

    
})
const Account=new mongoose.model("Account",ATMschema)

module.exports=Account
