var mongoose = require('mongoose');

var matricula = new mongoose.Schema({
    "id" : Number,
    "asignatura" : mongoose.model("Asignatura").schema,
    "alumno" : mongoose.model("Alumno").schema,
    "fecha_inicio" : Date,
    "fecha_fin" : Date
},{
    versionKey: false
});

mongoose.model("Matricula", matricula);