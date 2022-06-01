const {verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");
const Cart = require("../model/Cart");
const router = require("express").Router();

router.post("/",verifyTokenAndAdmin, async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    }catch(err){
        res.status(500).json(err);
    }
})
//UPDATE
router.put("/:id",verifyTokenAndAuth,async(req,res)=>{
    try{
        const updateCart = await Cart.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new:true})
            res.status(200).json(updateCart);
    }catch(err){
        res.status(500).json(err);
    }
})
//Delete
router.delete("/:id",verifyTokenAndAuth,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
})

//GET USER Cart
router.get("/find/:userId",verifyTokenAndAuth, async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(401).json(err)
    }
})

//GET ALL Cart
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{    
        const cart = await Cart.find();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;