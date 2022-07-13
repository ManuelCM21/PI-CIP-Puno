var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

router.post('/add', function (req, res, next) {
    console.log(req.body);
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let ponente = req.body.ponente;
    let modalidad = req.body.modalidad;
    let costo = req.body.costo;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    let imagen = req.body.imagen;
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            nombre: nombre,
            descripcion: descripcion,
            ponente: ponente,
            modalidad: modalidad,
            costo: costo,
            fecha: fecha,
            hora: hora,
            imagen: imagen
        }

        // insert query
        dbConn.query('INSERT INTO eventos SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('web/add', {
                    nombre: nombre,
                    descripcion: descripcion,
                    ponente: ponente,
                    modalidad: modalidad,
                    costo: costo,
                    fecha: fecha,
                    hora: hora,
                    imagen: imagen
                })
            } else {
                req.flash('success', 'Person successfully added');
                res.redirect('/pages/eventos');
            }
        })
    }
})

router.post('/agregar', function (req, res, next) {
    console.log(req.body);
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let dni = req.body.dni;
    let celular = req.body.celular;
    let email = req.body.email;

    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            nombre: nombre,
            apellidos: apellidos,
            dni: dni,
            celular: celular,
            email: email
        }

        // insert query
        dbConn.query('INSERT INTO postulantes SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('web/agregar', {
                    nombre: nombre,
                    apellidos: apellidos,
                    dni: dni,
                    celular: celular,
                    email: email

                })
            } else {
                req.flash('success', 'Person successfully added');
                res.redirect('/');
            }
        })
    }
})


// delete evento
router.get('/delete/(:id)', function (req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM eventos WHERE id = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/pages/eventos')
        } else {
            // set flash message
            req.flash('success', 'Evento eliminado con éxito! ID = ' + id)

            // redirect to books page
            res.redirect('/pages/eventos')
        }
    })
})

// display edit book page
router.get('/edit/(:id)', function (req, res, next) {

    let id = req.params.id;

    dbConn.query('SELECT * FROM eventos WHERE id = ' + id, function (err, rows, fields) {

        console.log(rows[0]);
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + id)
            res.redirect('/pages/eventos')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('sub-page/actualizar-evento', {
                id: rows[0].id,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion,
                ponente: rows[0].ponente,
                modalidad: rows[0].modalidad,
                costo: rows[0].costo,
                fecha: rows[0].fecha,
                hora: rows[0].hora,
                imagen: rows[0].imagen
            })
        }
    })
})

// update evento
router.post('/update/(:id)', function (req, res, next) {

    console.log(req.body);
    let id = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let ponente = req.body.ponente;
    let modalidad = req.body.modalidad;
    let costo = req.body.costo;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    let imagen = req.body.imagen;
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            nombre: nombre,
            descripcion: descripcion,
            ponente: ponente,
            modalidad: modalidad,
            costo: costo,
            fecha: fecha,
            hora: hora,
            imagen: imagen
        }
        // update query
        dbConn.query('UPDATE eventos SET ? WHERE id = ' + id, form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('sub-page/actualizar-evento', {
                    id: req.params.id,
                    nombre: nombre,
                    descripcion: descripcion,
                    ponente: ponente,
                    modalidad: modalidad,
                    costo: costo,
                    fecha: fecha,
                    hora: hora,
                    imagen: imagen
                })
            } else {
                req.flash('success', 'Evento actualizado con exito');
                res.redirect('/pages/eventos');
            }
        })
    }
})

module.exports = router;