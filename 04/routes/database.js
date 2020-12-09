var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var {check, validationResult} = require('express-validator');
var knex = require('knex')({
  dialect: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-nodeapp-db',
    charset: 'utf8',
  }
});
var Bookshelf = require('bookshelf')(knex);
// Bookshelf.plugin('pagination');

const MyData = Bookshelf.Model.extend({
  tableName: 'mydata',
});

const mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-nodeapp-db',
};

router.get('/', (req, res, next) => {
  new MyData().fetchAll().then(collection => {
    res.render('database/index', {
      title: 'Mysql',
      content: collection.toArray(),
    });
  })
  .catch(err => {
    res.status(500).json({
      error: true,
      data: {
        message: err.message,
      },
    });
  });
});

// router.get('/', (req, res, next) => {
//   const connection = mysql.createConnection(mysql_setting);
//   connection.connect();
//   connection.query('SELECT * from mydata', (err, results, fields) => {
//     if (err === null) {
//       res.render('database/index', {
//         title: 'Mysql',
//         content: results,
//       });
//     }
//   });
//   connection.end();
// });

router.get('/:page', (req, res, next) => {
  let pg = Number(req.params.page);
  if (pg < 1) {
    pg = 1;
  }
  new MyData().fetchPage({
    page: pg,
    pageSize: 3,
  })
  .then(collection => {
    res.render('database/index', {
      title: 'Mysql',
      content: collection.toArray(),
      pagination: collection.pagination,
    });
  })
  .catch(err => {
    res.status(500).json({
      error: true, data: {
        message: err.message,
      },
    });
  });
});

// レコード追加
router.get('/add', (req, res, next) => {
  res.render('database/add', {
    title: 'Database/Add',
    content: '新しいレコードを入力',
    form: {
      name: '',
      mail: '',
      age: 0,
    },
  });
});

router.post('/add', (req, res, next) => {
  new MyData(req.body).save().then(model => {
    res.redirect('/database');
  });
});

// router.post('/add', validateParam(), async (req, res, next) => {
//   const results = await validationResult(req);
//   const result_arr = results.errors;
//   if (result_arr.length) {
//     let re = '<ul class="error">';
//     for (let n in result_arr) {
//       re += `<li>${result_arr[n].msg}</li>`;
//     }
//     re += '</ul>';
//     res.render('database/add', {
//       title: 'Database/Add',
//       content: re,
//       form: req.body,
//     });
//   } else {
//     const name = req.body.name;
//     const mail = req.body.mail;
//     const age = req.body.age;
//     const data = {
//       name: name,
//       mail: mail,
//       age: age,
//     };
//     const connection = mysql.createConnection(mysql_setting);
//     connection.connect();
//     connection.query('insert into mydata set ?', data, (err, results, fields) => {
//       res.redirect('/database');
//     });
//     connection.end();
//   }

//   // req.check('name', 'NAMEは必ず入力してください。').notEmpty();
//   // req.check('mail', 'MAILはメールアドレスを入力してください。').isEmail();
//   // req.check('age', 'AGEは年齢（整数）を入力してください。').isInt();

//   // req.getValidationResult().then(result => {
//   //   if (!result.isEmpty()) {
//   //     const result_arr = result.array();
//   //     let re = '<ul class="error">';
//   //     for (let n in result_arr) {
//   //       re += `<li>${result_arr[n].msg}</li>`;
//   //     }
//   //     re += '</ul>';
//   //     res.render('database/add', {
//   //       title: 'Database/Add',
//   //       content: re,
//   //       form: req.body,
//   //     });
//   //   } else {
//   //     const name = req.body.name;
//   //     const mail = req.body.mail;
//   //     const age = req.body.age;
//   //     const data = {
//   //       name: name,
//   //       mail: mail,
//   //       age: age,
//   //     };
//   //     const connection = mysql.createConnection(mysql_setting);
//   //     connection.connect();
//   //     connection.query('insert into mydata set ?', data, (err, results, fields) => {
//   //       res.redirect('/database');
//   //     });
//   //     connection.end();
//   //   }
//   // });
// });

// function validateParam() {
//   return [
//     check('name')
//       .notEmpty()
//       .withMessage('NAMEは必ず入力してください。'),
//     check('mail')
//       .isEmail()
//       .withMessage('MAILはメールアドレスを入力してください。'),
//     check('age')
//       .isInt()
//       .withMessage('AGEは年齢（整数）を入力してください。'),
//   ];
// }

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

// レコード検索
router.get('/find', (req, res, next) => {
  res.render('database/find', {
    title: 'Database/Find',
    content: '検索IDを入力',
    form: {fstr: ''},
    mydata: null,
  });
});

router.post('/find', (req, res, next) => {
  new MyData().where('id', '=', req.body.fstr).fetch().then(collection => {
    res.render('database/find', {
      title: 'Database/Find',
      content: `※id = ${req.body.fstr} の検索結果`,
      form: req.body,
      mydata: collection,
    });
  });
});

module.exports = router;
