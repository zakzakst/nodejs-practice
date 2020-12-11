'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');

// エラー処理関数
const sendErrorResponse = res => {
  res.writeHead(httpStatus.NOT_FOUND, {
    'Content-Type': 'text/html',
  });
  res.write('<h1>File Not Found!</h1>');
  res.end();
};

// リクエストされた名前のファイルを探す
const customReadFile = (filePath, res) => {
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        sendErrorResponse(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};

http.createServer((req, res) => {
  let url = req.url;
  // URLに拡張子が含まれているかチェック
  if (url.indexOf('.html') !== -1) {
    res.writeHead(httpStatus.OK, {
      'Content-Type': 'text/html',
    });
    customReadFile(`06/views${url}`, res);
  } else if (url.indexOf('.js') !== -1) {
    res.writeHead(httpStatus.OK, {
      'Content-Type': 'text/javascript',
    });
    customReadFile(`06/public/js${url}`, res);
  } else if (url.indexOf('.css') !== -1) {
    res.writeHead(httpStatus.OK, {
      'Content-Type': 'text/css',
    });
    customReadFile(`06/public/css${url}`, res);
  } else if (url.indexOf('.png') !== -1) {
    res.writeHead(httpStatus.OK, {
      'Content-Type': 'image/png',
    });
    customReadFile(`06/public/images${url}`, res);
  } else {
    sendErrorResponse(res);
  }
}).listen(port);

console.log(`The server has started and is listening on port number: ${port}`);
