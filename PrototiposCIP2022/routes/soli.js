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

router.get('/editar/(:id)', function (req, res, next) {

    let id = req.params.id;

    res.locals.nombre = req.session.nombre;
    res.locals.apellidop = req.session.apellidop;
    res.locals.apellidom = req.session.apellidom;
    res.locals.email = req.session.email;
    res.locals.especialidad = req.session.especialidad;
    res.locals.rol = req.session.rol;

    dbConn.query('SELECT * FROM Postulantes WHERE id = ' + id, function (err, rows, fields) {

        console.log(rows[0]);
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + id)
            res.redirect('/pages/solicitudes')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('sub-page/edit-solicitud', {
                id: rows[0].id,
                nombre: rows[0].nombre,
                apellidop: rows[0].apellidop,
                apellidom: rows[0].apellidom,
                dni: rows[0].dni,
                celular: rows[0].celular,
                email: rows[0].email,
                especialidad: rows[0].especialidad,
                
            })
        }
    })
})
router.post('/addsoli', function (req, res, next) {
    console.log(req.body);
    let nombre = req.body.nombre;
    let apellidop = req.body.apellidop;
    let apellidom = req.body.apellidom;
    let email = req.body.email;
    let especialidad = req.body.especialidad;
    let password = req.body.password;
    let rol = req.body.rol;
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            nombre:nombre,
            apellidop:apellidop,
            apellidom:apellidom,
            email: email,
            especialidad:especialidad,
            password: password,
            rol: rol
        }

        // insert query
        dbConn.query('INSERT INTO usuarios SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('/addsoli', {
                    nombre:nombre,
                    apellidop:apellidop,
                    apellidom:apellidom,
                    email: email,
                    especialidad1:especialidad,
                    password: password,
                    rol: rol
                    
                })
            } else {
                req.flash('success', 'Person successfully added');
                res.redirect('/pages/solicitudes');
            }
        }
        )
    }
        
    
    
    
}
)
router.get('/deletesoli/(:id)', function (req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM postulantes WHERE id = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/pages/solicitudes')
        } else {
            // set flash message
            req.flash('success', 'Postulante eliminado con éxito! ID = ' + id)

            // redirect to books page
            res.redirect('/pages/solicitudes')
        }
    })
})


router.get('/sub-page/crear-evento', function (req, res, next) {
    res.locals.email = req.session.email;
    res.locals.rol = req.session.rol;
    res.render('sub-page/crear-evento');
});

module.exports = router;