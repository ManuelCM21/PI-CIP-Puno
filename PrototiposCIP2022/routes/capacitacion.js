var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

router.get('/pages/capacitaciones', function (req, res, next) {

    dbConn.query('SELECT * FROM eventos', function (err, rows) {

        if (err) {
            req.flash('error', err);
            res.render('pages/capacitaciones', { data: '' });
        } else {
            res.locals.email = req.session.email;
            res.locals.rol = req.session.rol;
            res.render('pages/capacitaciones', { data: rows });
        }
    });
});

router.get('/pages/inscripcion', function (req, res, next) {

    dbConn.query('SELECT * FROM `inscripcion` ORDER BY idins DESC', function (err, rows) {

        if (err) {
            req.flash('error', err);
            res.render('pages/inscripcion', { data: '' });
        } else {
            res.locals.email = req.session.email;
            res.locals.rol = req.session.rol;
            res.render('pages/inscripcion', { data: rows });
        }
    });
});

router.get('/inscripevento/(:ideve)', function (req, res, next) {

    let ideve = req.params.ideve;

    res.locals.nombre = req.session.nombre;
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;

    dbConn.query('SELECT * FROM eventos WHERE ideve = ' + ideve, function (err, rows, fields) {

        console.log(rows[0]);
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with ideve = ' + ideve)
            res.redirect('/pages/capacitaciones')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('sub-page/inscripcion-capacitacion', {
                ideve: rows[0].ideve,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion,
                ponente: rows[0].ponente,
                duracion: rows[0].duracion,
                modalidad: rows[0].modalidad,
                costo: rows[0].costo,
                fecha: rows[0].fecha,
                hora: rows[0].hora,
                imagen: rows[0].imagen
            })
        }
    })
});

router.post('/addcap/(:ideve)', function (req, res, next) {

    let ideve = req.params.ideve;
    console.log(req.body);

    let nombre = req.body.nombre;
    let email = req.body.email;
    let celular = req.body.celular;
    let dni = req.body.dni;
    let direccion = req.body.direccion;
    let estado = req.body.estado;
    let fecha = req.body.fecha;
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            nombre: nombre,
            email: email,
            celular: celular,
            dni: dni,
            direccion: direccion,
            estado: estado,
            fecha: fecha,
            ideve: ideve,
        }

        // insert query
        dbConn.query('INSERT INTO inscripcion SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('capacitacion/addcap', {
                    nombre: nombre,
                    email: email,
                    celular: celular,
                    dni: dni,
                    direccion: direccion,
                    estado: estado,
                    fecha: fecha,
                    ideve: ideve,
                })
            } else {
                req.flash('success', 'Person successfully added');
                res.redirect('/pages/capacitaciones');
            }
        })
    }
})

router.get('/aprocap/(:idins)', function (req, res, next) {

    res.locals.nombre = req.session.nombre;
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;

    let idins = req.params.idins;
    let estado = "Aprobado";
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            estado: estado,
        }
        // update query
        dbConn.query('UPDATE inscripcion SET ? WHERE idins = ' + idins, form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('pages/inscripcion', {
                })
            } else {
                req.flash('success', 'Evento actualizado con exito');
                res.redirect('/pages/inscripcion');
            }
        })
    }
    let autor = "CIP CD Puno";
    let descripcion = "Respuesta de solicitud de inscripción al evento";

    // if no error
    if (!errors) {

        var form_data = {
            autor: autor,
            descripcion: descripcion,
            idins: idins,
        }

        // insert query
        dbConn.query('INSERT INTO notificacion SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('pages/inscripcion', {
                    autor: autor,
                    descripcion: descripcion,
                    idins: idins,
                })
            }
        })
    }
})

router.get('/rechacap/(:idins)', function (req, res, next) {

    res.locals.nombre = req.session.nombre;
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;

    let idins = req.params.idins;
    let estado = "Rechazado";
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            estado: estado,
        }
        // update query
        dbConn.query('UPDATE inscripcion SET ? WHERE idins = ' + idins, form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('pages/inscripcion', {
                })
            } else {
                req.flash('success', 'Evento actualizado con exito');
                res.redirect('/pages/inscripcion');
            }
        })
    }

    let autor = "CIP CD Puno";
    let descripcion = "Respuesta de solicitud de inscripción al evento";

    // if no error
    if (!errors) {

        var form_data = {
            autor: autor,
            descripcion: descripcion,
            idins: idins,
        }

        // insert query
        dbConn.query('INSERT INTO notificacion SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('pages/inscripcion', {
                    autor: autor,
                    descripcion: descripcion,
                    idins: idins,
                })
            }
        })
    }
})

router.get('/link/(:idins)', function (req, res, next) {

    res.locals.nombre = req.session.nombre;
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;

    let idins = req.params.idins;
    let errors = false;
    let autor = "CIP CD Puno";
    let descripcion = "Confirmación de asistencia al evento";

    // if no error
    if (!errors) {

        var form_data = {
            autor: autor,
            descripcion: descripcion,
            idins: idins,
        }

        // insert query
        dbConn.query('INSERT INTO notificacion SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('pages/inscripcion', {
                    autor: autor,
                    descripcion: descripcion,
                    idins: idins,
                })
            } else {
                req.flash('success', 'Person successfully added');
                res.redirect('/pages/inscripcion');
            }
        })
    }

    let estado = "Pendiente";
    
    if (!errors) {

        var form_data = {
            estado: estado,
            idins: idins,
        }

        // insert query
        dbConn.query('INSERT INTO asistencia SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('pages/inscripcion', {
                    autor: autor,
                    descripcion: descripcion,
                    idins: idins,
                })
            }
        })
    }
})

module.exports = router;