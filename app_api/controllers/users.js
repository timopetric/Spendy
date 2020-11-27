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

const getUserById = (req, res) => {
  User.findById(req.params.id)
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

const deleteUserFromGroupId = async (req, res) => {
    const idGroup = req.params.idG;
    const idUser = req.params.idU;
    console.log(idGroup + " " + idUser);

    if (!idGroup || !idUser) {
        return res.status(404).json({
            sporočilo:
                "Ne najdem Groupe oz. uporabnika, " +
                "idGroup in idUser sta obvezna parametra.",
        });
    }
    Group.findById(idGroup)
        .select("userIds")
        .exec((napaka, group) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                console.log(group);
                console.log(group.expenses);
                odstraniUser(req, res, group);
            }
        });
};

const odstraniUser = (req, res, group) => {
    const idUser = req.params.idU;

    group.userIds.remove(idUser);
    User.findByIdAndRemove(idUser, (err, user) => {
        if (!user) {
            return res.status(404).json({
                sporočilo: "Ne najdem User za izbris.",
            });
        }
        if (err) {
            res.status(400).json(err);
        } else {
            group.save((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                } else {
                    res.status(204).json(user);
                }
            });
        }
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
  getUserById, // todo
  addUser,
  // updateUser, // todo
  deleteUserFromGroupId, // todo
  deleteUser
};
