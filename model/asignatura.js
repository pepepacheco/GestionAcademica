var mongoose = require('mongoose');

var asignatura = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "ciclo" : String,
    "curso" : String,
    "horas" : Number
});

mongoose.model("Asignatura", asignatura);