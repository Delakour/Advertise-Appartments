const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
    name: String,
    description: String,
    img:[{
        type: String,
        require: true
    }],
    category:{
        type:mongoose.Types.ObjectId,
        ref: 'Category'
    },
    city:{
        type:mongoose.Types.ObjectId,
        ref: 'City'
    },
    address: {  
        type: String,
        require: true
    },
    beds:{
        type: Number,
        require: true
    },
    additions:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    advertiser:{
        type:mongoose.Types.ObjectId,
        ref:'Advertiser'
    }
})

module.exports = mongoose.model('Apartment', apartmentSchema)