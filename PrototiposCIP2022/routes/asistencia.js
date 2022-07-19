const { data } = require('autoprefixer');
var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

router.get('/listarasis', function (req, res, next) {

  dbConn.query('SELECT asistencia.idasis, asistencia.estado, eventos.nombre, eventos.fecha FROM eventos, inscripcion, asistencia WHERE eventos.ideve = inscripcion.ideve AND inscripcion.idins = asistencia.idins', function (err, rows) {

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

router.get('/confirasis/(:idasis)', function (req, res, next) {

  res.locals.nombre = req.session.nombre;
  res.locals.email = req.session.email;
  res.locals.rol = req.session.rol;

  let idasis = req.params.idasis;

  // insert query
  dbConn.query('SELECT * FROM asistencia WHERE idasis = ' + idasis, function (err, rows, fields) {

    console.log(rows[0]);
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'Book not found with idasis = ' + idasis)
      res.redirect('/pages/asistencia')
    }
    // if book found
    else {
      res.render('sub-page/confirmar-asistencia', {
        idasis: rows[0].idasis,
        estado: rows[0].estado,
        idins: rows[0].idins,
      })
    }
  })
})

router.post('/regisasis/(:idasis)', function (req, res, next) {

  res.locals.nombre = req.session.nombre;
  res.locals.email = req.session.email;
  res.locals.rol = req.session.rol;

  console.log(req.body);
  let idasis = req.params.idasis;

  let usuario = req.body.usuario;
  let email = req.body.email;
  let celular = req.body.celular;
  let errors = false;


  let estado = "Confirmado";
  // if no error
  if (!errors) {

    var form_data = {
      estado: estado,
    }
    // update query
    dbConn.query('UPDATE asistencia SET ? WHERE idasis = ' + idasis, form_data, function (err, result) {
      //if(err) throw err
      if (err) {
        // set flash message
        req.flash('error', err)
        // render to edit.ejs
        res.render('sub-page/confirmar-asistencia', {
        })
      } else {
        req.flash('success', 'Evento actualizado con exito');
        res.redirect('/pages/asistencia');
      }
    })
  }

  if (!errors) {

    var form_data = {
      usuario: usuario,
      email: email,
      celular: celular,
      idasis: idasis,
    }

    // insert query
    dbConn.query('INSERT INTO confir_asistencia SET ?', form_data, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash('error', err)

        // render to add.ejs
        res.render('sub-page/confirmar-asistencia', {
          usuario: usuario,
          email: email,
          celular: celular,
          idasis: idasis,
        })
      }
    })
  }
})

router.get('/pages/asistencia', function (req, res) {
  
  res.redirect("/listarasis");
});

module.exports = router;