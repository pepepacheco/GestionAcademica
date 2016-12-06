var mongoose = require('mongoose');
var db = require('./model/db.js');
var profesores = require("./model/profesor.js");
var asignaturas = require('./model/asignatura.js');
var alumnos = require('./model/alumno.js');
var matriculas = require('./model/matricula.js');
var asignaciones = require('./model/asignacion.js');
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
                }
                else {
                    console.log("error al insertar datos");
                }
            })
        }
        else {
            console.log("error de lectura de fichero");
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
                }
                else {
                    console.log("error al insertar datos");
                }
            })
        }
        else {
            console.log("error de lectura de fichero");
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
                }
                else {
                    console.log("error al insertar datos");
                }
            })
        }
        else {
            console.log("error de lectura de fichero");
        }
    });

    //Crear matriculas
    fs.readFile('./datos/matriculas.json', 'UTF-8', function (err, data) {
        if (!err) {
            var matriculas = JSON.parse(data);
            mongoose.model('Matricula').create(matriculas, function (err, result) {
                if (!err) {
                    console.log(result.length + ' Matriculas insertadas');
                }
                else {
                    console.log("error al insertar datos");
                }
            });
        }
        else {
            console.log("error de lectura de fichero");
        }        
    });

    //crear asignaciones
    fs.readFile('./datos/asignaciones.json', 'UTF-8', function (err, data) {
        if (!err) {
            var asignaciones = JSON.parse(data);          
            mongoose.model('Asignacion').create(asignaciones, function (err, result) {
                if (!err) {
                    console.log(result.length + ' Asignaciones insertadas');
                }
                else {
                    console.log("error al insertar datos");
                }
            });
            
        }
        else {
            console.log("error de lectura de fichero");
        }        
    });

    if (mongoose.connection !== undefined)
        mongoose.connection.close();    
}

//Limpiar tablas
else if (args[2] === "clear") {
    mongoose.model("Alumno").remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Alumno limpiada correctamente');
        }
    });

    mongoose.model("Profesor").remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Profesor limpiada correctamente');
        }
    });

    mongoose.model("Asignatura").remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Asignatura limpiada correctamente');
        }
    });

    mongoose.model('Matricula').remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Matriculas limpiada correctamente');         
        }
    }); 

    mongoose.model('Asignacion').remove({}, function (err, doc) {
        if (!err) {
            console.log('Colección Asignacion limpiada correctamente');          
        }
    });

    if (mongoose.connection !== undefined)
        mongoose.connection.close();
}

else {
    console.log('Introduzca \"create\" para crear las colecciones o \"clear\" para limpiarlas');
    process.exit();
}
