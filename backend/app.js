const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User")

require("dotenv").config({path:"../backend/config/config.env"})


const app = express();


//using middlewares
app.use(cors({
    origin:process.env.frontendURI,
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes
app.use("/api/v1",userRoutes);

module.exports = app;

