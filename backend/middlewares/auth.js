const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async(req,res,next)=>{
    try {
        const {saptarshi_cms_token} = req.cookies;
        if(!saptarshi_cms_token){
            return res.status(401).json({
                message:"Please Login First"
            });
        }
        const decoded = await jwt.verify(saptarshi_cms_token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}