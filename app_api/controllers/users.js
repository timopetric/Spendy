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
  User
      .find()
      .select("-pass")
      .exec((napaka, users) => {
        if (napaka) {
          res.status(500).json(napaka);
        } else {
          res.status(200).json({users});
        }
      });
};


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

  // todo: create a special one user group and add him to it
  // const groupId = ;

  User.create(
      {
        username: reqUsername,
        name: reqName,
        surname: reqSurname,
        balance: balance,
        mail: reqMail,
        pass: reqPass,
        // groupId: groupId   // todo
      },
      (error, user) => {
        if (error) {
          res.status(400).json(error);
        } else {
          user._doc.pass = "";
          user._doc.notice = "Group for the user is not yet created/not implemented";
          res.status(201).json(user);
        }
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
            "message":
                "Uporabnik s podanim id-jem ne obstaja."
          });
        else if (err) {
          return res.status(500).json(err);
        } else
          res.status(200).json(user);
      });
};

/**
 * @swagger
 * paths:
 *  /users/{userId}:
 *    delete:
 *      summary: Get the user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: A valid user id you want to update
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
  const ObjectId = (mongoose.Types.ObjectId);

  User.deleteOne({"_id": ObjectId(id)},
      function (error, result) {
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
  // updateUser, // todo
  deleteUser  // todo
};
