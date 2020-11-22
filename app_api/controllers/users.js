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
              "balance": user.balance
            };
          })
        );
      }
    });
};


module.exports = {
  getAllUsers,
  // getUserById,
  // addUser,
  // updateUser,
  // deleteUser
};