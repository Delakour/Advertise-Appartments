const Advertiser = require('../models/advertiser')
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')

module.exports = {
    getAll:(req, res)=>{
        Advertiser.find()
        .then(a => {
            return res.status(200).send(a)
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    register: (req, res) => {
        const { name, email, password, phone_1, phone_2 } = req.body
        
        if(name == null || email == null || password == null)
            return res.status(401).send({message: 'some data missing!'})
        
            if(phone_1 == null){
                Customer.find({email:{$eq: email}})
                .then(c =>{
                    if (c.length > 0) {
                        return res.status(400).send({ message: `sorry, you're already registered` })
                    }
                })
                .catch(err => {
                    return res.status(500).send({ error: err.message })
                })
            }

            Advertiser.find({ email: { $eq: email } })
            .then(p => {
                if (p.length > 0) {
                    return res.status(400).send({ message: `advertiser email already exists!` })
                }
                const advertiser = new Advertiser({
                    name, email, password, phone_1, phone_2
                })
                return advertiser.save()
            })
            .then(() => {
                return res.status(200).send({ message: `new advertiser!! welcome!` })
            })
            .catch(err => {
                return res.status(500).send({ error: err.message })
            })
    },
    login: (req, res) => {
        const { name, email, password } = req.body

        Advertiser.find({ email: { $eq: email } })
            .then(p => {
                if (p.length == 0) {
                    return res.status(404).send({ message: `advertiser not found!` })
                }
                const [advertiser] = p

                if (!advertiser.password == password) {
                    return res.status(404).send({ message: `wrong password!!` })
                }
                const token = jwt.sign(
                    { email: advertiser.email }, process.env.SECRET, {expiresIn: '24h'}
                )
                const _id = advertiser._id
                return res.status(200).send({_id, email, token})
            })
            .catch(err => {
                return res.status(500).send({ error: err.message })
            })
    },
    remove:(req, res) =>{
        const _id = req.params.id
        Advertiser.findById(_id)
        .then(adv =>{ 
            if(adv.apartments.length > 0)
                return res.status(500).send({message:`cannot delete this advertiser while he steel have apartments!`})
            else{
                Advertiser.findByIdAndDelete(_id)
                return res.status(200).send({message:`delete advertiser ${_id} done!`})   
            }
        })
        .catch(err=>{
            return res.status(500).send({error:err.message})
        })
    }
}