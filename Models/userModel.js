const mongoose  = require("mongoose");


const uSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', uSchema)