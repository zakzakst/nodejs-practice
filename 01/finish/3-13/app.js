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

let data = {
  msg: 'no message...',
};

function response_index(req, res) {
  if (req.method === 'POST') {
    // POSTアクセス時の処理
    let body = '';
    req.on('data', data => {
      body += data;
    });
    req.on('end', () => {
      data = qs.parse(body);
      write_index(req, res);
    });
  } else {
    write_index(req, res);
  }
}

function write_index(req, res) {
  let msg = '※伝言を表示します。'
  const content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: data,
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
