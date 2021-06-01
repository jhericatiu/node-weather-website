const request = require("request");
//encodeURIComponent returns a string

//getting the longitude and latitude of place
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamhlcmljYWRlbmlzZSIsImEiOiJja3A3d3RheTkwM3dqMnhvZmM4bmc3MW9kIn0.Pb9ObPqPg_oSIx28v9MsoQ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
