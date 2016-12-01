var mongoose = require('mongoose');

var profesor = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "apellidos" : String,
    "email" : String
},{
    versionKey: false    
});

mongoose.model("Profesor", profesor);