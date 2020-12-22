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
  // データベースに接続
  const connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  // データを取得
  // sqlSelect(connection, req, res);
  // sqlLimit(connection, req, res);
  // sqlOrderBy(connection, req, res);
  // sqlWhere(connection, req, res);
  sqlWhere2(connection, req, res);
  // 接続を解除
  connection.end();
});

app.listen(port, () => {
  console.log(`Start Server port:${port}`);
});


/**
 * 通常
 */
function sqlSelect(connection, req, res) {
  connection.query('SELECT * from mydata', (err, results, fields) => {
    res.json(results);
  });
}

/**
 * LIMIT
 */
function sqlLimit(connection, req, res) {
  // パラメータから limit を取得
  // const limit = req.query.limit;
  // connection.query(`SELECT * from mydata LIMIT ${limit}`, (err, results, fields) => {
  //   res.json(results);
  // });
  connection.query(`SELECT * from mydata LIMIT 1, 2`, (err, results, fields) => {
    res.json(results);
  });
}

/**
 * ORDER BY
 */
function sqlOrderBy(connection, req, res) {
  const order = 'ASC'; // ASC / DESC
  connection.query(`SELECT * from mydata ORDER BY age ${order}`, (err, results, fields) => {
    res.json(results);
  });
}

/**
 * WHERE
 */
function sqlWhere(connection, req, res) {
  // const conditional = 'age > 20';
  // const conditional = 'age < 20';
  // const conditional = 'age = 29';
  // const conditional = 'age = 29 OR id = 2';
  const conditional = 'age = 29 OR age = 38';
  connection.query(`SELECT * from mydata WHERE ${conditional}`, (err, results, fields) => {
    res.json(results);
  });
}

/**
 * WHERE2
 */
function sqlWhere2(connection, req, res) {
  // const conditional = 'id IN (1, 3, 8)';
  // const conditional = 'id <> 1';
  // const conditional = 'age BETWEEN 20 AND 40';
  // const conditional = 'name LIKE "%chi%"';
  // const conditional = 'name LIKE "ta%"';
  const conditional = 'name LIKE "%ko"';
  connection.query(`SELECT * from mydata WHERE ${conditional}`, (err, results, fields) => {
    res.json(results);
  });
}
