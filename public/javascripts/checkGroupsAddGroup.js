function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

function validateNameAndLastName(nameLastName) {
    var reg = /^[a-z ,.'-]+$/i;
    return reg.test(nameLastName);
}

function prevent() {
    document.getElementById("formaModala").addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
}

function balidate() {
    var odgovor = "";

    var ime = $("#imeSKupine").val();

    var limit = $("#limit").val();

    var imeDrugegaClana = $("#drugiClan").val();

    if (ime === "" || limit === "" || imeDrugegaClana === "") {
        odgovor += "Vsa polja morajo biti izpolnjena";
    }

    if (!validateNameAndLastName(ime)) {
        odgovor += "\nIme skupine lahko vsebuje le črke!";
    }

    if (!validateNameAndLastName(imeDrugegaClana)) {
        odgovor += "\nIme drugega člana lahko vsebuje le črke!";
    }
    /*if(validateEmail(email)) {
        console.log("OK");
        window.location.pathname = '/login';
    } else {
        console.log("NOT OK");
        window.location.pathname = '/login';
    }*/

    if (odgovor !== "") {
        prevent();
        alert(odgovor);
    }
}

//$("#signIn").on("click", validate);
