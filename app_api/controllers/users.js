const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');


const getAllUsers = (req, res) => {
  User
    .find()
    .exec((napaka, users) => {
      if (napaka) {
        res.status(500).json(napaka);
      } else {
        res.status(200).json(
          users.map(user => {
            return {
              "_id": user._id,
              "username": user.username,
              "name": user.name,
              "surname": user.surname,
              "mail": user.mail,
              "balance": user.balance,
              "groups": user.groups
            };
          })
        );
      }
    });
};

const addUser = (req, res) => {
  const reqUsername = req.body.username;
  const reqName = req.body.name;
  const reqSurname = req.body.surname;
  const reqMail = req.body.mail;
  const reqPass = req.body.pass;

  // if (!reqUsername || !reqName || !reqSurname) {
  //   return res.status(400).json({
  //     "msg": "Parameters username, name, surname are required."
  //   });
  // }

  User.create({
    username: reqUsername,
    name: reqName,
    surname: reqSurname,
    balance: 0.0,
    mail: reqMail,
    pass: reqPass
  }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(201).json(user);
    }
  });
};



const addGroup = (req, res) => {
  const reqBalance = req.body.balance;
  const reqName = req.body.name;
  const reqUsers = req.body.users;
  const reqAdmins = req.body.admins;


  Group.create({
    balance: reqBalance,
    name: reqName,
  }, (error, group) => {
    if (error) {
      res.status(400).json(error);
    } else {

      // add the current user to the group
      for (const u of reqUsers) {
        if (validateUserById(u)) {
          group.users.push(u);
          // group.admins.push(user);
        } else {
          res.status(500).json("Uporabnik: "+u+" ne obstaja.");
        }
      }

      group.save(function (err) {
        // res.status(400).json(err);
        console.log("Error saving to database! "+err);
      });

      res.status(201).json(group);
    }
  });

};

function validateUserById(userId) {
  let user = User.findById(userId).exec((napaka, user) => {
    return napaka;
  });
}


// };



// todo: getUserById
// todo: updateUser (change settings, etc)
// todo: deleteUser

module.exports = {
  getAllUsers,
  addGroup,
  // getUserById, // todo
  addUser,
  // updateUser, // todo
  // deleteUser  // todo
};