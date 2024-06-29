const mongoose = require('mongoose')

const CustomerScema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Customer', CustomerScema)
