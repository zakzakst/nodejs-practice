'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const request = require('request');
const xml2json = require('xml2json');

app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    title: 'Index',
    content: 'テキスト',
  });
});

const staticData = require('./data/staticData.json');
app.get('/static-data', (req, res) => {
  res.json(staticData);
});

// XMLデータを返す（参考：https://www.codit.work/codes/ws60d1rgn8mohv349yqn/）
app.get('/xml-data', (req, res) => {
  const xmlData = fs.readFileSync('./data/xmlData.xml', "utf-8");
  res.type('application/xml');
  res.send(xmlData);
});

// 外部XMLデータを返す（参考：https://blog.katsubemakito.net/nodejs/request、https://garafu.blogspot.com/2017/05/node-http-httpss-request.html）
// 郵便番号検索API：http://zip.cgis.biz/
app.get('/xml-data2', (req, res) => {
  // const url = 'http://zip.cgis.biz/xml/zip.php?zn=1030000';
  // request.get({url}, (error, response, body) => {
  //   res.type('application/xml');
  //   res.send(body);
  // });

  const url = 'http://zip.cgis.biz/xml/zip.php';
  request.get({
    url: url,
    // パラメータの指定
    qs: {
      zn: '1030000',
    }
  }, (error, response, body) => {
    res.type('application/xml');
    res.send(body);
  });
});

// 外部XMLデータをJSONで返す（参考：http://dotnsf.blog.jp/archives/1077137626.html）
app.get('/xml-data3', (req, res) => {
  const url = 'http://zip.cgis.biz/xml/zip.php';
  request.get({
    url: url,
    qs: {
      zn: '1030000',
    }
  }, (error, response, body) => {
    const jsonStr = xml2json.toJson(body);
    const jsonData = JSON.parse( jsonStr );
    res.json(jsonData);
  });
});

app.listen(3000, () => {
  console.log('Start server port:3000');
});
