const geolib = require('geolib');

function socketServer(io) {
  return io.on('connection', (socket) => {
    let coordinates = [];

    socket.on('gpsdata', (data) => {
      if (coordinates.length >= 10) {
        const coordinate = geolib.getCenter(coordinates);
        console.log(coordinates, coordinate);
        coordinates = [];
        io.emit('gpsdataforclients', coordinate);
      } else {
        console.log(coordinates);
        coordinates.push({
          latitude: data?.lattitude,
          longitude: data?.longitude,
        });
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
