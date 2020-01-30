const request = require('request')

// Now if we have to find coordinates of 4 to 5 location we have to write above code many times so instead we can write a function and use it many times
// Also we first want to fetch coordinates then weather conditions for this we need to make these functions asynchronous

const geoocode = (address, callback) => {
  const urrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibGFsaXQ3NzciLCJhIjoiY2s1Yzg3dXVxMXAwMTNzcGd4YzZud2g1MiJ9.p6q3KFILOREQvwTFu08JFQ&limit=1";
  // encodeuri is to convert address into string without it if user enters special characters in address our program will crash ? becomes %3F

  request({ url: urrl, json: true }, (error, { body }) => {
    // console.log(response.body.features)
    if (error) {
      callback("Unable to connect to location services!", undefined);
      // This makes our code flexible as we are sending error message to the user and he will decide what to do with it
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
    else {
      // Choose the values you want to share 
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })

    }
  });
};

module.exports = geoocode