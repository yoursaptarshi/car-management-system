const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User")
const carRoutes = require("./routes/Car")

require("dotenv").config({path:"../backend/config/config.env"})
const fileUpload = require('express-fileupload');

const app = express();



app.use(cors({
    origin:process.env.frontendURI,
    credentials:true,
    httpOnly:true,
    path:"/",
    secure:true,
    sameSite:"None"
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(fileUpload({
    useTempFiles: true,
  }));


app.use("/api/v1",userRoutes);
app.use("/api/v1",carRoutes);

module.exports = app;

