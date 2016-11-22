var mongoose = require('mongoose');

var alumno = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "apellidos" : String,
    "email" : String
});

mongoose.model("Alumno", alumno);