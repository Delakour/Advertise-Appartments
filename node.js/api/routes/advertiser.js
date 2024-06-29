const express = require('express')
const router = express.Router()

const {
    getAll,
    register,
    login,
    remove
} = require('../controllers/advertiser')

router.get('', getAll)
router.post('/register', register)
router.post('/login', login)
router.delete('/:id', remove)


module.exports = router