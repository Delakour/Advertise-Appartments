const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const apartmentRouter = require('./api/routes/apartment')
const advertiserRouter = require('./api/routes/advertiser')
const categoryRouter = require('./api/routes/category')
const customerRouter = require('./api/routes/customer')
const cityRouter = require('./api/routes/city')


const app = express()
const port = 3001
app.use(bodyParser.json())
dotenv.config()

mongoose.connect(process.env.URL, {})
.then(()=>{
    console.log('connect to mongo DB!');
})
.catch(err => {
    console.log(err.message);
})
app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use('/apartment', apartmentRouter)
app.use('/advertiser', advertiserRouter)
app.use('/category', categoryRouter)
app.use('/customer', customerRouter)
app.use('/city', cityRouter)

app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`);
})