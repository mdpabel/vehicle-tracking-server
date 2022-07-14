function socketServer(io) {
  return io.on('connection', (socket) => {
    console.log('connected');
    socket.on('gpsdata', (data) => {
      console.log(data);
      socket.broadcast.emit('gpsdataforclients', data);
    });
  });
}

function socketDebugger(io) {
  return io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
}

module.exports = { socketServer, socketDebugger };
