const mongoose  = require("mongoose");


const uSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    full_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'Customer'
    },
    contact_number:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: false,
        default: null
    },
    avatar:{
        type: String,
        required: false,
        default: null
    },
    joindate:{
        type: Date,
        required: true,
        default: Date.now
    }
    //name, number, about avatar, join 
})

module.exports = mongoose.model('Users', uSchema)