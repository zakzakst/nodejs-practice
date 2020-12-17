'use strict';

exports.logRequestRaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.sendReqParam = (req, res) => {
  const veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {
  res.render('index');
};
