var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/asignaturaCreate', function(req, res, next) {
    res.render('asignaturaCreate');
});

router.get('/asignaturaRead', function(req, res, next) {
    var asignaturas = mongoose.model('Asignatura');
    asignaturas.find(function(err, data) {
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

router.post('/asignaturaCreate', function(req, res, next) {
    if (req.body.idCreate && req.body.nombreCreate && req.body.cicloCreate && req.body.cursoCreate && req.body.horasCreate) {
        var Asignatura = mongoose.model('Asignatura');
        var asignaturaInsert = new Asignatura({
            "id" : req.body.idCreate,
            "nombre" : req.body.nombreCreate,
            "ciclo" : req.body.cicloCreate,
            "curso" : req.body.cursoCreate,
            "horas" : req.body.horasCreate
        });
        asignaturaInsert.save(function(err, doc) {
            if (!err)
                res.redirect('/asignaturaRead');
            else
                console.log('Error al insertar datos');
        })
    }
    else
        res.redirect('/alumnoCreate');
});

router.post("/asignaturaRead", function(req, res, next) {
    var Asignatura = mongoose.model('Asignatura');
    if (!(req.body._idUpdate === undefined)) {
        if (req.body._idUpdate && req.body.idUpdate && req.body.nombreUpdate && req.body.cicloUpdate && req.body.cursoUpdate && req.body.horasUpdate) {
            Asignatura.update({"_id" : req.body._idUpdate}, {
                "id" : req.body.idUpdate,
                "nombre" : req.body.nombreUpdate,
                "ciclo" : req.body.cicloUpdate,
                "curso" : req.body.cursoUpdate,
                "horas" : req.body.horasUpdate            
            }, function(err, doc) {
                if (!err)
                    res.redirect('/asignaturaRead');
            });
        }
        else    
            res.redirect("/asignaturaRead");
    }
    else if (!(req.body.id === undefined)) {
        var id = [];
        if (typeof req.body.id === "object") 
            id = req.body.id;              
        else 
            id[0] = req.body.id;

        for (var i = 0; i < id.length; i++) {
            Asignatura.remove({"_id" : id[i]}, function(err) {
                if (err)
                    res.redirect('/');
            });
        }   
        res.redirect("/asignaturaRead");
    }
    else
        res.redirect("/");
});  

module.exports = router;