const NodeGeocoder = require('node-geocoder')
const axios = require('axios')

const options = {
  provider: 'google',
  apiKey: 'INSERT GOOGLE MAPS API KEY',
  formatter: null
}

const geocoder = NodeGeocoder(options);

const getGeocode = async () => {
  const dataPackage = []

  await axios.get('https://raw.githack.com/Mattc33/MattsCDN/master/json/address.json')
    .then(res => res.data)
    .then(async data => {
      for (const el of data) {
        let lat = null
        let lng = null
        
        await geocoder.geocode(el.address)
          .then(res => {
            lat = res[0].latitude
            lng = res[0].longitude
          })
          .catch(err => console.log(err))

        dataPackage.push({
          address: el.address,
          lat: lat,
          lng: lng
        })
      }
    })
    .catch(err => console.log(err))

  return dataPackage
}

module.exports = getGeocode