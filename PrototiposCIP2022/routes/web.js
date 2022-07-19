var express = require('express');
var router = express.Router();

var dbConn = require('../lib/db');

router.post('/add', function (req, res, next) {
    console.log(req.body);
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let ponente = req.body.ponente;
    let duracion = req.body.duracion;
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
            duracion: duracion,
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
                    duracion: duracion,
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
    let apellidop = req.body.apellidop;
    let apellidom = req.body.apellidom;
    let dni = req.body.dni;
    let celular = req.body.celular;
    let email = req.body.email;
    let especialidad = req.body.especialidad;
    let docd = req.body.docd;
    let doct = req.body.doct;
    let docc = req.body.docc;
    let docf = req.body.docf;
    let docft = req.body.docft;
    let errors = false;
    var form_data = {
        nombre: nombre,
        apellidop: apellidop,
        apellidom: apellidom,
        dni: dni,
        celular: celular,
        email: email,
        especialidad: especialidad
    }
    dbConn.query('INSERT INTO personas SET ?', form_data, function (err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)

            // render to add.ejs
            res.render('web/agregar', {
                nombre: nombre,
                apellidop: apellidop,
                apellidom: apellidom,
                dni: dni,
                celular: celular,
                email: email,
                especialidad: especialidad,

            })
        } else {
            req.flash('success', 'Person successfully added');
            res.redirect('/');
        }
    }
    )


    // if no error
    if (!errors) {

        var form_data = {
            nombre: nombre,
            apellidop: apellidop,
            apellidom: apellidom,
            dni: dni,
            celular: celular,
            email: email,
            especialidad: especialidad,
            docd: docd,
            doct: doct,
            docc: docc,
            docf: docf,
            docft: docft
        }
        // insert query
        dbConn.query('INSERT INTO postulantes SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('web/agregar', {
                    nombre: nombre,
                    apellidop: apellidop,
                    apellidom: apellidom,
                    dni: dni,
                    celular: celular,
                    email: email,
                    especialidad: especialidad,
                    docd: docd,
                    doct: doct,
                    docc: docc,
                    docf: docf,
                    docft: docft

                })
            }
        })

    }

})

// delete evento
router.get('/delete/(:ideve)', function (req, res, next) {

    let ideve = req.params.ideve;

    dbConn.query('DELETE FROM eventos WHERE ideve = ' + ideve, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/pages/eventos')
        } else {
            // set flash message
            req.flash('success', 'Evento eliminado con éxito! ID = ' + ideve)

            // redirect to books page
            res.redirect('/pages/eventos')
        }
    })
})

// display edit book page
router.get('/edit/(:ideve)', function (req, res, next) {

    let ideve = req.params.ideve;

    res.locals.nombre = req.session.nombre;
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;

    dbConn.query('SELECT * FROM eventos WHERE ideve = ' + ideve, function (err, rows, fields) {

        console.log(rows[0]);
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with ideve = ' + ideve)
            res.redirect('/pages/eventos')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('sub-page/actualizar-evento', {
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
})

// update evento
router.post('/update/(:ideve)', function (req, res, next) {

    res.locals.nombre = req.session.nombre;
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;

    console.log(req.body);
    let ideve = req.params.ideve;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let ponente = req.body.ponente;
    let duracion = req.body.duracion;
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
            duracion: duracion,
            modalidad: modalidad,
            costo: costo,
            fecha: fecha,
            hora: hora,
            imagen: imagen
        }
        // update query
        dbConn.query('UPDATE eventos SET ? WHERE ideve = ' + ideve, form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('sub-page/actualizar-evento', {
                    ideve: req.params.ideve,
                    nombre: nombre,
                    descripcion: descripcion,
                    ponente: ponente,
                    duracion: duracion,
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