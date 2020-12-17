'use strict';

const express = require('express');
const app = express();
const errorController = require('./controllers/errorController');
const homeController = require('./controllers/homeController');
const layouts = require('express-ejs-layouts');
const MongoDB = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'recipe_db';

MongoDB.connect(
  dbURL,
  (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    db.collection('contacts')
      .find()
      .toArray((error, data) => {
        if (error) throw error;
        console.log(data);
      });
    db.collection('contacts')
      .insert({
        name: 'Freddie Mercury',
        email: 'fred@queen.com',
      }, (error, db) => {
        if (error) throw error;
        console.log(db);
      });
  }
);

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get('/name', homeController.respondWithName);
app.get('/items/:vegetable', homeController.sendReqParam);

app.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send('POST Successful!');
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
