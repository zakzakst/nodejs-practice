var express = require('express');
var router = express.Router();
var http = require('https');
var parseString = require('xml2js').parseString;

router.get('/', (req, res, next) => {
  const opt = {
    host: 'news.google.com',
    port: 443,
    path: '/rss?hl=ja&gl=JP&ceid=JP:ja',
  };
  http.get(opt, rssRes => {
    let body = '';
    rssRes.on('data', data => {
      body += data;
    });
    rssRes.on('end', () => {
      parseString(body.trim(), (err, result) => {
        console.log(result);
        res.render('xml', {
          title: 'Xml',
          content: result.rss.channel[0].item,
        });
      });
    });
  })
});

module.exports = router;
