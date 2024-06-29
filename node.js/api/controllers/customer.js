const Customer = require('../models/customer')
const Advertiser = require('../models/advertiser')
const jwt = require('jsonwebtoken')
module.exports = {
    getAll:(req, res)=>{
        Customer.find()
        .then(customers=>{
            return res.status(200).send({customers})
        })
        .catch(err=>{
            return res.status(500).send({error:err.message})
        })
    },
    register:(req, res) =>{
        const {name, email, password} = req.body
        if(email == null || password == null)
            return res.status(401).send({message: 'some data missing'})

        Customer.find({email: {$eq: email}})
        .then(cus=>{ 
            if(cus.length > 0){
                return res.status(400).send({ message: `email already exists!`})
            }
            const newCustomer = new Customer({
                name, email, password
            })
            return newCustomer.save() 
        })
        .then(() => {
            return res.status(200).send({ message: `new customer!! welcome!` })
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
    },
    
    login:(req, res) => {
        const {name, email, password} = req.body

        Customer.find({email:{$eq:email}})
        .then(c=>{
            if(c.length == 0){
                return res.status(400).send({message:'customer not found!'})
            }

            const [customer] = c
            if(!customer.password == password)
                return res.status(401).send({message: 'wrong password!'})

            const token = jwt.sign(
                    { email: customer.email }, process.env.SECRET, {expiresIn: '24h'}
                )   
                return res.status(200).send({_id, email, token})
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })

    }
}