var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/create', function(req, res, next) {
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

router.get('/read', function(req, res, next) {
    mongoose.model('Alumno').find(function(err, dataAlumno) {
        var alumnos = JSON.parse(JSON.stringify(dataAlumno));
        if (!err) {
            mongoose.model('Asignatura').find({}, function(err, dataAsignatura) {
                if (!err) {
                    var asignaturas = JSON.parse(JSON.stringify(dataAsignatura));
                    mongoose.model('Matricula').find(function(err, data) {
                        if (!err) {
                            res.render('matriculaRead', {"listaMatriculas" : data, "datos" : [asignaturas, alumnos]});
                        }
                        else
                            res.redirect('/');                
                    });
                }
                else
                    res.redirect('/');
            });
        }
        else
            res.redirect('/');
    });
});

router.post('/read', function(req, res, next) {
    mongoose.model("Alumno").findOne({"_id" : req.body.alumnoId}, function(err, alumno) {
        mongoose.model("Asignatura").findOne({"_id" : req.body.asignaturaId}, function(err, asignatura) {
            mongoose.model("Matricula").findOneAndUpdate({"_id" : req.body._id}, {
                "id" : req.body.id,
                "asignatura" : asignatura,
                "alumno" : alumno,
                "fecha_inicio" : req.body.fecha_inicio,
                "fecha_fin" : req.body.fecha_fin
            }, {new: true},
             function(err, matricula) {
                if (!err) {
                    res.json(matricula)
                }
            })
        });
    });

});

router.put('/create', function(req, res, next) {
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
                    else
                        res.send({status: "error"})
                })
            });     
        }); 
    }
    else
        res.redirect('/')
})

router.delete('/read', function(req, res, next) {
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