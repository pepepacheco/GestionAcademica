var mongoose = require('mongoose');

var asignatura = new mongoose.Schema({
    "id" : Number,
    "denominacion" : String,
    "horas" : Number
});

mongoose.model("Asignatura", asignatura);