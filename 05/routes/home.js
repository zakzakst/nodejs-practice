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
// Bookshelf.plugin('pagination');

const User = Bookshelf.Model.extend({
  tableName: 'users',
});

const Message = Bookshelf.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
  user: () => {
    return this.belongsTo(User);
  }
});

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.get('/:id', (req, res, next) => {
  res.redirect(`/home/${req.params.id}/1`);
});

router.get('/:id/:page', (req, res, next) => {
  const id = Number(req.params.id);
  const pg = req.params.page;
  if (pg < 1) {pg = 1;}
  new Message()
    .orderBy('created_at', 'DESC')
    .where('user_id', '=', id)
    .fetchPage({
      page: pg,
      pageSize: 10,
      withRelated: ['user'],
    })
    .then(collection => {
      res.render('home', {
        title: 'Board/Home',
        login: req.session.login,
        user_id: id,
        collection: collection.toArray(),
        pagination: collection.pagination,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        data: {
          message: err.message
        },
      });
    });
});

module.exports = router;
