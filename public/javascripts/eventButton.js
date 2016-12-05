function eventButton() {   
    if (document.getElementById("buttonRemoveAll") !== null) {
        var buttonRemoveAll = document.getElementById("buttonRemoveAll");
        buttonRemoveAll.addEventListener("click", function () {
            var seleccionado = false;
            var table = document.getElementById("table");               
            for(var i = 0; i < table.rows.length; i++) {
                celdas = table.rows[i].getElementsByTagName('td');
                for(var j = 0; j < celdas.length; j++) {
                    if (celdas[j].getElementsByTagName('input').length === 1) {
                        var checkbox = celdas[j].getElementsByTagName('input').id;
                        if(checkbox.checked) {
                            document.forms["form"].submit();
                            seleccionado = true;
                            break;
                        }
                    }
                }
            }
            if (!seleccionado) {
                $("#alerta").slideDown();
            }
        });
    }
    else if (document.getElementById("buttonRemoveAllAjax") !== null) {
        var _id = [];
        var rows = [];
        var buttonRemoveAllAjax = document.getElementById("buttonRemoveAllAjax");
        buttonRemoveAllAjax.addEventListener("click", function () {
            var seleccionado = false;
            var table = document.getElementById("table");               
            for(var i = 0; i < table.rows.length; i++) {
                celdas = table.rows[i].getElementsByTagName('td');
                for(var j = 0; j < celdas.length; j++) {
                    if (celdas[j].getElementsByTagName('input').length === 1) {
                        var checkbox = celdas[j].getElementsByTagName('input').id;
                        if(checkbox.checked) {
                            rows.push(table.rows[i]);
                            _id.push(checkbox.value)
                            seleccionado = true;
                        }
                    }
                }
            }
            if (!seleccionado) {
                $("#alerta").slideDown();
            }
            else {
                if ($('#buttonAsignacionUpdate') !== null) {
                    $.ajax({
                        type : "DELETE",
                        url : "/asignacion/read",
                        data : {
                            "_id" : _id
                        },
                        success : function (data) {
                            for (row of rows) {
                                $(row).hide('slow', "swing");
                            }
                        },
                        error : function () {
                            $(location).attr('href', '/');
                        }
                    })
                }
                else {
                    $.ajax({
                        type : "DELETE",
                        url : "/matricula/read",
                        data : {
                            "_id" : _id
                        },
                        success : function (data) {
                            for (row of rows) {
                                $(row).hide('slow', "swing");
                            }
                        },
                        error : function () {
                            $(location).attr('href', '/');
                        }
                    });      
                }
            }
        }); 
    }

    if (document.getElementById("buttonRemoveAjax") !== null) {
        var buttonRemoveAjax = document.getElementById("buttonRemoveAjax");
        function setListenerButtonRemoveAjax (callback) {
            var table = document.getElementById("table");               
            for(var i = 0; i < table.rows.length; i++) {
                var row = table.rows[i];
                celdas = table.rows[i].getElementsByTagName('td');
                for(var j = 0; j < celdas.length; j++) {
                    if (celdas[j].getElementsByClassName("btn btn-danger").length === 1) {
                        var buttonDeleteAjax = (celdas[j].getElementsByClassName("btn btn-danger")[0]);
                        callback(buttonDeleteAjax, row);
                    }
                }
            }
        }
        setListenerButtonRemoveAjax(function(buttonDeleteAjax, row) {
            buttonDeleteAjax.addEventListener("click", function() {
                if ($('#buttonAsignacionUpdate') !== null) {
                    $.ajax({
                        type : "DELETE",
                        url : "/asignacion/read",
                        data : {
                            "_id" : buttonDeleteAjax.value
                        },
                        success : function (data) {
                            $(row).hide('slow', "swing");
                        },
                        error : function () {
                            $(location).attr('href', '/')
                        }
                    });                     
                }
                else {
                    $.ajax({
                        type : "DELETE",
                        url : "/matricula/read",
                        data : {
                            "_id" : buttonDeleteAjax.value
                        },
                        success : function (data) {
                            $(row).hide('slow', "swing");
                        },
                        error : function () {
                            $(location).attr('href', '/')
                        }
                    });                    
                }
            });
        });

    }

    if (document.getElementById("closeAlert") !== null) {
        var buttonCloseAlert = document.getElementById("closeAlert");
        buttonCloseAlert.addEventListener('click', function () {
            //var buttonSelectAll = document.getElementById("selectAll");
            $("#alerta").slideUp();
        });        
    }
   
    //JavaScript
    if (document.getElementById("selectAll") !== null) {
        var buttonSelectAll = document.getElementById("selectAll");
        buttonSelectAll.addEventListener("click", function () {
            var table = document.getElementById("table");               
            for(var i = 0; i < table.rows.length; i++) {
                celdas = table.rows[i].getElementsByTagName('td');
                for(var j = 0; j < celdas.length; j++) {
                    if (celdas[j].getElementsByTagName('input').length === 1) {
                        var checkbox = celdas[j].getElementsByTagName('input').id;
                        if (buttonSelectAll.checked)
                            checkbox.checked = true;
                        else
                            checkbox.checked = false;
                    }
                }   
            }     
        });        
    }

    //JavaScript
    if (document.getElementById("table") !== null) {
        function setListenerButtons (callback) {
            var table = document.getElementById("table");               
            for(var i = 0; i < table.rows.length; i++) {
                celdas = table.rows[i].getElementsByTagName('td');
                for(var j = 0; j < celdas.length; j++) {
                    if (celdas[j].getElementsByClassName("btn btn-info").length === 1) {
                        var buttonUpdate = (celdas[j].getElementsByClassName("btn btn-info")[0]);
                        callback(buttonUpdate);
                    }
                }
            }
        }
        //JQuery
        setListenerButtons(function (buttonUpdate) {
            buttonUpdate.addEventListener("click", function () {
                switch (buttonUpdate.id) {
                    case "buttonAlumnoUpdate":
                        var alumnoUpdate = $("#"+buttonUpdate.value).children();
                        $("#buttonUpdateModal").attr("value", buttonUpdate.value);
                        $("#id").val(alumnoUpdate.eq(1).text());
                        $("#nombre").attr("placeholder", alumnoUpdate.eq(2).text());
                        $("#apellidos").attr("placeholder", alumnoUpdate.eq(3).text());
                        $("#email").attr("placeholder", alumnoUpdate.eq(4).text());                 
                        break;
                    case "buttonProfesorUpdate":
                        var profesorUpdate = $("#"+buttonUpdate.value).children();
                        $("#buttonUpdateModal").attr("value", buttonUpdate.value);
                        $("#id").val(profesorUpdate.eq(1).text());
                        $("#nombre").attr("placeholder", profesorUpdate.eq(2).text());
                        $("#apellidos").attr("placeholder", profesorUpdate.eq(3).text());
                        $("#email").attr("placeholder", profesorUpdate.eq(4).text());                      
                        break;
                    case "buttonAsignaturaUpdate":
                        var asignaturaUpdate = $("#"+buttonUpdate.value).children();
                        $("#buttonUpdateModal").attr("value", buttonUpdate.value);
                        $("#id").val(asignaturaUpdate.eq(1).text());
                        $("#nombre").attr("placeholder", asignaturaUpdate.eq(2).text());
                        $("#ciclo").attr("placeholder", asignaturaUpdate.eq(3).text());
                        $("#curso").val(asignaturaUpdate.eq(4).text());
                        $("#horas").attr("placeholder", asignaturaUpdate.eq(5).text());                      
                        break;
                    case "buttonMatriculaUpdate":
                        var matriculaUpdate = $("#"+buttonUpdate.value).children();
                        $("#buttonUpdateModal").attr("onclick", "updateMatricula(\""+buttonUpdate.value+"\")");
                        $("#idUpdate").val(matriculaUpdate.eq(1).text());
                        $("#asignaturaUpdate").attr("placeholder", matriculaUpdate.eq(2).text());
                        $("#alumnoUpdate").attr("placeholder", matriculaUpdate.eq(3).text());
                        $("#fechaInicioUpdate").attr("placeholder", matriculaUpdate.eq(4).text());
                        $("#fechaFinUpdate").attr("placeholder", matriculaUpdate.eq(5).text());                         
                        break;
                    case "buttonAsignacionUpdate":
                        var asignacionUpdate = $("#"+buttonUpdate.value).children();
                        $("#buttonUpdateModal").attr("onclick", "updateAsignacion(\""+buttonUpdate.value+"\")");
                        $("#idUpdate").val(asignacionUpdate.eq(1).text());
                        $("#profesorUpdate").attr("placeholder", asignacionUpdate.eq(2).text());
                        $("#asignaturaUpdate").attr("placeholder", asignacionUpdate.eq(3).text());
                        $("#horasUpdate").attr("placeholder", asignacionUpdate.eq(4).text());
                        $("#fechaInicioUpdate").attr("placeholder", asignacionUpdate.eq(5).text());
                        $("#fechaFinUpdate").attr("placeholder", asignacionUpdate.eq(6).text());
                        break;                                    
                }
            });     
        })
    }
}

//Ajax
function nuevaMatricula() {
    var id = parseInt($("#id").val());
    var asignaturaId = $("#asignatura").val();
    var alumnoId = $("#alumno").val();
    var fecha_inicio = $("#fechaInicio").val();
    var fecha_fin = $("#fechaFin").val();

    if (typeof id === "number" && (!Number.isNaN(id))) {
        if (typeof fecha_inicio === "string" && fecha_inicio.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
            if (typeof fecha_fin === "string" && fecha_fin.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
                $.ajax({
                    type : "PUT",
                    url : "/matricula/create",
                    data : {
                        "id" : id,
                        "asignaturaId" : asignaturaId,
                        "alumnoId" : alumnoId,
                        "fecha_inicio" : fecha_inicio,
                        "fecha_fin" : fecha_fin
                    },
                    success : function (data) {
                        $(location).attr('href', '/matricula/read') 
                    },
                    error : function () {
                        $(location).attr('href', '/')
                    }
                });
            }
            else {
                $("#textAlerta").html("<strong>¡Alerta!<strong> Fecha de finalización incorrecta");
                $("#alerta").slideDown();
            }
        }
        else {
            $("#textAlerta").html("<strong>¡Alerta!<strong> Fecha de inicio incorrecta");
            $("#alerta").slideDown();
        }
    }
    else {
        $("#textAlerta").html("<strong>¡Alerta!<strong> ID Incorrecto");
        $("#alerta").slideDown();
    }
}

function updateMatricula(_idUpdate) {
    var _id = _idUpdate;
    var id = parseInt($("#idUpdate").val());
    var asignaturaId = $("#asignaturaUpdate").val();
    var alumnoId = $("#alumnoUpdate").val();
    var fecha_inicio = $("#fechaInicioUpdate").val();
    var fecha_fin = $("#fechaFinUpdate").val();

    if (typeof id === "number" && (!Number.isNaN(id))) {
        if (typeof fecha_inicio === "string" && fecha_inicio.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
            if (typeof fecha_fin === "string" && fecha_fin.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
                $.ajax({
                    type : "POST",
                    url : "/matricula/read",
                    data : {
                        "_id" : _id,
                        "id" : id,
                        "asignaturaId" : asignaturaId,
                        "alumnoId" : alumnoId,
                        "fecha_inicio" : fecha_inicio,
                        "fecha_fin" : fecha_fin
                    },
                    success : function (data) {
                        $("#myModal").modal("hide");
                        var rowUpdate = $("#"+data._id+"").children();
                        rowUpdate.eq(1).html(data.id);
                        rowUpdate.eq(2).html(data.asignatura.nombre);
                        rowUpdate.eq(3).html(data.alumno.nombre+" "+data.alumno.apellidos);
                        rowUpdate.eq(4).html(data.fecha_inicio);
                        rowUpdate.eq(5).html(data.fecha_fin);
                    },
                    error : function () {
                        $(location).attr('href', '/')
                    }
                });
            }
            else {
                $("#textAlertaModal").html("<strong>¡Alerta!<strong> Fecha de finalización incorrecta");
                $("#alertaModal").slideDown();
            }
        }
        else {
            $("#textAlertaModal").html("<strong>¡Alerta!<strong> Fecha de inicio incorrecta");
            $("#alertaModal").slideDown();
        }
    }
    else {
        $("#textAlertaModal").html("<strong>¡Alerta!<strong> ID Incorrecto");    
        $("#alertaModal").slideDown();
    }
}

function closeAlertModal() {
    $("#alertaModal").slideUp();
}

function nuevaAsignacion() {
    var id = parseInt($('#id').val());
    var profesor = $('#profesor').val();
    var asignatura = $('#asignatura').val();
    var horas = parseInt($('#horas').val());
    var fecha_inicio = $('#fechaInicio').val();
    var fecha_fin = $('#fechaFin').val();
    
    if (typeof id === "number" && (!Number.isNaN(id))) {
        if (typeof horas === "number" && (!Number.isNaN(horas))) {
            if (typeof fecha_inicio === "string" && fecha_inicio.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
                if (typeof fecha_fin === "string" && fecha_fin.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
                    $.ajax({
                        type : "PUT",
                        url : "/asignacion/create",
                        data : {
                            "id" : id,
                            "profesor" : profesor,
                            "asignatura" : asignatura,
                            "horas" : horas,
                            "fecha_inicio" : fecha_inicio,
                            "fecha_fin" : fecha_fin
                        },
                        success : function (data) {
                            $(location).attr('href', '/asignacion/read');
                        },
                        error : function () {
                            $(location).attr('href', '/');
                        }
                    })
                }
                else {
                    $("#textAlerta").html("<strong>¡Alerta!<strong> Fecha de finalización incorrecta");
                    $("#alerta").slideDown();
                }
            }
            else {
                 $("#textAlerta").html("<strong>¡Alerta!<strong> Fecha de inicio incorrecta");
                $("#alerta").slideDown();
            }
        }
        else {
            $("#textAlerta").html("<strong>¡Alerta!<strong> Número de horas iconrrectas");
            $("#alerta").slideDown();
        }
    }
    else {
        $("#textAlerta").html("<strong>¡Alerta!<strong> Id Incorrecto");
        $("#alerta").slideDown();
    }
}

function updateAsignacion(_idUpdate) {
    var _id = _idUpdate;
    var id = parseInt($("#idUpdate").val());
    var profesorId = $('#profesorUpdate').val();
    var asignaturaId = $("#asignaturaUpdate").val();
    var horas = parseInt($("#horasUpdate").val());
    var fecha_inicio = $("#fechaInicioUpdate").val();
    var fecha_fin = $("#fechaFinUpdate").val();

    if (typeof id === "number" && (!Number.isNaN(id))) {
        if (typeof horas === "number" && (!Number.isNaN(horas))) {
            if (typeof fecha_inicio === "string" && fecha_inicio.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
                if (typeof fecha_fin === "string" && fecha_fin.match(/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/)) {
                    $.ajax({
                        type : "POST",
                        url : "/asignacion/read",
                        data : {
                            "_id" : _id,
                            "id" : id,
                            "profesorId" : profesorId,
                            "asignaturaId" : asignaturaId,
                            "horas" : horas,
                            "fecha_inicio" : fecha_inicio,
                            "fecha_fin" : fecha_fin
                        },
                        success : function (data) {
                            $("#myModal").modal("hide");
                            var rowUpdate = $("#"+data._id+"").children();
                            rowUpdate.eq(1).html(data.id);
                            rowUpdate.eq(2).html(data.profesor.nombre+" "+data.profesor.apellidos);
                            rowUpdate.eq(3).html(data.asignatura.nombre);
                            rowUpdate.eq(4).html(data.horas);
                            rowUpdate.eq(5).html(data.fecha_inicio);
                            rowUpdate.eq(6).html(data.fecha_fin);
                        },
                        error : function () {
                            $(location).attr('href', '/');
                        }
                    })
                }
                else {
                    $("#textAlertaModal").html("<strong>¡Alerta!<strong> Fecha de finalización incorrecta");
                    $("#alertaModal").slideDown();
                }
            }
            else {
                 $("#textAlertaModal").html("<strong>¡Alerta!<strong> Fecha de inicio incorrecta");
                $("#alertaModal").slideDown();
            }
        }
        else {
            $("#textAlertaModal").html("<strong>¡Alerta!<strong> Número de horas iconrrectas");
            $("#alertaModal").slideDown();
        }
    }
    else {
        $("#textAlertaModal").html("<strong>¡Alerta!<strong> Id Incorrecto");
        $("#alertaModal").slideDown();
    }
}