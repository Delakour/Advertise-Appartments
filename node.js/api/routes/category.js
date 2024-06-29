const express = require('express')
const router = express.Router()
const {
    getAll,
    create,
    remove
} = require('../controllers/category')

const {checkLogin, checkIfAdvertiser} = require('../../middleware')

router.get('',checkLogin, getAll)
router.post('', checkLogin, checkIfAdvertiser, create)
router.delete('/:id',checkLogin, checkIfAdvertiser, remove)

module.exports = router