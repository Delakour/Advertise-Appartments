const City = require('../models/city')
const kelvinToCelsius = require('kelvin-to-celsius')
const request = require('request')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    getWeather: (req, res) => {
        const requestApi = () => {
            return new Promise((resolve, reject) => {
                const city_id = req.params.city
                let city_name
                City.findById(city_id)
                    .then(city => {
                        request(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},&appid=29e21eb08b02f857be9490804657ae5c`,
                            (err, res, body) => {
                                if (err)
                                    reject(err)
                                else
                                    resolve(body)
                            })
                        // city_name = "Jerusalem"
                    })
                    .catch(err => {
                        return res.status(500).send({ error: err.message })
                    })

            })
        }

        requestApi()
            .then((body) => {
                const apiParameters = JSON.parse(body)
                console.log(apiParameters);
                // res.status(200).send(apiParameters)
                return res.status(200).send(kelvinToCelsius(apiParameters.main.temp))
            })

            .catch((error) => {
                return res.status(400).send(error.message)
            })
    }
}