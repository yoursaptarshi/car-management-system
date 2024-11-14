const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
    type:String,
    required:[true,"Enter a unique username"],
    unique:[true,"Username already exists"]
    },
    password:{
        type:String,
        required:[true],
        minlength:[5,"password must be atleast 6 characters"]
    }
})

//hash password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

//function to compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//generate jwt token
userSchema.methods.generateToken = function(){
    console.log(1);
    return jwt.sign({_id:this._id},process.env.JWT_SECRET);
}
module.exports = mongoose.model("User",userSchema);