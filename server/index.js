const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uniqid = require('uniqid');

const PORT = 3001;


const MESSAGE_TYPE = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
};

io.on('connection', function(socket) {
  socket.on('message', function(data) {
    socket.emit('message', { ...data, type: MESSAGE_TYPE.RECEIVED, timestamp: Date.now(), id:uniqid() });
  });
});

http.listen(PORT, function() {
  console.log('listening on *:3001');
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

module.exports = {
  app: app
};