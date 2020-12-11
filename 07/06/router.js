'use strict';

const httpStatus = require('http-status-codes');
const htmlContentType = {
  'Content-Type': 'text/html',
};

// GETとPOSTのリクエストに対応する経路を格納するroutesオブジェクトを定義
const routes = {
  GET: {
    '/info': (req, res) => {
      res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/plain',
      });
      res.end('Welcome to the Info Page!');
    }
  },
  POST: {}
};

// 経路のコールバック関数を処理するhandle関数
exports.handle = (req, res) => {
  try {
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      req.writeHead(httpStatus.NOT_FOUND, htmlContentType);
      res.end('<h1>No such file exists</h1>');
    }
  } catch (ex) {
    console.log(ex);
  }
};

// 経路を登録するためのGETとPOSTの関数
exports.get = (url, action) => {
  routes['GET'][url] = action;
};

exports.post = (url, action) => {
  routes['POST'][url] = action;
};
