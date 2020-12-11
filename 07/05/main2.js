// 経路とレスポンスの対応を定義するマップ
const routeResponseMap = {
  '/info': '<h1>Info Page</h1>',
  '/contact': '<h1>Contact Us</h1>',
};

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  // リクエストの経路がマップで定義されているかチェック
  if (routeResponseMap[req.url]) {
    res.end(routeResponseMap[req.url]);
  } else {
    res.end('<h1>Welcome!</h1>');
  }
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
