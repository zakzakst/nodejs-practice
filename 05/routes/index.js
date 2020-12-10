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

// Bookshelf.plugin('pagination');
const User = Bookshelf.Model.extend({
  tableName: 'users',
});
const Message = Bookshelf.Model.extend({
  tableName: 'message',
  hasTimestamps: true,
  user: () => {
    return this.belongsTo(User);
  },
});

router.get('/', (req, res, next) => {
  console.log(req.session.login);
  if (req.session.login === undefined) {
    console.log('/users');
    res.redirect('/users');
  } else {
    console.log('/1');
    // res.redirect('/1');
  }
});

// router.get('/:page', (req, res, next) => {
//   if (req.session.login === undefined) {
//     res.redirect('/users');
//     return;
//   }
//   const pg = Number(req.params.page);
//   if (pg < 1) {pg = 1;}
//   new Message()
//     .orderBy('created_at', 'DESC')
//     .fetchPage({
//       page: pg,
//       pageSize: 10,
//       withRelated: ['user'],
//     })
//     .then(collection => {
//       res.render('index', {
//         title: 'Board',
//         login: req.session.login,
//         collection: collection.toArray(),
//         pagination: collection.pagination,
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: true,
//         data: {
//           message: err.message,
//         },
//       });
//     });
// });

router.post('/', (req, res, next) => {
  const rec = {
    message: req.body.msg,
    user_id: req.session.login.id,
  };
  new Message(rec)
    .save()
    .then(model => {
      res.redirect('/');
    });
});

module.exports = router;
