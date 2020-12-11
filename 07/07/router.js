'use strict';

const httpStatus = require('http-status-codes');
const contentTypes = require('./contentTypes');
const utils = require('./utils');

// 経路の関数を入れるオブジェクト
const routes = {
  GET: {},
  POST: {}
};

exports.handle = (req, res) => {
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile('07/views/error.html', res);
  }
};

exports.get = (url, action) => {
  routes['GET'][url] = action;
};

exports.post = (url, action) => {
  routes['POST'][url] = action;
};
