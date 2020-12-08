const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

const data = {
  'Taro': 'taro@yamada',
  'Hanako': 'hanako@flower',
  'Sachiko': 'sachiko@happy',
  'Ichiro': 'ichiro@baseball',
};

app.get('/', (req, res) => {
  res.render('index.ejs', {
    title: 'Index',
    content: '※データを表示します。',
    data: data,
  });
});


// app.get('/', (req, res) => {
//   res.render('index.ejs', {
//     title: 'Index',
//     content: '※メッセージを書いて送信してください。',
//   });
// });

// app.post('/', (req, res) => {
//   res.render('index.ejs', {
//     title: 'Index',
//     content: `あなたは「${req.body.message}」と送信しました。`,
//   });
// });


// // Indexページ
// app.get('/', (req, res) => {
//   res.render('index.ejs', {
//     title: 'Index',
//     content: 'This is Index page',
//     link: {
//       href: '/other?name=taro&pass=yamada',
//       text: '※Otherページに移動',
//     },
//   });
//   // res.send('test');
// });

// // Otherページ
// app.get('/other', (req, res) => {
//   const name = req.query.name;
//   const pass = req.query.pass;
//   res.render('index.ejs', {
//     title: 'Other',
//     // content: 'This is Other page',
//     content: `あなたの名前は「${name}」パスワードは「${pass}」です。`,
//     link: {
//       href: '/',
//       text: '※Indexページに移動',
//     },
//   });
// });

app.listen(3000, () => {
  console.log('Start server port:3000');
});
