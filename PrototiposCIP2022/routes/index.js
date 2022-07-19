var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/inscripcion', function (req, res, next) {
  res.render('inscripcion');
});
router.get('/buscar', function (req, res, next) {
  res.render('buscar');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/main', function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;
  console.log(email);

  dbConn.query("SELECT * FROM usuarios WHERE email='" + email + "' AND password='" + password + "'", function (err, rows) {
    if (err) {
      req.flash('error', err);
    } else {
      if (rows.length) {
        console.log(rows);
        req.session.idu = rows[0]["id"];
        req.session.nombre = rows[0]["nombre"];
        req.session.email = rows[0]["email"];
        req.session.rol = rows[0]["rol"];
        req.session.loggedin = true;
        res.redirect('/pages/dashboard');
      } else {
        req.flash('error', 'El usuario no existe...');
        res.redirect('/login');
      }
    }
  });
});

router.get('/pages/dashboard', function (req, res, next) {
  if (!req.session.loggedin) {
    res.redirect('/');
  } else {
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;
    res.render('pages/dashboard');
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});

router.get('/pages/solicitudes', function (req, res, next) {

  dbConn.query('SELECT * FROM postulantes', function (err, rows) {

    if (err) {
      req.flash('error', err);
      res.render('pages/solicitudes', { data: '' });
    } else {
      res.locals.email = req.session.email;
      res.locals.rol = req.session.rol;
      res.render('pages/solicitudes', { data: rows });
    }
  });
});

router.get('/pages/pagos', function (req, res, next) {
  res.locals.email = req.session.email;
  res.locals.rol = req.session.rol;
  res.render('pages/pagos');
});

router.get('/pages/notificacion', function (req, res, next) {

  dbConn.query('SELECT * FROM notificacion ORDER BY idnot DESC', function (err, rows) {

    if (err) {
      req.flash('error', err);
      res.render('pages/notificacion', { data: '' });
    } else {
      res.locals.email = req.session.email;
      res.locals.rol = req.session.rol;
      res.render('pages/notificacion', { data: rows });
    }
  });

});


router.get('/ver/(:idnot)', function (req, res, next) {

  let idnot = req.params.idnot;

  dbConn.query('SELECT * FROM inscripcion JOIN notificacion WHERE (notificacion.idins = inscripcion.idins) AND notificacion.idnot=' + idnot, function (err, rows) {

    console.log(rows[0]);
    if (rows.length <= 0) {
      req.flash('error', 'Book not found with id = ');
      res.render('sub-page/ver-noti', { data: '' });
    } else {
      res.locals.email = req.session.email;
      res.locals.rol = req.session.rol;
      res.render('sub-page/ver-noti', {
        data: rows,
        idins: rows[0].idins,
        nombre: rows[0].nombre,
        email: rows[0].email,
        celular: rows[0].celular,
        dni: rows[0].dni,
        direccion: rows[0].direccion,
        estado: rows[0].estado,
        fecha: rows[0].fecha,
      });
    }
  });

});

router.get('/pages/calendario', function (req, res, next) {
  res.locals.email = req.session.email;
  res.locals.rol = req.session.rol;
  res.render('pages/calendario');
});

router.get('/pages/perfil', function (req, res, next) {
  res.locals.nombre = req.session.nombre;
  res.locals.email = req.session.email;
  res.locals.rol = req.session.rol;
  res.render('pages/perfil');
});


module.exports = router;
