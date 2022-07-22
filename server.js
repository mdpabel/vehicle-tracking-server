const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const morgan = require('morgan');
var cors = require('cors');
const http = require('http');
require('dotenv').config();

// const busLocation = require('./src/routers/busLocation');
const location = require('./src/routers/location');
const { socketServer, socketDebugger } = require('./socket-server');
const { port } = require('./config');

const app = express();
const server = http.Server(app);
const io = socketIO(server, {
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(function (req, res, next) {
  res.io = io;
  next();
});

// const router = express.Router();
// router.post('/gpsdata', (req, res) => {
//   console.log(req.body);
//   res.send('test');
// });

// router.get('/gpsdata', (req, res) => {
//   console.log(req.body);
//   res.send('test');
// });

// socket server
socketServer(io);
socketDebugger(io);

app.post('/gpsdata', (req, res) => {
  console.log(req.body);
  res.send('test');
});

app.get('/gpsdata', (req, res) => {
  console.log(req.body);
  res.send('test');
});

// app.use('/api/v1/', busLocation);
app.use('/api/v1/', location);

const PORT = port || 3003;

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// db
require('./src/db/mongodb');
