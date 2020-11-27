function prevent() {
    document.getElementById('forma').addEventListener('click', function (event) {
        event.preventDefault();
    });
}

function validate() {
    var email = $("#email").val();
    var passwd = $("#password").val();

    var odgovor = "";
    if (email === "") {
        odgovor += "\nVnesite epoštni naslov!";
    }
    if (passwd === "") {
        odgovor += "\nVnesite geslo!";
        console.log("geslo je prazno");
        prevent();
    }

    if (odgovor !== "") {
        alert(odgovor);
    }
}
