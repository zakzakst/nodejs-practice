'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');

const app = http.createServer((req, res) => {
  console.log('Received an incoming request!');
  res.writeHead(httpStatus.OK, {
    'Content-Type': 'text/html',
  });
  res.write('<h1>Hello, Universe!</h1>');
  res.end();
  console.log('Sent a response');
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
