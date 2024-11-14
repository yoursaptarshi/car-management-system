const app =require("./app.js");
const {connectDB} = require('./config/database.js')
// config/cloudinary.js
const cloudinary = require('cloudinary').v2;



module.exports = cloudinary;

const PORT = process.env.PORT;
connectDB();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})