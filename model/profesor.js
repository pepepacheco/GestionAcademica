var mongoose = require('mongoose');

var profesor = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "apellidos" : String,
    "email" : String
});

mongoose.model("Profesor", profesor);