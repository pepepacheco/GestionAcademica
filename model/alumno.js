var mongoose = require('mongoose');

var alumno = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "apellidos" : String,
    "email" : String
},{
    versionKey: false    
});

mongoose.model("Alumno", alumno);