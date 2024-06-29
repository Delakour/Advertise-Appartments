const City = require('../models/city')

module.exports = {
    addCity:(req, res)=>{
        const {name} = req.body

        const newCity = new City({
            name
        })
        return newCity.save()
        .then(() => {
            return res.status(200).send(newCity)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    getAll:(req, res)=>{
        City.find()
        .then(cities => {
            return res.status(200).send(cities)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    remove:(req, res)=>{
        const _id = req.params.id
        City.findByIdAndDelete(_id)
        .then(c =>{
            if(c.apartmentsInCity.length > 0)
                return res.status(400).send({message:`cannot delete this city while apartments are using it!`})
            return res.status(200).send({message:`delete city ${_id} done!`})
        })
        .catch(err=>{
            return res.status(500).send({error:err.message})
        })
    }
}