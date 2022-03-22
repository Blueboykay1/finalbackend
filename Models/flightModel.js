const mongoose  = require("mongoose");


const fSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    Route: {
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
    // FCode: {
    //     type: Date,
    //     required: true,  
    // } ,
    FName:{
        type: String,
        required: true}   

})

module.exports = mongoose.model('flights', fSchema)