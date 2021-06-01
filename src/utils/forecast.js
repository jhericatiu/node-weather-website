const request = require("request");
//encodeURIComponent returns a string

//getting the longitude and latitude of place
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ea8ad21a735fb7b2611f6f8beec2cbfb&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
