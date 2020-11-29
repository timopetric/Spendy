function prevent() {
    document.getElementById('forma').addEventListener('click', function (event) {
        event.preventDefault();
    });
}

// document.getElementById('forma').addEventListener('click', function (event) {
//     allGood()
// })

// function allGood() {
//     axios.create({
//         baseURL: "localhost:3000",
//         timeout: 5000
//     }).post('/api/v1/users/login', {
//         mail: $("#email").val(),
//         password: $("#password").val()
//     })
//     .then(function (response) {
//
//         console.log(`/api/v1/users/login response: ${response.status} (if 200 -> OK, else NOT)`);
//             console.log(response.data);
//         if (response.status === 200) {
//             let loggedInUser = response.data;
//             saveCurrentlyLoginedUser(loggedInUser);
//
//             axios.post('/login-server', {
//                 user: loggedInUser,
//             })
//             .then(function (response) {
//                 if (response.status === 200) {
//                     console.log("server logged in the user");
//                 } else {
//                     console.log("server error logging in user");
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//
//         }
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// }


function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

var email = null;
var passwd = null;
var loggedInUser = null;

function validate() {
    email = $("#email").val();
    passwd = $("#password").val();

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
    } else {
        // allGood();


        axios.post('/api/v1/users/login', {
            mail: email,
            password: passwd
          })
          .then(function (response) {
            console.log(`/api/v1/users/login response: ${response.status} okkkkkkkkk cool`);
            if (response.status === 200) {
              console.log(response.data);
              let loggedInUser = response.data;
              saveCurrentlyLoginedUser(loggedInUser);
            }
          })
          .catch(function (error) {
            console.log(error);
          });


    }
}



/*axios.post('/api/v1/users/login', {
    mail: "a@gmail.com",
    password: "a"
  })
  .then(function (response) {
    console.log(`/api/v1/users/login response: ${response.status} okkkkkkkkk cool`);
    if (response.status === 200) {
      console.log(response.data);
      let loggedInUser = response.data;
      saveCurrentlyLoginedUser(loggedInUser);

      axios.post('/login-server', {
          user_id: loggedInUser._id,
          groupIds: loggedInUser.groupIds,
          user: loggedInUser,
      })
          .then(function (response) {
              if (response.status === 200) {
                  console.log("server logged in the user");
              } else {
                  console.log("server error logging in user");
              }
          })
          .catch(function (error) {
              console.log(error);
          });

    }
  })
  .catch(function (error) {
    console.log(error);
  });*/

/*axios.post('/api/v1/users/login', {
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
    });*/

