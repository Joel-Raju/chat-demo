const express = require('express');
const http = require('http');
const io = require('socket.io');
const ioclient = require('socket.io-client');
const PORT = 3001;

describe('client', () => {
  beforeEach(() => {
    const app = new express();
    this._http = http.Server(app);
    this._ioserver = io(this._http)
    this._http.listen(PORT)
    this._client = null;
  });

  it('should connect to a socketio', (done) => {
    this._ioserver.on('connection', () => {
      done();
    })
    this._client = ioclient.connect(`http://localhost:${PORT}`)
  });

  afterEach(() => {
    this._client.close()
    this._ioserver.close()
    this._http.close()
  })
});
