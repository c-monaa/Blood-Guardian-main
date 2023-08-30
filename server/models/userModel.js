const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    // common for all
    userType:{
        type: String,
        required: true,
        enum : ['donar','organization','hospital','admin'],
    },
    // is required if usertyep is donar or admin    
    name:{
        type: String,
        required: function(){
            if(this.userType === 'admin' || this.userType === 'donar')
                return false;
        }
    },
    // is required if usertype is hospitalName
    hospitalName:{
        type: String,
        required: ()=>{
            if(this.userType ==='hospital'){
                return true;
            }
            return false;   
        },
    },
    // is required if usertype is organizationName
    organizationName:{
        type: String,
        required: ()=>{
            if(this.userType ==='organization'){
                return true;
            }
            return false;   
        },
    },

    // is required if usertype is hospital or organization
    website:{
        type: String,
        required: ()=>{
            if(this.userType === 'organization' || this.userType === 'hospital')
                return true;
            return false;
        },
    },
    address:{
        type: String,
        required: ()=>{
            if(this.userType === 'organization' || this.userType === 'hospital')
                return true;
            return false;
        },
    },

    // common for all
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
},{
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
      },
});

module.exports = mongoose.model("users",userSchema);