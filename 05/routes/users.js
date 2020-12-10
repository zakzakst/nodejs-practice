var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-nodeapp-db',
    charset: 'utf8',
  },
});
var Bookshelf = require('bookshelf')(knex);
var User = Bookshelf.Model.extend({
  tableName: 'users',
});

router.get('/', (req, res, next) => {
  res.render('users/login', {
    title: 'Users/Login',
    form: {
      name: '',
      password: '',
    },
    content: '名前とパスワードを入力してください。',
  });
});

router.post('/', (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  User
    .query({
      where: {
        name: name,
      },
      andWhere: {
        password: password,
      },
    })
    .fetch()
    .then(model => {
      if (model === null) {
        res.render('users/login', {
          title: '再入力',
          content: '名前またはパスワードが違います。',
          form: req.body,
        });
      } else {
        req.session.login = model.attributes;
        res.render('users/login', {
          title: 'Users/Login',
          content: 'ログインしました。トップページに戻ってメッセージを送信ください。',
          form: req.body,
        });
      }
    })
});

router.get('/add', (req, res, next) => {
  res.render('users/add', {
    title: 'Users/Add',
    form: {
      name: '',
      password: '',
      comment: '',
    },
    content: '※登録する名前・パスワード・コメントを入力してください。',
  });
});

router.post('/add', (req, res, next) => {
  req.session.login = null;
  new User(req.body).save().then(model => {
    res.redirect('/');
  });
});

module.exports = router;
