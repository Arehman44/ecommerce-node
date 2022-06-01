const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/auth");
const updateRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();
const app = express();
app.use(express.json());

//all routes here
app.use("/api/user",userRoute);
app.use("/api",updateRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);

mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB connection Successfully!")
}).catch(err =>{
    console.log(err);
})

const PORT = process.env.PORT || 4040 
app.listen(PORT,()=>{
    console.log(`Backend server is running port no is ${PORT}`);
})