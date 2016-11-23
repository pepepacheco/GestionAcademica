var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/asignaturaRead', function(req, res, next) {
    var asignaturas = mongoose.model('Asignatura');
    alumnos.find(function(err, data) {
        if (!err) 
            res.render('asignaturaRead', {"listaAsignaturas" : data});
        else
            res.render('error', {
                "mensaje" : "ERROR: alumnoRead",
                "error" : {
                    "status" : "Imposible acceder a la base de datos",
                    "stack" : err
                }
            });
    });
});

module.exports = router;