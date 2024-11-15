const User = require("../models/User");

exports.register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"User already exists",
            userDetails:user
        });
    }
    
    user = await User.create({
        name,email,password
    });
    const token = await user.generateToken();
    res.status(200).cookie("saptarshi_cms_token",token,{expires:new Date(Date.now()+90 * 24 * 60 * 60 * 1000),sameSite:"None",secure:true,httpOnly:true}).json({
        success:true,
        message:"user created",
        user:user
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user doesnot exist"
            })
        }
        const token = await user.generateToken();
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password Entered"
            })
        }
        res.status(200).cookie("saptarshi_cms_token",token,{expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            sameSite:"None",secure:true,httpOnly:true}).json({
                success:true,
                message:"Login Successful",
                user:user
            })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.me = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res
        .status(500)
        .json({
                success:false,
                message:"Server Error",
                errorMessage:error.message
            });
    }
}