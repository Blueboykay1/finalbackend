const mongoose  = require("mongoose");


const fSchema = new mongoose.Schema({
    
    route: {
        type: String,
        required: true
    },
    depdate: {
        type: Date,
        required: true,
        
    },
    retdate: {
        type: Date,
        required: false,  
    },
   
    brand:{
        type: String,
        required: true}, 
    price:{
        type: String,
        required: true
    } , 
    deptime: {
        type: String,
        required: false
    },
    rettime: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('flights', fSchema)