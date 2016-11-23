var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/profesorCreate', function (req, res, next) {
    res.render('profesorCreate');
});

router.get('/profesorRead', function (req, res, next) {
    var profesores = mongoose.model("Profesor");
    profesores.find({},{}, function (err, data) {
        if (!err) {
            res.render('profesorRead', {"listaProfesores" : data});
        }
    })
});

router.post('/profesorCreate', function(req, res, next) {
    if (req.body.idCreate && req.body.nombreCreate && req.body.apellidosCreate && req.body.emailCreate) {
        var Profesor = mongoose.model('Profesor');
        var profesorInsert = new Profesor({
            "id" : req.body.idCreate,
            "nombre" : req.body.nombreCreate,
            "apellidos" : req.body.apellidosCreate,
            "email" : req.body.emailCreate
        });
        profesorInsert.save(function(err, doc) {
            if (!err)
                res.redirect('/profesorRead');
            else
                console.log('Error al insertar datos');
        })
    }
    else
        res.redirect('/profesorCreate');
});    

router.post("/profesorRead", function(req, res, next) {
    var Profesor = mongoose.model('Profesor');
    if (!(req.body._idUpdate === undefined)) {
        if (req.body._idUpdate && req.body.idUpdate && req.body.nombreUpdate && req.body.apellidosUpdate && req.body.emailUpdate) {
            Profesor.update({"_id" : req.body._idUpdate}, {
                "id" : req.body.idUpdate,
                "nombre" : req.body.nombreUpdate,
                "apellidos" : req.body.apellidosUpdate,
                "email" : req.body.emailUpdate                
            }, function(err, doc) {
                if (!err)
                    res.redirect('/profesorRead');
            });
        }
        else    
            res.redirect("/profesorRead");
    }
    else if (!(req.body.id === undefined)) {
        var id = [];
        if (typeof req.body.id === "object") 
            id = req.body.id;              
        else 
            id[0] = req.body.id;

        for (var i = 0; i < id.length; i++) {
            Profesor.remove({"_id" : id[i]}, function(err) {
                if (err)
                    res.redirect('/');
            });
        }   
        res.redirect("/profesorRead");
    }
    else
        res.redirect("/");
});

module.exports = router;