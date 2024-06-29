const express = require('express')
const router = express.Router()

const {
    getAll,
    register,
    login
} = require('../controllers/customer')

router.get('', getAll)
router.post('/register', register)
router.post('/login', login)

module.exports = router