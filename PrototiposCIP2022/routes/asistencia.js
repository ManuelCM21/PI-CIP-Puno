var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

router.get('/pages/asistencia', function (req, res, next) {

    dbConn.query('SELECT * FROM notificacion', function (err, rows) {
  
      if (err) {
        req.flash('error', err);
        res.render('pages/asistencia', { data: '' });
      } else {
        res.locals.email = req.session.email;
        res.locals.rol = req.session.rol;
        res.render('pages/asistencia', { data: rows });
      }
    });
  
});
  
module.exports = router;