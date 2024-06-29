const Category = require('../models/category')
module.exports = {
    getAll: (req, res) => {
       Category.find()
            .then(c => {
                return res.status(200).send(c);
            })
            .catch(err => {
                return res.status(500).send({ error: err.message });
            });
    },
    create: (req, res) => {
        const { name } = req.body

        Category.find({ name: { $eq: name } })
            .then(c => {
                if (c.length > 0) {
                    return res.status(400).send({ message: `category already exists!` })
                }
                const newCategory = new Category({
                    name,
                    apartments: []
                })
                return newCategory.save()
                    .then(() => {
                        return res.status(200).send(newCategory)
                    })
                    .catch(err => {
                        return res.status(500).send({ error1: err.message })
                    })
            })
            .catch(err => {
                return res.status(500).send({ error1: err.message })
            })
    },
    remove: (req, res) => {
        const _id = req.params.id
        Category.find({ _id: { $eq: _id } })
            .then(cat => {
                if (cat.apartments.length > 0) {
                    return res.status(400).send({ message: `apartments are using this category! cannot delete!` })
                }
                Category.findByIdAndDelete(_id)
                    .then(c => {
                        return res.status(200).send({ message: `category ${c._id} deleted!` })
                    })
                    .catch(err => {
                        return res.status(500).send({ error: err.message })
                    })
            })
    }
}
