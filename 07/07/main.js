'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const router = require('./router');
const contentTypes = require('./contentTypes');
const utils = require('./utils');

const baseDir = '07/';

// Webページとアセットについて、一連の経路を追加
router.get('/', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile(`${baseDir}views/index.html`, res);
});

router.get('/courses.html', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile(`${baseDir}views/courses.html`, res);
});

router.get('/contact.html', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile(`${baseDir}views/contact.html`, res);
});

router.post('/', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile(`${baseDir}views/thanks.html`, res);
});

router.get('/confetti_cuisine.css', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile(`${baseDir}public/css/confetti_cuisine.css`, res);
});

router.get('/confetti_cuisine.js', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.js);
  utils.getFile(`${baseDir}public/js/confetti_cuisine.js`, res);
});

http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);
