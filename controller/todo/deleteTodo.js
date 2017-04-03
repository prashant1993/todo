
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  todo.findByIdAndRemove(req.params.id, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});
module.exports = router;
