const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    apartments:[{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

module.exports = mongoose.model('Category', categorySchema)