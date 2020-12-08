var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  let msg = '※何か書いて送信してください。';
  if (req.session.message !== undefined) {
    msg = `Last Message: ${req.session.message}`;
  }
  // res.render('hello', {
  res.render('ajax', {
    title: 'Hello',
    content: msg,
  });
});

router.post('/post', (req, res, next) => {
  let msg = req.body['message'];
  req.session.message = msg;
  // res.render('hello', {
  res.render('ajax', {
    title: 'Hello',
    content: `Last Message: ${req.session.message}`,
  });
});


// router.get('/', (req, res, next) => {
//   res.render('hello', {
//     title: 'Hello',
//     content: '※何か書いて送信してください。',
//   });
// });

// router.post('/post', (req, res, next) => {
//   const msg = req.body['message'];
//   res.render('hello', {
//     title: 'Hello',
//     content: `あなたは「${msg}」と送信しました。`,
//   });
// });


// router.get('/', function(req, res, next) {
//   const name = req.query.name;
//   const mail = req.query.mail;
//   res.render('hello', {
//     title: 'Hello',
//     // content: 'これはサンプルのコンテンツです。',
//     content: `あなたの名前は${name}。メールアドレスは${mail}です。`,
//   });
// });

module.exports = router;
