var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/matriculaCreate', function(req, res, next) {
    mongoose.model('Alumno').find(function(err, dataAlumno) {
        var alumnos = JSON.parse(JSON.stringify(dataAlumno));
        if (!err) {
            mongoose.model('Asignatura').find({}, function(err, dataAsignatura) {
                if (!err) {
                    var asignaturas = JSON.parse(JSON.stringify(dataAsignatura));
                    res.render('matriculaCreate', {"datos" : [asignaturas, alumnos]});
                }
                else
                    res.redirect('/');
            });
        }
        else
            res.redirect('/');
    });
});

router.get('/matriculaRead', function(req, res, next) {
    mongoose.model('Matricula').find(function(err, data) {
        res.render('matriculaRead', {"listaMatriculas" : data});
    });
});

router.post('/matriculaRead', function(req, res, next) {

});

router.put('/matriculaCreate', function(req, res, next) {
    if (req.body.id !== undefined && req.body.alumnoId !== undefined && req.body.asignaturaId !== undefined && req.body.fecha_inicio !== undefined && req.body.fecha_fin !== undefined) {
        mongoose.model("Alumno").findOne({"_id" : req.body.alumnoId}, function (err, dataAlumno) {
            mongoose.model("Asignatura").findOne({"_id" : req.body.asignaturaId}, function (err, dataAsignatura) {
                var Matricula = mongoose.model('Matricula');
                var matriculaInsert = new Matricula({
                    "id" : req.body.id,
                    "asignatura" : dataAsignatura,
                    "alumno" : dataAlumno,
                    "fecha_inicio" : req.body.fecha_inicio,
                    "fecha_fin" : req.body.fecha_fin
                });

                matriculaInsert.save(function (err, doc) {
                    if (!err)
                        res.json({status : "ok"});
                })
            });     
        }); 
    }
    else
        res.redirect('/')
})

router.delete('/matriculaRead', function(req, res, next) {
    var id = [];
    if (typeof req.body._id === "object") 
        id = req.body._id;              
    else 
        id[0] = req.body._id;

    for (var i = 0; i < id.length; i++) {
        mongoose.model('Matricula').remove({"_id" : id[i]}, function(err) {
            if (err)
                res.json({"err" : "Error al eliminar"});
        });
    }
    res.json({"succes" : "ok"}); 
})

module.exports = router;