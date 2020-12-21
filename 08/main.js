'use strict';

const port = 3000;
const http = require('http');
const json = require('./data.json');

const app = http.createServer((req, res) => {
  console.log('Received an incoming request!');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(json));
  res.end();
  console.log('Sent a response');
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
