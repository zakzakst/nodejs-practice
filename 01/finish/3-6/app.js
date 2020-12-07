const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

const server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!')

function getFromClient(req, res) {
  const url_parse = url.parse(req.url, true);
  switch (url_parse.pathname) {
    case '/':
      response_index(req, res);
      break;

    case '/style.css':
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(style_css);
      res.end();
      break;

    default:
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('no page...');
      break;
  }
}

const data = {
  'Taro': '090-999-999',
  'Hanako': '080-888-888',
  'Sachiko': '070-777-777',
  'Ichiro': '060-666-666',
};

function response_index(req, res) {
  const msg = 'これはIndexページです。';
  const content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: data,
    filename: 'data_item',
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
