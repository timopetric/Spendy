document.addEventListener('DOMContentLoaded', function () {
    console.log("stran je odprta");
    var gumb = document.getElementById('PrijavaGumb');
    gumb.addEventListener('click', function () {
        console.log("pritisk na gumb!");
        var vsebinaEmaila = document.getElementById('email').value;
        var vsebinaGesla = document.getElementById('password').value;


        var crkeReg = new RegExp("^[a-z0-9A-ZčćžđšČĆŽĐŠ . ,]*$");
        //var emailReg = 9;

        var emailTest = crkeReg.test(vsebinaEmaila);

        var odgovor = "";

        if (vsebinaGesla === "")
            odgovor += "Geslo ne sme biti prazno!";

        if (vsebinaEmaila === "") {
            odgovor = "\nEpoštni naslov ne sme biti prazen!";
        }

        if (!emailTest)
            odgovor += "\nepoštni naslov je lahko le oblike nekaj@nekajDrugega.si!";

        if (!crkeTest || !dolzinaTest || vsebinaEmaila === "" || vsebinaGesla === "")
            alert(odgovor);

    });
});

function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[a-zA-Z0-9@\^&*)(+=._-]*$/;
    return re.test(email);
}

function prevent() {
    document.getElementById('PrijavaGumb').addEventListener('click', function (event) {
        event.preventDefault();
    });
}

/*function validate() {
    var email = $("#email").val();
    var passwd = $("#passwdord").val();

    var odgovor = "";
    if (email === "") {
        prevent();
        odgovor = "Vnesite epoštni naslov!";
    }
    if (passwd === "") {
        odgovor = "\nVnesite geslo!";
        prevent();
    }

    if (email === "" || passwd === "") {
        alert(odgovor);
    }
}*/
