const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

const getAllUsers = (req, res) => {
};

const addUser = (req, res) => {
  const reqUsername = req.body.username;
  const reqName = req.body.name;
  const reqSurname = req.body.surname;
  const reqMail = req.body.mail;
  const reqPass = req.body.pass;
  const balance = 0.0;
  const groupId = "";

  // todo: maybe create a special one user group and add him to it

  User.create(
    {
      username: reqUsername,
      name: reqName,
      surname: reqSurname,
      balance: balance,
      mail: reqMail,
      pass: reqPass,
    },
    (error, user) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(201).json(user);
      }
    }
  );
};

// const addGroup = (req, res) => {
//   const reqName = req.body.name; // name of the group
//   const balance = 0.0; // balance of the group
//   const reqUsers = req.body.userIds; // list of users (user ids)
//   const reqAdmins = req.body.adminIds; // list of admins (user ids)
//
//   Group.create(
//     {
//       balance: balance,
//       name: reqName,
//     },
//     (error, group) => {
//       if (error) {
//         res.status(400).json(error);
//       } else {
//         // add users from reqUsers to the group
//         for (const uId of reqUsers) {
//           if (validateUserById(uId)) {
//             group.userIds.push(uId);
//             group.adminIds.push(uId);
//           } else {
//             return res.status(500).json("Uporabnik: " + uId + " ne obstaja.");
//           }
//         }
//
//         group.save(function (err) {
//           // res.status(400).json(err);
//           console.log("Error saving to database! " + err);
//         });
//
//         return res.status(201).json(group);
//       }
//     }
//   );
// };

function validateUserById(userId) {
  let user = User.findById(userId).exec((err, user) => {
    if (err) {
      return false;
    }
    return true;
  });
}

const getUserById = (req, res) => {
  User.findById(req.params.userId)
      .exec((napaka, uporabnik) => {
        if(!uporabnik)
          return res.status(404).json({
            "sporočilo":
                "Uporabnik s podanim id-jem ne obstaja."
          });
        else if (napaka) {
          return res.status(500).json(napaka);
        } else
          res.status(200).json(uporabnik);
      });
};

/*const getUserById = (req, res) => {
  var userId = req.params.userId;

  console.log(req.params.userId);

  User.findOne({"_id": userId}, function (err, user) {
    if(!user)
      return res.status(404).json({
        "error": "user not found"
      });
    else if (err)
      return res.status(500).json(err);
    else
      return res.status(200).json(user);
  });
};*/

const deleteUser = (req, res) => {
  var id = req.params.userId;
  var ObjectId = (mongoose.Types.ObjectId);

  User.deleteOne({"_id": ObjectId(id)},
      function (error, result) {
        if (error) res.status(404).json(result);
        else res.status(200).json(result);
      });

};

// };

// todo: getUserById
// todo: updateUser (change settings, etc)
// todo: deleteUser

module.exports = {
  getAllUsers,
  addGroup,
  getUserById, // todo
  addUser,
  // updateUser, // todo
  deleteUser  // todo
};
