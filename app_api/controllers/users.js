const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");


var apiParametri = {
  streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
  apiParametri.streznik = 'https://sp-spendy.herokuapp.com';
}
const axios = require('axios').create({
  baseURL: apiParametri.streznik,
  timeout: 5000
});

/**
 * @swagger
 * paths:
 *  /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
const getAllUsers = (req, res) => {
  User.find()
    .select("-pass")
    .exec((napaka, users) => {
      if (napaka) {
        res.status(500).json(napaka);
      } else {
        res.status(200).json({ users });
      }
    });
};


const getGroupByUserId = async (req, res) => {
    let found = await User.findById(req.params.userId)
        .select("groupIds")
        .populate("groupIds")
        .exec((napaka, user) => {
            if (!user) {
                return res.status(404).json({
                    "Sporočilo": "Ne najdem uporabnika s tem id-jem",
                });
            }
            else if (napaka) {
                return res.status(500).json(napaka);
            } else {
                return res.status(200).json(user);
            }
        })
    return found;
};

// validate user and return it if pass is correct
// POST: /v1/users/login
// {
//     "username": "a",
//     "password": "a"
// }
const validateUser = (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;

    User
        .findOne()
        .populate("groupIds")
        .where("mail")
        .equals(mail)
        .exec((err, user) => {
            if (!user)
                return res.status(404).json({
                    "message":
                        "Uporabnik s podanim poštnim naslovom ne obstaja."
                });
            else if (err) {
                return res.status(500).json(err);
            } else {

                if (user.pass === password) {

                  // ----------- login-server ----------------
                  axios.post('/login-server', {
                      user: user,
                  })
                  .then(function (response) {
                      if (response.status === 200) {
                          console.log("server logged in the user");
                          return res.status(200).json(user);
                      } else {
                          console.log("server error logging in user");
                          return res.status(404).json(user);

                      }
                  })
                  .catch(function (error) {
                      console.log(error);
                      return res.status(404).json(user);
                  });
                  // ----------- login-server END --------------



                } else {
                    return res.status(404).json({"message": "password incorrect"});
                }

            }
        });
}


/**
 * @swagger
 * paths:
 *  /users:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *          name: userId
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *          required: true
 *          description: A valid user you want to update
 *      responses:
 *        "200":
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
const addUser = (req, res) => {
  const reqUsername = req.body.username;
  const reqName = req.body.name;
  const reqSurname = req.body.surname;
  const reqMail = req.body.mail;
  const reqPass = req.body.pass;
  const balance = 0.0;

  if (req.body.groupIds !== undefined) {
    return res.status(404).json({
      message: "groupIds ne sme biti definiran. Dodate ga lahko kasneje",
    });
  }

  const USER_GROUP_NAME = `Uporabnik ${reqUsername}`;

  // create special one man group
  Group.create(
    {
      name: USER_GROUP_NAME,
      balance: 0.0,
      userIds: [],
      adminIds: [],
      expenses: [],
    },
    (err, group) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else if (!group) {
        return res.status(404).json({
          message: "Ustvarjanje skupine za uporabnika je bilo neuspešno",
        });
      }

      User.create(
        {
          username: reqUsername,
          name: reqName,
          surname: reqSurname,
          balance: balance,
          mail: reqMail,
          pass: reqPass,
          groupIds: [String(group._id)],
        },
        (error, user) => {
          if (error) {
            res.status(400).json(error);
          } else if (user) {
            // redact pass from the current object (not also in the db)
            delete user._doc.pass;

            // push user and admin ids to the group
            group._doc.userIds.push(user._id);
            group._doc.adminIds.push(user._id);

            // save the updated @userIds and @adminIds lists
            group.save((err, group) => {
              if (err) {
                let eMsg =
                  "Error updating the user and admin ids in the newly created group: " +
                  err;
                console.log(eMsg);
                res.status(400).json({ message: eMsg });
              } else {
                console.log(
                  "Group user and admin ids successfully updated: " + group
                );
                res.status(201).json(user); // return the created user
              }
            });
          } else {
            console.log("Something went wrong when creating user.");
          }
        }
      );
    }
  );
};

/**
 * @swagger
 * paths:
 *  /users/{id}:
 *    get:
 *      summary: Get the user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: A valid user id
 *      responses:
 *        "200":
 *          description: A user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .select("-pass")
    .populate("groupIds")
    .exec((err, user) => {
      if (!user)
        return res.status(404).json({
          message: "Uporabnik s podanim id-jem ne obstaja.",
        });
      else if (err) {
        return res.status(500).json(err);
      } else {

          // async.forEach(user,function(oneUser,callback) {
          //     Group.populate(oneUser.groupIds,{ "path": "userIds" },function(err,output) {
          //         if (err) throw err; // or do something
          //
          //         callback();
          //     });
          // }, function(err) {
          //     res.status(200).json(user);
          // });

          res.status(200).json(user);
      }
    });
};

/**
 * @swagger
 * paths:
 *  /users/{id}:
 *    put:
 *      summary: Update user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: A valid user id
 *      responses:
 *        "200":
 *          description: A user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
const updateUser = (req, res) => {
  if (!req.params.idUser) {
    return res.status(404).json({
      message: "Ne najdem userja, " + "idUser je obvezen parameter.",
    });
  }
  User.findByIdAndUpdate(req.params.idUser, req.body, (err, result) => {
    if (!result) {
      return res.status(404).json({
        message: "Ne najdem userja, idUser ni veljaven. " + err,
      });
    }
    if (err) {
      return res.status(500).json(err);
    } else {
      // vrne še ne posodobljen
      User.findById(result._id).exec((err, user) => {
        if (!user) {
          return res.status(500).json(err);
        }
        return res.status(200).json(user);
      });
    }
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



/**
 * @swagger
 * paths:
 *  /users/{userId}:
 *    delete:
 *      summary: Delete user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: A valid user id you want to delete
 *      responses:
 *        "200":
 *          description: A user
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example:
 *                  {
 *                  "n": 1,
 *                  "ok": 1,
 *                  "deletedCount": 1
 *                  }
 */
const deleteUser = (req, res) => {
  const id = req.params.userId;
  const ObjectId = mongoose.Types.ObjectId;

  User.deleteOne({ _id: ObjectId(id) }, function (error, result) {
    console.log(result);
    if (error) res.status(404).json(result);
    else res.status(200).json(result);
  });
};

// todo: ?updateUser (change settings, etc)?

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser, // todo
  deleteUser, // todo
  validateUser,
  deleteUserFromGroupId,
  getGroupByUserId
};
