const Apartment = require('../models/apartment')
const Category = require('../models/category')
const Advertiser = require('../models/advertiser')
const City = require('../models/city')
const jwt = require('jsonwebtoken')

module.exports = {
    
    getAll: (req, res) => {
        Apartment.find()
        .populate({path:"city"})
        .populate({path:"category"})
        .populate({path:"advertiser"})
            .then(apartment => {
                return res.status(200).send(apartment)
            })
            .catch(err => {
                return res.status(500).send({ error: err.message })
            })
    },
    getById: (req, res) => {
        const _id = req.params.id
        Apartment.findById(_id)
        .populate({path:"city"})
        .populate({path:"category"})
        .populate({path:"advertiser"})
            .then(apt => {
                return res.status(200).send(apt)
            })
            .catch(err => {
                return res.status(500).send({ error: err.message })
            })
    },
    getByCategoryId: (req, res) => {
        const cat_id = req.params.id
        Apartment.find({ category: { $eq: cat_id } })
        .populate({path:"city"})
        .populate({path:"category"})
        .populate({path:"advertiser"})
            .then(apt => {
                return res.status(200).send(apt)
            })
            .catch(err => {
                return res.status(500).send({ error: err.message })
            })
    },
    getByCityId: (req, res) => {
        const city_id = req.params.id
        Apartment.find({city: {$eq:city_id}})
        .populate({path:"city"})
        .populate({path:"category"})
        .populate({path:"advertiser"})
        .then(apt => {
            return res.status(200).send(apt)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getByNumBedsEq: (req, res) => {
        const num_bed = req.params.beds
        Apartment.find({beds: {$eq: num_bed}})
        .then(apt => {
            return res.status(200).send(apt)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getByNumBedsBig: (req, res) => {
        const num_bed = req.params.beds
        Apartment.find({beds: {$gt: num_bed}})
        .then(apt => {
            return res.status(200).send(apt)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getByNumBedsLess: (req, res) => {
        const num_bed = req.params.beds
        Apartment.find({beds: {$lt: num_bed}})
        .then(apt => {
            return res.status(200).send(apt)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getByPriceBig: (req, res) => {
        const range_price = req.params.price
        Apartment.find({price: {$gte: range_price}})
        .then(apt => {
            return res.status(200).send(apt)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getByPriceLess: (req, res) => {
        const range_price = req.params.price
        Apartment.find({price: {$lte: range_price}})
        .then(apt => {
            return res.status(200).send(apt)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getByAdevrtiserId: (req, res) => {
        const adv_id = req.params.id
        Advertiser.findById(adv_id)
        .populate({path:"Apartment", strictPopulate:false}) 
        .populate({path:"city", strictPopulate:false})
        .populate({path:"category", strictPopulate:false})
        .populate({path:"advertiser", strictPopulate:false})
        .then(apt => {
            return res.status(200).send(apt.apartments)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    create: (req, res) => {
        const { name, description, category, city, address, beds, additions, price, advertiser } = req.body

        const img = req.files
        let images = []
        if (img.length != 0) {
            for (let file of img) {
                file = file.path.replace("\\","/")
                images.push(file)
            }
        }               
        
        const newApartment = new Apartment({
            name,
            description,
            img:images,
            category,
            city,
            address,
            beds,
            additions,
            price,
            advertiser
        }) 
        newApartment.save()
            .then(async apartment => {
                try{
                    await Advertiser.updateOne({ _id: advertiser }, { $push: { apartments: newApartment._id } })
                    await Category.updateOne({ _id: category }, { $push: { apartments: newApartment._id } })
                    await City.updateOne({ _id: city }, { $push: { apartmentsInCity: newApartment._id } })
                    return res.status(200).send(apartment)
                }
                catch(err){
                    return res.status( 500).send({ error: err.message })
                }
            }) 
            .catch(err => {
                return res.status(500).send({ error: err.message })
            })
    },
    update: async (req, res) => {
        const _id = req.params.id
        try {
            const apt = await Apartment.findById(_id)
            const prev_category = apt.category
            const prev_city = apt.city
            const prev_advertiser = apt.advertiser
            const updatedApartment = await Apartment.findByIdAndUpdate(_id, req.body, {new:true})

            if (prev_category != req.body.category) {
                await Category.updateOne({ _id: prev_category }, { $pull: { apartments: _id } })
                await Category.updateOne({ _id: updatedApartment.category }, { $push: { apartments: updatedApartment._id } })
            }

            if (prev_city != req.body.city) {
                await City.updateOne({ _id: prev_city }, { $pull: { apartmentsInCity: _id } })
                await City.updateOne({ _id: updatedApartment.city }, { $push: { apartmentsInCity: updatedApartment._id } })
            }

            if (prev_advertiser != req.body.advertiser) {
                await Advertiser.updateOne({ _id: prev_advertiser }, { $pull: { apartments: _id } })
                await Advertiser.updateOne({ _id: updatedApartment.advertiser }, { $push: { apartments: updatedApartment._id } })
            }
            return res.status(200).send(updatedApartment);
        }
        catch (err) {
            return res.status(500).send({ error: err.message });
        }
    },
    remove: async (req, res) => {
        const _id = req.params.id
        try {
            const apt = await Apartment.findByIdAndDelete(_id)
            if (!apt)
                return res.status(404).send({ message: 'Apartment not found. Cannot delete' });
            await Category.findByIdAndUpdate(apt.category, { $pull: { apartments: apt._id } })
            await City.findByIdAndUpdate(apt.city, { $pull: { apartmentsInCity: apt._id } })
            await Advertiser.findByIdAndUpdate(apt.advertiser, { $pull: { apartments: apt._id } })
            return res.status(200).send({ message: ` delete apartment ${apt._id} succeed!` });
        }
        catch (err) {
            return res.status(500).send({ error: err.message });
        }

    }
}