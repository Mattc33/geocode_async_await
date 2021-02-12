const express = require('express')
// const getGeocode = require('./geocoder')
const getGeocodeMulti = require('./geocoder.multi')

const app = express();
const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`http://localhost:3333`))

app.get('/', (req, res) => {
  getGeocodeMulti().then(data => {
    res.send(data);
  })
})