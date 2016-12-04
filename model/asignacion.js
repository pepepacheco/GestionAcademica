var mongoose = require('mongoose');

var asignacion = new mongoose.Schema({
    "id" : Number,
    "profesor" : mongoose.model('Profesor').schema,
    "asignatura" : mongoose.model('Asignatura').schema,
    "horas" : Number,
    "fecha_inicio" : Date,
    "fecha_fin" : Date
}, {
    versionKey: false
});

mongoose.model('Asignacion', asignacion);