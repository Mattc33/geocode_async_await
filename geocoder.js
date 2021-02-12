const NodeGeocoder = require('node-geocoder')
const axios = require('axios')

const options = {
  provider: 'google',
  apiKey: 'INSERT GOOGLE MAPS API KEY',
  formatter: null
}

const geocoder = NodeGeocoder(options);

const getGeocode = async () => {
  const dataPackage = [
    {
      address: null,
      lat: null,
      lng: null
    }
  ]

  await axios.get('https://raw.githubusercontent.com/Mattc33/MattsCDN/master/txt/address.txt')
    .then(res => res.data)
    .then(async data => {
      dataPackage[0].address = data.trim();

      await geocoder.geocode(dataPackage[0].address)
        .then(res => {
          dataPackage[0].lat = res[0].latitude;
          dataPackage[0].lng = res[0].longitude;
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  return dataPackage
}

module.exports = getGeocode
