'use strict';

const express = require('express');
const app = express();
const mysql = require('mysql');

const port = 3000;
const mysqlSetting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-nodeapp-db',
};

app.get('/', (req, res) => {
  // パラメータからIDを取得
  const id = req.query.id;
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを取得
  connection.query('SELECT * from mydata', (err, results, fields) => {
    // ・forEachの例
    // results.forEach(result => {
    //   console.log(result);
    // });

    // ・mapの例
    // const mapArr = results.map(result => {
    //   return result.id;
    // });
    // console.log(mapArr);

    // ・findの例
    // const findItem = results.find(result => {
    //   return result.id === Number(id);
    // });
    // console.log(findItem);

    // ・filterの例
    // const filterArr = results.filter(result => {
    //   return result.id > 2;
    // });
    // console.log(filterArr);

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Start Server port:${port}`);
});
