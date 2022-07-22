function socketServer(io) {
  return io.on('connection', (socket) => {
    io.emit('test', 'Device is connected to server through the socketio');

    console.log('GPS device connected to the server through socketio');

    socket.on('gpsdata', (data) => {
      console.log(data);
      io.emit('gpsdataforclients', data[1]);
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
