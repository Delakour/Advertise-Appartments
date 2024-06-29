const express = require('express')

const router = express.Router()

const {
    getAll,
    getById,
    getByCategoryId,
    getByCityId,
    getByNumBedsEq,
    getByNumBedsBig,
    getByNumBedsLess,
    getByPriceBig,
    getByPriceLess,
    getByAdevrtiserId,
    create,
    update,
    remove
} = require('../controllers/apartment')

const {upload, checkLogin, checkIfAdvertiser, checkIfAdvertiserMatch} = require('../../middleware')

router.get('', getAll)
router.get('/:id',checkLogin, getById)
router.get('/getByCategoryId/:id',checkLogin, getByCategoryId)
router.get('/getByCityId/:id',checkLogin, getByCityId)
router.get('/getByNumBedsEq/:beds',checkLogin, getByNumBedsEq)
router.get('/getByNumBedsBig/:beds',checkLogin, getByNumBedsBig)
router.get('/getByNumBedsLess/:beds',checkLogin, getByNumBedsLess)
router.get('/getByPriceBig/:price',checkLogin, getByPriceBig)
router.get('/getByPriceLess/:price',checkLogin, getByPriceLess)
router.get('/getByAdevrtiserId/:id',checkLogin, checkIfAdvertiserMatch, getByAdevrtiserId)
router.post('', upload.array('files'), checkLogin, checkIfAdvertiser, create)
router.patch('/:id',checkLogin, update) 
router.delete('/:id',checkLogin, remove)

module.exports = router
