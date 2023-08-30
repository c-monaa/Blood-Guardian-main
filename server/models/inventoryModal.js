const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
    inventoryType: {
        type: String,
        required: true,
        enum: ['in','out']
    },
    bloodGroup:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    organization:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

    // if inventory type is: "out", then hospitals will be set
    // if inventory type is: "in", then donars will be set

    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: function(){
            return this.inventoryType === 'out';
        },
    },
    donar:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: function(){
            return this.inventoryType === 'in';
        }, 
    },
        createdAt: {
          type: Date,
          default: Date.now, // Set the default value to the current date and time
        },
    },
);

const Inventory = model("inventories", inventorySchema); 
module.exports = Inventory;