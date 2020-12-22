'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 3000;
const mysqlSetting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-nodeapp-db',
};

app.engine('ejs', ejs.renderFile);
app.use(bodyParser.urlencoded({extended: false}));

/**
 * 通常
 */
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/', (req, res) => {
  const data = req.body;
  res.render('index-post.ejs', data);
});


/**
 * データ追加
 */
app.get('/add', (req, res) => {
  res.render('add.ejs');
});

app.post('/add', (req, res) => {
  const data = req.body;
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを追加
  connection.query('INSERT INTO mydata SET ?', data, (err, results, fields) => {
    res.redirect('/complete?type=add');
  });
  // 接続を解除
  connection.end();
});


/**
 * データ削除
 */
app.get('/delete', (req, res) => {
  const id = req.query.id;
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを取得
  // connection.query(`SELECT * FROM mydata WHERE id = ${id}`, (err, results, fields) => {
  connection.query('SELECT * FROM mydata WHERE id = ?', id, (err, results, fields) => {
    res.render('delete.ejs', results[0]);
  });
  // 接続を解除
  connection.end();
});

app.post('/delete', (req, res) => {
  const id = req.body.id;
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを削除
  connection.query('DELETE FROM mydata WHERE id = ?', id, (err, results, fields) => {
    res.redirect('/complete?type=delete');
  });
  // 接続を解除
  connection.end();
});


/**
 * データ編集
 */
app.get('/edit', (req, res) => {
  const id = req.query.id;
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを取得
  connection.query('SELECT * FROM mydata WHERE id = ?', id, (err, results, fields) => {
    res.render('edit.ejs', results[0]);
  });
  // 接続を解除
  connection.end();
});

app.post('/edit', (req, res) => {
  const data = req.body;
  const id = req.body.id;
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを削除
  connection.query('UPDATE mydata SET ? WHERE id = ?', [data, id], (err, results, fields) => {
    res.redirect('/complete?type=edit');
  });
  // 接続を解除
  connection.end();
});


/**
 * 完了
 */
app.get('/complete', (req, res) => {
  const type = req.query.type;
  let typeStr;
  switch (type) {
    case 'add':
      typeStr = '追加';
      break;
    case 'edit':
      typeStr = '編集';
      break;
    case 'delete':
      typeStr = '削除';
      break;
    default:
      typeStr = '';
      break;
  }
  res.render('complete.ejs', { typeStr });
});

app.listen(port, () => {
  console.log(`Start server port: ${port}`);
});
