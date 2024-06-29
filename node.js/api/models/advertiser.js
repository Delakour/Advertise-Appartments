const mongoose = require('mongoose')

const advertiserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type: String,
        require: true
    },
    phone_1:{
        type: String,
        require: true
    },
    phone_2: String,
    apartments:[{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

module.exports = mongoose.model('Advertiser', advertiserSchema)