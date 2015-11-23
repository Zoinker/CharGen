var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Fantasy Character Generator!', 						"races": ["Human", "Elf", "Orc"],
						"genders": ["Female", "Male", "Neither"],
						points: 30});
});

module.exports = router;
