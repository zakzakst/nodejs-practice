var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it');
var markdown = new MarkdownIt();
var mysql = require('mysql');
const { route } = require('.');
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
var Markdata = Bookshelf.Model.extend({
  tableName: 'markdata',
  hasTimestamps: true,
  user: () => {
    return this.belongsTo(User);
  }
});

router.get('/', (req, res, next) => {
  res.redirect('/');
  return;
});

router.get('/:id', (req, res, next) => {
  if (req.session.login === null) {
    res.redirect('/login');
    return;
  }
  Markdata
    .query({
      where: {
        user_id: req.session.login.id,
      },
      andWhere: {
        id: req.params.id,
      },
    })
    .fetch()
    .then(model => {
      makepackage(req, res, model, true);
    });
});



function makepackage(req, res, model, flg) {
  let footer;
  if (flg) {
    const d1 = new Date(model.attributes.created_at);
    const dstr1 = `${d1.getFullYear()}-${(d1.getMonth() + 1)}-${d1.getDate()}`;
    const d2 = new Date(model.attributes.updated_at);
    const dstr2 = `${d2.getFullYear()}-${(d2.getMonth() + 1)}-${d2.getDate()}`;
    footer = `(created: ${dstr1}, updated: ${dstr2})`;
  } else {
    footer = '(Updating date and time information...';
  }
  res.render('mark', {
    title: 'Markdown',
    id: req.params.id,
    head: model.attributes.title,
    footer: footer,
    // content: markdown.render(model.attributes.content),
    content: '',
    source: model.attributes.content,
  });
}

module.exports = router;
