const router = require('express').Router();
const Inventory = require("../models/inventoryModal");
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../models/userModel");  
const { default: mongoose } = require('mongoose');

//add inventory
router.post("/add", authMiddleware, async(req,res) =>{
    try {
        console.log("req body: ",req.body);
        //validate email and inventory type
        const user = await User.findOne({email: req.body.email});
        // console.log("user: ",user);
        if(!user) throw new Error("Invalid Email!");

        if(req.body.inventoryType ==="in" && user.userType !=="donar"){
            throw new Error("This email is not registered as a donar");
        }

        if(req.body.inventoryType ==="out" && user.userType !== "hospital"){
            throw new Error("This email is not registered as a hospital");
        }

        if(req.body.inventoryType ==="out")
        {
            //check if inventory is available
            const requestedGroup = req.body.bloodGroup;
            const requestedQuantity = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);

            const totalInOfRequestGroup = await Inventory.aggregate([
                {
                    $match:{
                        organization,
                        inventoryType: "in",
                        bloodGroup: requestedGroup,
                    },
                },
                {
                    $group:{
                        _id: "$bloodGroup",
                        total:{ $sum: "$quantity"},
                    },
                },
            ]);

            const totalIn = totalInOfRequestGroup[0]?.total || 0;

            const totalOutOfRequestGroup = await Inventory.aggregate([
                {
                    $match: {
                    organization,
                    inventoryType: "out",
                    bloodGroup: requestedGroup,
                    }, 
                },
                {
                    $group: {
                    _id:"$bloodGroup",
                    total:{ $sum :"$quantity"},
                    },
                },
            ]);

        const totalOut = totalOutOfRequestGroup[0]?.total || 0;

        const availableQuantityOfRequestedGroup = totalIn - totalOut;
        if(availableQuantityOfRequestedGroup    < requestedQuantity)
            {
                throw new Error(`only ${availableQuantityOfRequestedGroup} units of ${requestedGroup.toUpperCase()} is avaiable!`);
            }
            req.body.hospital = user._id;
        }else{
            req.body.donar = user._id;
        }

        //add inventory
        const inventory = new Inventory(req.body);
        await inventory.save();

        return res.send({ success: true, message: "Inventory Added Successfully!!"});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }
});

//get inventory
router.get("/get", authMiddleware, async(req,res) =>{ 
    try {
        const inventory = await Inventory.find({organization: req.body.userId}).populate("donar").populate("hospital").sort({createdAt: -1});
        return res.send({ success: true, data: inventory});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }
});

//get inventory
router.post("/filter", authMiddleware, async(req,res) =>{ 
    try {
        const inventory = await Inventory.find(req.body.filters)
        .limit(req.body.limit || 10) 
        .sort({createdAt: -1})
        .populate("donar")
        .populate("hospital")
        .populate("organization");  
        return res.send({ success: true, data: inventory});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }
});



module.exports = router;