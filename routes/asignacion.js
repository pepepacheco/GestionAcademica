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

router.post('/create', function(req, res, next){
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
            })            
        });
    });
})

module.exports = router;