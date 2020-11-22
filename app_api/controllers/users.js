const mongoose = require('mongoose');
const User = mongoose.model('User');


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
              "balance": user.balance,
              "settings": user.settings
            };
          })
        );
      }
    });
};

const addUser = (req, res) => {
  const respUsername = req.body.username;
  const respName = req.body.name;
  const respSurname = req.body.surname;

  if (!respUsername || !respName || !respSurname) {
    return res.status(400).json({
      "msg": "Parameters username, name, surname are required."
    });
  }

  User.create({
    username: respUsername,
    name: respName,
    surname: respSurname,
    balance: 0.0,
    settings: {
      language: "sl",
      currency: "eur"
    }
  }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(201).json(user);
    }
  });
};

// todo: getUserById
// todo: updateUser (change settings, etc)
// todo: deleteUser

module.exports = {
  getAllUsers,
  // getUserById, // todo
  addUser,
  // updateUser, // todo
  // deleteUser  // todo
};