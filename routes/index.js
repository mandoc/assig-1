var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cal PPE Graphs' });
});

// Create a route in index.js 
var mongoose = require('mongoose');
var Sample = mongoose.model('Sample');

router.get('/sample', function(req, res, next) {
  Sample.find(function(err, sample){
    if(err){ return next(err); }
    res.json(sample);
  });
});
// END => Create a route in index.js 


module.exports = router;
