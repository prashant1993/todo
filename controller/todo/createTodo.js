
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');
/* POST /todos */
router.post('/', function(req, res, next) {
  todo.create(req.body, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

 module.exports = router;
