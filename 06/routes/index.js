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
  }
});
var Bookshelf = require('bookshelf')(knex);
var User = Bookshelf.Model.extend({
  tableName: 'users',
});
var MarkData = Bookshelf.Model.extend({
  tableName: 'markdata',
  hasTimestamps: true,
  user: () => {
    return this.belongsTo(User);
  }
});

router.get('/', (req, res, next) => {
  if (req.session.login === undefined) {
    res.redirect('/login');
    return;
  }
  new MarkData(['title'])
    .orderBy('created_at', 'DESC')
    .fetchPage({
      page: 1,
      pageSize: 10,
      withRelated: ['user'],
    })
    .then(collection => {
      res.render('index', {
        title: 'Markdown',
        login: req.session.login,
        message: '※最近の投稿データ',
        form: {
          find: '',
        },
        content: collection.toArray(),
      });
    });
});

router.post('/', (req, res, next) => {
  new MarkData()
    .orderBy('created_at', 'DESC')
    .where('content', 'like', `%${req.body.find}%`)
    .fetchAll({
      withRelated: ['user'],
    })
    .then(collection => {
      res.render('index', {
        title: 'Markdown',
        login: req.session.login,
        message: `※"${req.body.find}"で検索された最近の投稿データ`,
        form: req.body,
        content: collection.toArray(),
      });
    });
})

module.exports = router;
