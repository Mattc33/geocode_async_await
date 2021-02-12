const NodeGeocoder = require('node-geocoder');
const axios = require('axios');

const options = {
  provider: 'google',
  apiKey: 'AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc',
  formatter: null
}

const geocoder = NodeGeocoder(options);

async function getGeocodeData() {
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

      // wait for geocoder to finish
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

getGeocodeData().then(data => console.log(data))
