const jwt = require('jsonwebtoken')
const Advertiser = require('./api/models/advertiser')
const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        req.error = `invalid file type!`
        cb(null, false)
    }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

//Bearer 
module.exports = {
    checkLogin: (req, res, next) => {
        if (!req.headers.authorization)
            return res.status(401).send({ message: 'authentication faild!' })

        const headers = req.headers.authorization.split(' ')

        if (headers.length > 2)
            return res.status(401).send({ message: 'authentication faild!' })

        const token = headers[1]

        jwt.verify(token, process.env.SECRET, (error, result) => {
            if (error || !result)
                return res.status(401).send({ error: `authorization failed!` })
        })
        return next()
    },
    checkIfAdvertiser: (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        let decodedEmail
        try {
            decodedEmail = jwt.verify(token, process.env.SECRET)
            decodedEmail = decodedEmail.email
            if (decodedEmail) {
                Advertiser.find({ email: { $eq: decodedEmail } })
                    .then(a => {
                        if (a.length == 0)
                            return res.status(400).send({ message: `sorry! you're not an advertiser! maybe a customer...` })

                        return next()
                    })
            }
            else {
                return res.status(400).send({ message: `invalid token` })
            }
        }
        catch (err) {
            return res.status(400).send({ message: `authentication faild!! ☹️` })
        }
    },
    checkIfAdvertiserMatch: (req, res, next) => {
        const _id = req.params.id
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        let decodedEmail
        try {
            decodedEmail = jwt.verify(token, process.env.SECRET)
            let email = decodedEmail.email
            if (email) {
                Advertiser.findById(_id)
                    .then(a => {
                        if (!a)
                            return res.status(400).send({ message: `sorry! you're not an advertiser! maybe a customer...` })
                        else if (a.email == email) {
                            return next()
                        }
                        else {
                            return res.status(400).send({ message: `sorry, you're not the advertiser declared!` })
                        }
                    })
            }
            else {
                return res.status(400).send({ message: `invalid token` })
            }
        }
        catch (err) {
            return res.status(400).send({ message: `authentication faild!! ☹️` })
        }

    },
    upload: multer({
        dest: 'uploads/',
        storage,
        limit: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter
    })
}