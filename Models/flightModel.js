const mongoose  = require("mongoose");


const fSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    From: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    DepDate: {
        type: Date,
        required: true,
        
    },
    RetDate: {
        type: Date,
        required: true,  
    },
    FCode: {
        type: Date,
        required: true,  
    }    

})

module.exports = mongoose.model('tickets', fSchema)