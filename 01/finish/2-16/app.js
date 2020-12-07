const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

const server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!')

function getFromClient(req, res) {
  const url_parse = url.parse(req.url);
  switch (url_parse.pathname) {
    case '/':
      const content = ejs.render(index_page, {
        title: 'Index',
        content: 'これは、EJSを使ったWebページです。'
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
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
