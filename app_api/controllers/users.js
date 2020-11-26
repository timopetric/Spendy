const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

const getAllUsers = (req, res) => {
  User.find().exec((napaka, users) => {
    if (napaka) {
      res.status(500).json(napaka);
    } else {
      res.status(200).json(
        users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            mail: user.mail,
            balance: user.balance,
            groupIds: user.groups,
          };
        })
      );
    }
  });
};

const getUserById = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (!user) {
      return res.status(404).json({
        message: "Ne najdem userja s podanim id-jem",
      });
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(user);
  });
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

function validateUserById(userId) {
  let user = User.findById(userId).exec((err, user) => {
    if (err) {
      return false;
    }
    return true;
  });
}

// todo: updateUser (change settings, etc)
// todo: deleteUser

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  // updateUser, // todo
  // deleteUser  // todo
};
