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
      res.render('mysql', {
        title: 'Mysql',
        content: results,
      });
    }
  });
  connection.end();
});

module.exports = router;
