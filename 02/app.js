const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const login_page = fs.readFileSync('./login.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

const max_num = 10;
const filename = 'mydata.txt';
let message_data;
readFromFile(filename);

const server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');


// createServerの処理
function getFromClient(req, res) {
  const url_parts = url.parse(req.url, true);

  switch (url_parts.pathname) {
    // トップページ
    case '/':
      resIndex(req, res);
      break;

    // ログインページ
    case '/login':
      resLogin(req, res);
      break;

    case '/style.css':
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(style_css);
      res.end();
      break;

    default:
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end('no page...');
      break;
  }
}

// indexのアクセス処理
function resIndex(req, res) {
  if (req.method === 'POST') {
    // POSTアクセス時
    let body = '';
    req.on('data', data => {
      body += data;
    });
    req.on('end', () => {
      const data = qs.parse(body);
      addToData(data.id, data.msg, filename, req);
      writeIndex(req, res);
    });
  } else {
    writeIndex(req, res);
  }
}

// indexの作成
function writeIndex(req, res) {
  const msg = '※何かメッセージを書いてください。';
  const content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: message_data,
    filename: 'data_item',
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}

// loginのアクセス処理
function resLogin(req, res) {
  const content = ejs.render(login_page, {});
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}

// テキストファイルをロード
function readFromFile(fname) {
  fs.readFile(fname, 'utf-8', (err, data) => {
    message_data = data.split('\n');
  });
}

// データを更新
function addToData(id, msg, fname, req) {
  const obj = {
    id: id,
    msg: msg,
  };
  const obj_str = JSON.stringify(obj);
  console.log('add data: ' + obj_str);
  message_data.unshift(obj_str);
  console.log(message_data);
  if (message_data.length > max_num) {
    message_data.pop();
  }
  saveToFile(fname);
}

// データを保存
function saveToFile(fname) {
  const data_str = message_data.join('\n');
  fs.writeFile(fname, data_str, err => {
    if (err) throw err;
  });
}
