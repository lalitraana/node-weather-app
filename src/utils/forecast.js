const request = require("request");

const forecast = (longitude, lattitude, callback) => {
  const url = `https://api.darksky.net/forecast/0630c07bd1dc27ac9049f5d74a8950dc/${lattitude},${longitude}?units=si`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.currently;
      callback(undefined, body.daily.data[0].summary + "  Its currently (ignore -) " +
      data.temperature +
      " degree and there is " +
      data.precipProbability +
      " % chance of rain");
    }
  });
};
module.exports = forecast;
