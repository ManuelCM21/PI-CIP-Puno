var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

router.get('/pages/eventos', function (req, res, next) {

    dbConn.query('SELECT * FROM eventos', function (err, rows) {

        if (err) {
            req.flash('error', err);
            res.render('pages/eventos', { data: '' });
        } else {
            res.locals.email = req.session.email;
            res.locals.rol = req.session.rol;
            res.render('pages/eventos', { data: rows });
        }
    });
});

router.get('/crear-evento', function (req, res, next) {
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;
    res.render('sub-page/crear-evento');
});

module.exports = router;