const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');
const routeMap = {
  '/': '06/views/index.html',
};

// URLを補完してファイルのパスにする関数
const getViewUrl = (url) => {
  return `06/views/${url}.html`;
};

http.createServer((req, res) => {
  let viewUrl = getViewUrl(req.url);
  fs.readFile(viewUrl, (err, data) => {
    if (err) {
      res.writeHead(httpStatus.NOT_FOUND);
      res.write('<h1>FILE NOT FOUND</h1>');
    } else {
      res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html',
      });
      res.write(data);
    }
    res.end();
  });
}).listen(port);

// http.createServer((req, res) => {
//   res.writeHead(httpStatus.OK, {
//     'Content-Type': 'text/html',
//   });
//   if (routeMap[req.url]) {
//     fs.readFile(routeMap[req.url], (err, data) => {
//       res.write(data);
//       res.end();
//     });
//   } else {
//     res.end('<h1>Sorry, not found.</h1>');
//   }
// }).listen(port);

console.log(`The server has started and is listening on port number: ${port}`);
