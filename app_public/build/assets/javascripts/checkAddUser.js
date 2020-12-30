function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

function validateNameAndLastName(nameLastName) {
    var reg = /^[a-z ,.'-]+$/i;
    return reg.test(nameLastName);
}

function cre() {
    document.getElementById("nekajPac1").addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
}

function velidate() {
    var odgovor = "";

    var ime = $("#uporabniskoImeClana").val();

    if (ime === "") {
        odgovor += "Vsa polja morajo biti izpolnjena";
    }

    if (!validateNameAndLastName(ime)) {
        odgovor += "\nIme skupine lahko vsebuje le črke!";
    }
    /*if(validateEmail(email)) {
        console.log("OK");
        window.location.pathname = '/login';
    } else {
        console.log("NOT OK");
        window.location.pathname = '/login';
    }*/

    if (odgovor !== "") {
        cre();
        alert(odgovor);
    }
}

//$("#signIn").on("click", validate);
