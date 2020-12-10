var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var {check, validationResult} = require('express-validator');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-nodeapp-db',
    charset: 'utf8',
  }
});
var Bookshelf = require('bookshelf')(knex);
var User = Bookshelf.Model.extend({
  tableName: 'users',
});

router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
    form: {
      name: '',
      password: '',
    },
    content: '名前とパスワードを入力してください。',
  });
});

router.post('/', validateParam(), async (req, res, next) => {
  const results = await validationResult(req);
  const result_arr = results.errors;
  if (result_arr.length) {
    let content = '<ul>';
    for (let i in result_arr) {
      content += `<li>${result_arr[i].msg}</li>`;
    }
    content += '</ul>';
    res.render('login', {
      title: 'Login',
      content: content,
      form: req.body,
    });
  } else {
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
          response.render('login', {
            title: '再入力',
            content: '名前またはパスワードが違います。',
            form: req.body,
          });
        } else {
          req.session.login = model.attributes;
          res.render('login', {
            title: 'Login',
            content: 'ログインしました。トップページに戻ってメッセージを送信ください。',
            form: req.body,
          });
        }
      });
  }
});

function validateParam() {
  return [
    check('name')
      .notEmpty()
      .withMessage('NAMEは必ず入力してください。'),
    check('password')
      .notEmpty()
      .withMessage('PASSWORDは必ず入力してください。'),
  ];
}

module.exports = router;
