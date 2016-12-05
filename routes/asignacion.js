var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/create', function(req, res, next){
    mongoose.model('Asignatura').find(function(err, asignatura){
        mongoose.model('Profesor').find(function(err, profesor){
            res.render('asignacionCreate', {data: {asignatura, profesor}});
        })
    });
});

router.put('/create', function(req, res, next){
    mongoose.model('Profesor').findOne({"_id" : req.body.profesor}, function(err, profesor){
        mongoose.model('Asignatura').findOne({"_id" : req.body.asignatura}, function(err, asignatura) {
            var Asignacion = mongoose.model('Asignacion');
            var asginacionInsert = new Asignacion({
                "id" : req.body.id,
                "profesor" : profesor,
                "asignatura" : asignatura,
                "horas" : req.body.horas,
                "fecha_inicio" : req.body.fecha_inicio,
                "fecha_fin" : req.body.fecha_fin
            });
            asginacionInsert.save(function(err, doc) {
                if(!err)
                    res.json({status: "ok"});
                else
                    res.send({status: "error"})
            });            
        });
    });
});

router.get('/read', function(req, res, next){
    mongoose.model('Profesor').find(function(err, profesores){
        mongoose.model('Asignatura').find(function(err, asignaturas){
            mongoose.model('Asignacion').find(function(err, asignaciones){
                res.render('asignacionRead', {
                    listaAsignaciones : asignaciones, 
                    data : {profesores, asignaturas}
                });
            });
            
        });
    });
});

router.delete('/read', function(req, res, next){
    var id = [];
    if (typeof req.body._id === "object") 
        id = req.body._id;              
    else 
        id[0] = req.body._id;

    for (var i = 0; i < id.length; i++) {
        mongoose.model('Asignacion').remove({"_id" : id[i]}, function(err) {
            if (err)
                res.json({"err" : "Error al eliminar"});
        });
    }
    res.json({"succes" : "ok"}); 
});

router.post('/read', function(req, res, next){
    mongoose.model("Profesor").findOne({"_id" : req.body.profesorId}, function(err, profesor) {
        console.log(profesor)
        mongoose.model("Asignatura").findOne({"_id" : req.body.asignaturaId}, function(err, asignatura) {
            console.log(asignatura)
            mongoose.model("Asignacion").findOneAndUpdate({"_id" : req.body._id}, {
                "id" : req.body.id,
                "profesor" : profesor,
                "asignatura" : asignatura,
                "horas" : req.body.horas,
                "fecha_inicio" : req.body.fecha_inicio,
                "fecha_fin" : req.body.fecha_fin
            }, {new: true},
             function(err, asignacion) {
                if (!err) {
                    res.json(asignacion)
                }
            })
        });
    });
});

module.exports = router;