const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

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

// validate user and return it if pass is correct
// POST: /v1/users/login
// {
//     "username": "a",
//     "password": "a"
// }
const validateUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User
      .findOne()
      .where("username")
      .equals(username)
      .exec((err, user) => {
        if (!user)
          return res.status(404).json({
            "message":
                "Uporabnik s podanim id-jem ne obstaja."
          });
        else if (err) {
          return res.status(500).json(err);
        } else {

          if (user.pass === password) {
            return res.status(200).json(user);
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
    .exec((err, user) => {
      if (!user)
        return res.status(404).json({
          message: "Uporabnik s podanim id-jem ne obstaja.",
        });
      else if (err) {
        return res.status(500).json(err);
      } else res.status(200).json(user);
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
};
