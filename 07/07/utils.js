'use strict';

const fs = require('fs');
const httpStatus = require('http-status-codes');
const contentTypes = require('./contentTypes');

module.exports = {
  getFile: (file, res) => {
    fs.readFile(`./${file}`, (err, data) => {
      if (err) {
        res.writeHead(
          httpStatus.INTERNAL_SERVER_ERROR,
          contentTypes.html
        );
        res.end('There was an error serving content!');
      }
      res.end(data);
    });
  }
};
