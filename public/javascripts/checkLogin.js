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




axios.post('/api/v1/users/login', {
    username: 'a',
    password: 'a'
  })
  .then(function (response) {
    console.log(`/api/v1/users/login response: ${response.status} (if 200 -> OK, else NOT)`);
    if (response.status === 200) {
      console.log(response.data);
      let loggedInUser = response.data;
      saveCurrentlyLoginedUser(loggedInUser);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
