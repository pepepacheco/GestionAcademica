
var mongoose = require('mongoose');

var asignatura = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "ciclo" : String,
    "curso" : String,
    "horas" : Number
},{
    versionKey: false
});

mongoose.model("Asignatura", asignatura);