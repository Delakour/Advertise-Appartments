const mongoose = require('mongoose')

const CitySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    apartmentsInCity: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

module.exports = mongoose.model('City', CitySchema)