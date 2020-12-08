var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-nodeapp-db',
};

router.get('/', (req, res, next) => {
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from mydata', (err, results, fields) => {
    if (err === null) {
      res.render('database/index', {
        title: 'Mysql',
        content: results,
      });
    }
  });
  connection.end();
});

// レコード追加
router.get('/add', (req, res, next) => {
  res.render('database/add', {
    title: 'Database/Add',
    content: '新しいレコードを入力',
  });
});

router.post('/add', (req, res, next) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const age = req.body.age;
  const data = {
    name: name,
    mail: mail,
    age: age,
  };
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('insert into mydata set ?', data, (err, results, fields) => {
    res.redirect('/database');
  });
  connection.end();
});

// レコード表示
router.get('/show', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from mydata where id=?', id, (err, results, fields) => {
    if (err === null) {
      res.render('database/show', {
        title: 'Database/Show',
        content: `id = ${id}のレコード`,
        mydata: results[0],
      });
    }
  });
  connection.end();
});

// レコード編集
router.get('/edit', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from mydata where id=?', id, (err, results, fields) => {
    if (err === null) {
      res.render('database/edit', {
        title: 'Database/Edit',
        content: `id = ${id}のレコード`,
        mydata: results[0],
      });
    }
  });
  connection.end();
});

router.post('/edit', (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const mail = req.body.mail;
  const age = req.body.age;
  const data = {
    name: name,
    mail: mail,
    age: age,
  };
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('UPDATE mydata set ? where id=?', [data, id], (err, results, fields) => {
    res.redirect('/database');
  });
  connection.end();
});

// レコード削除
router.get('/delete', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from mydata where id=?', id, (err, results, fields) => {
    res.render('database/delete', {
      title: 'Database/Delete',
      content: `id = ${id}のレコード`,
      mydata: results[0],
    });
  });
  connection.end();
});

router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  console.log(id);
  connection.query('DELETE from mydata where id=?', id, (err, results, fields) => {
    res.redirect('/database');
  });
  connection.end();
});

module.exports = router;
