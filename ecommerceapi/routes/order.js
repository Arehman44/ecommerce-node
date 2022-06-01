const {verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");
const Order = require("../model/Order");
const router = require("express").Router();
//CREATE
router.post("/",verifyTokenAndAdmin, async(req,res)=>{
    const newOrder = new Product(req.body);
    try{
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    }catch(err){
        res.status(500).json(err);
    }
})
//UPDATE
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new:true})
            res.status(200).json(updateOrder);
    }catch(err){
        res.status(500).json(err);
    }
})
//Delete
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ORDER
router.get("/find/:id", async(req,res)=>{
    try{
        const orders = await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(401).json(err)
    }
})

//GET ALL ORDERS
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{    
        const order = await Order.find();
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;