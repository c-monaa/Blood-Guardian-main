const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authMiddleware = require('../middlewares/authMiddleware');
const Inventory = require("../models/inventoryModal");

// register new user
router.post('/register', async (req,res) =>{
    console.log("yes they came here....")
    try{
        //check if user already exists
        const userExists = await User.findOne({ email: req.body.email});
        console.log(userExists);
        if(userExists)
        {
            return res.send({
                success: false,
                message: "User Already Exists!",
            });
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // save user
        console.log(req.body);
        const user  = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User Created Successfully!", 
        });
    }
    catch(error){
        return res.send({
            success: false,
            message: error.message
        });
    }
});

//login user
router.post('/login',async(req,res)=>{
    try{
        //check if user already exists
        const user = await User.findOne({ email: req.body.email});
        if(!user)
        {
            return res.send({
                success: false,
                message: "User Not Found!",
            })
        }

        //check if usertype matches
        if(user.userType !== req.body.userType){
            return res.send({
                success: false,
                message: `User is not registered as a ${req.body.userType}` ,
            })
        }


        //compare passwords
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(!validPassword)
        {
            return res.send({
                success: false,
                message: "Invalid Password!",
            });
        }

        //generate JWT token
        const token = jwt.sign(
            {userId: user._id},
            process.env.jwt_secret,{expiresIn: '1d'});

        return res.send({
            success: true,
            message: "User Logged in Successfully!",
            data: token,
        })
    }
    catch(error){
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

//get current user 
router.get("/get-current-user",authMiddleware,async (req,res) =>{
    try {
        const user = await User.findOne({_id: req.body.userId});
        
        return res.send({
            success: true,
            message: "User fetched successully",
            data: user,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
});

//get all unique donars
router.get("/get-all-donars",authMiddleware, async (req,res) =>{

    try {
    //get all unique donars from inventory
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueDonarIds = await Inventory.aggregate([
            {
                $match:{
                    inventoryType: "in",
                    organization,
                },   
            },
            {
                $group: {
                    _id: "$donar",
                },
            },
        ]);
        
        const donars = await User.find({
            _id: {$in: uniqueDonarIds},
        });

        return res.send({
            success: true,
            message: "Donars Fetched Successfully",
            data: donars,
        }); 
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

//get all unique hospitals
router.get('/get-all-hospitals', authMiddleware,async(req,res)=>{
    try{
        //get all unique hospital ids from inventory
        console.log(req.body.userId);
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueHospitalIds=await Inventory.distinct("hospital",{
            organization,
        });

        const hospitals = await User.find({
            _id: {$in: uniqueHospitalIds},
        });

        return res.send({
            success :true,
            message:"All Hospitals fetched successfully.",
            data : hospitals,
        });
        }catch(err){
            return res.send({
                success:false,
                message: err.message || 'Some Error Occured'   
            });
        };
    });

//get all unique organizations for a donar
router.get('/get-all-organizations-for-a-donar', authMiddleware,async(req,res)=>{
    try{
        //get all unique hospital ids from inventory
        const donar = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds=await Inventory.distinct("organization",{
            donar,
        });

        const hospitals = await User.find({
            _id: {$in: uniqueOrganizationIds},
        });

        return res.send({
            success :true,
            message:"All Hospitals fetched successfully.",
            data : hospitals,
        });
        }catch(err){
            return res.send({
                success:false,
                message: err.message || 'Some Error Occured'   
            });
        };
    });

//get all unique organizations for a hospital
router.get('/get-all-organizations-for-a-hospital', authMiddleware,async(req,res)=>{
    try{
        //get all unique organization ids from inventory
        const hospital = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds=await Inventory.distinct("organization",{
            hospital,
        });

        const hospitals = await User.find({
            _id: {$in: uniqueOrganizationIds},
        });

        return res.send({
            success :true,
            message:"All Hospitals fetched successfully.",
            data : hospitals,
        });
        }catch(err){
            return res.send({
                success:false,
                message: err.message || 'Some Error Occured'   
            });
        };
    });

module.exports = router;
