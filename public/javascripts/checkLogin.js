function prevent() {
    document.getElementById('forma').addEventListener('click', function (event) {
        event.preventDefault();
    });
}

function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

function validate() {
    var email = $("#email").val();
    var passwd = $("#password").val();

    var odgovor = "";
    if (email === "") {
        odgovor += "\nVnesite epoštni naslov!";
    }

    if (!validateEmail(email)) {
        odgovor += "\nEmail ni prave oblike";
        //prevent();
    }

    if (passwd === "") {
        odgovor += "\nVnesite geslo!";
        console.log("geslo je prazno");
        //prevent();
    }

    if (odgovor !== "") {
        prevent();
        alert(odgovor);
    }
}
