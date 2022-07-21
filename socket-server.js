const geolib = require('geolib');

function calculateCenterOfCoordinates(coordinates) {
  const coordinatesValues = [];
  for (let i = 0; i < coordinates.length; i++) {
    coordinatesValues.push({
      latitude: coordinates[i].lattitude,
      longitude: coordinates[i].longitude,
    });
  }
  return geolib.getCenter(coordinatesValues);
}

function socketServer(io) {
  return io.on('connection', (socket) => {
    let coordinates = [];

    socket.on('gpsdata', (data) => {
      if (coordinates.length >= 10) {
        const coordinate = calculateCenterOfCoordinates(coordinates);
        coordinate['busId'] = coordinates[0].busId;
        coordinate['numberOfSatellites'] = coordinates[0].numberOfGPS;

        console.log(coordinates, coordinate);
        coordinates = [];

        io.emit('gpsdataforclients', coordinate);
      } else {
        coordinates.push(data);
      }
    });

    socket.on('client', (data) => {
      console.log(data);
    });
  });
}

function socketDebugger(io) {
  return io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
}

module.exports = { socketServer, socketDebugger };
