'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const router = require('./router');
const fs = require('fs');
const plainTextContentType = {
  'Content-Type': 'text/plain',
};
const htmlContentType = {
  'Content-Type': 'text/html',
};

const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (err, data) => {
    if (err) {
      console.log('Error reading the file...');
    }
    res.end(data);
  });
};

router.get('/', (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end('INDEX');
});

router.get('/index.html', (req, res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile('06/views/index.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end('POSTED');
});

// 全てのリクエストをrouter.jsを通じて処理する
http.createServer(router.handle).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
