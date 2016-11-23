function eventButton() {
    var buttonRemoveAll = document.getElementById("buttonRemoveAll");
    var buttonCloseAlert = document.getElementById("closeAlert");
    var buttonSelectAll = document.getElementById("selectAll");

    buttonCloseAlert.addEventListener('click', function () {
        $("#alerta").slideUp()
    });

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
    //JavaScript
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
    //JavaScript
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
            if (buttonUpdate.id === "buttonAlumnoUpdate") {
                var alumnoUpdate = $("#"+buttonUpdate.value).children();
                $("#buttonUpdateModal").attr("value", buttonUpdate.value);
                $("#id").attr("placeholder", alumnoUpdate.eq(1).text());
                $("#nombre").attr("placeholder", alumnoUpdate.eq(2).text());
                $("#apellidos").attr("placeholder", alumnoUpdate.eq(3).text());
                $("#email").attr("placeholder", alumnoUpdate.eq(4).text());
            }
            else if (buttonUpdate.id === "buttonProfesorUpdate") {
                var profesorUpdate = $("#"+buttonUpdate.value).children();
                $("#buttonUpdateModal").attr("value", buttonUpdate.value);
                $("#id").attr("placeholder", profesorUpdate.eq(1).text());
                $("#nombre").attr("placeholder", profesorUpdate.eq(2).text());
                $("#apellidos").attr("placeholder", profesorUpdate.eq(3).text());
                $("#email").attr("placeholder", profesorUpdate.eq(4).text());                
            }
        });     
    })
}
