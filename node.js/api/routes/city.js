const express = require('express')
const router = express.Router()

const {
    addCity,
    getAll,
    remove
} = require('../controllers/city')
// const {
//     getWeather
// } = require('../controllers/weather')

const {checkLogin, checkIfAdvertiser} = require('../../middleware')

router.post('',checkLogin, checkIfAdvertiser, addCity)
router.get('', getAll)
// router.get('/weather/:city', getWeather)
router.delete('/:id', remove)
module.exports = router