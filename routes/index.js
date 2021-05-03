var express = require('express');
var router = express.Router();
 
const NodePOP = require('../models/NodePOP');
const Tag = require('../models/Tag');

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('index', {title: 'NodePOP' });
});

module.exports = router;
