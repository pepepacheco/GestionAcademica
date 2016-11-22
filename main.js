var mongoose = require('mongoose');
var db = require('./model/db.js');
var profesores = require("./model/profesor.js");
var asignaturas = require('./model/asignatura.js');
var alumnos = require('./model/alumno.js');
var fs = require("fs");
var args = process.argv;

if (args[2] === "create") {
    //Crear alumnos
    fs.readFile('./datos/alumnos.json', 'UTF-8', function (err, data) {
        if (!err) {
            var alumnos = JSON.parse(data);
            var alumno = mongoose.model("Alumno");
            alumno.create(alumnos, function(err, result) {
                if (!err) {
                    console.log(result.length + ' Alumnos insertados');
                    mongoose.connection.close();
                }
                else {
                    console.log("error al insertar datos");
                    mongoose.connection.close();
                }
            })
        }
        else {
            console.log("error de lectura de fichero");
            mongoose.connection.close();
        }
    });

    //Crear profesores
    fs.readFile('./datos/profesores.json', 'UTF-8', function (err, data) {
        if (!err) {
            var profesores = JSON.parse(data);
            var profesor = mongoose.model("Profesor");
            profesor.create(profesores, function(err, result) {
                if (!err) {
                    console.log(result.length + ' Profesores insertados');
                    mongoose.connection.close();
                }
                else {
                    console.log("error al insertar datos");
                    mongoose.connection.close();
                }
            })
        }
        else {
            console.log("error de lectura de fichero");
            mongoose.connection.close();
        }
    });

    //Crear asignaturas
    fs.readFile('./datos/asignaturas.json', 'UTF-8', function (err, data) {
        if (!err) {
            var asignaturas = JSON.parse(data);
            var asignatura = mongoose.model("Asignatura");
            asignatura.create(asignaturas, function(err, result) {
                if (!err) {
                    console.log(result.length + ' Asignaturas insertadas');
                    mongoose.connection.close();
                }
                else {
                    console.log("error al insertar datos");
                    mongoose.connection.close();
                }
            })
        }
        else {
            console.log("error de lectura de fichero");
            mongoose.connection.close();
        }
    });
}

//Limpiar tablas
else if (args[2] === "clear") {
    var alumno = mongoose.model("Alumno");
    var profesor = mongoose.model("Profesor");
    var asignatura = mongoose.model("Asignatura");

    alumno.remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Alumno limpiada correctamente');
            mongoose.connection.close();
        }
    });

    profesor.remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Profesor limpiada correctamente');
            mongoose.connection.close();
        }
    });

    asignatura.remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Asignatura limpiada correctamente');
            mongoose.connection.close();
        }
    });        
}

else {
    console.log('Introduzca \"create\" para crear las colecciones o \"clear\" para limpiarlas');
    process.exit();
}
