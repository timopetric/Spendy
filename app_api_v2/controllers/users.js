const SpendyError = require("./SpendyError");

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

// DONE
const getAllUsers = (req, res) => {
    User.find()
        .select("_id groupIds username name surname mail balance")
        .exec((error, users) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!users) {
                res.status(404).json({ message: "Users not found" });
            } else {
                res.status(200).json(users);
            }
        });
};

// DONE
const getUserById = (req, res) => {
    let idUser = req.params.idUser;
    if (!idUser) {
        res.status(404).json({ message: "Parameter {idUser} must be supplied" });
    }
    User.findById(idUser)
        .select("_id groupIds username name surname mail balance")
        // .populate("groupIds", "_id name balance adminIds userIds expenses")
        .exec((error, user) => {
            if (!user || (error && error.kind === "ObjectId")) {
                res.status(404).json({ message: `Could not find user with id: ${idUser}` });
            } else if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else {
                res.status(200).json(user);
            }
        });
};
// todo: MAYBE ALREADY DONE IN GROUPS CONTROLLER make a special response for getting all groups of user with details

// DONE
const updateUser = (req, res) => {
    let idUser = req.params.idUser;
    if (!idUser) {
        res.status(404).json({ message: "Parameter {idUser} must be supplied" });
    }

    User.findByIdAndUpdate(idUser, req.body)
        .select("_id groupIds username name surname mail balance")
        .then((userUpdated) => {
            if (!userUpdated) {
                throw new SpendyError("User with this id does not exist", 404);
            } else {
                res.status(200).json(userUpdated);
            }
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else if (error.kind === "ObjectId") {
                res.status(404).json({ message: `Could not find user with id: ${idUser}` });
            } else {
                console.log(error);
                res.status(500).json({ message: `Error in database`, error: error });
            }
        });
};

// DONE
const deleteUser = (req, res) => {
    const idUser = req.params.idUser;
    if (!idUser) {
        res.status(404).json({ message: "Parameter {idUser} must be supplied" });
    }

    User.findByIdAndDelete(idUser, (error, result) => {
        if (!result || (error && error.kind === "ObjectId")) {
            res.status(404).json({ message: `User with id: ${idUser} not found`, error: error });
        } else if (error) {
            res.status(500).json({ message: "Error in database", error: error });
        } else {
            res.status(204).json({ message: `User with id: ${idUser} successfully deleted` });
        }
    });
};

///////// authentication.js user instead ///////////
// const addUser = (req, res) => {
//     const reqName = req.body.name;
//     const reqSurname = req.body.surname;
//     const reqUsername = req.body.username;
//     const reqMail = req.body.mail;
//     const reqPass = req.body.pass;
//
//     if (!reqUsername || !reqName || !reqSurname || !reqMail || !reqPass) {
//         return res.status(404).json({
//             message: "Parameters username, name, surname, mail, pass must be supplied in the body",
//         });
//     }
//
//     if (req.body.groupIds !== undefined) {
//         return res.status(404).json({
//             message: "groupIds must not be defined",
//         });
//     }
//
//     const USER_GROUP_NAME = `${reqMail}`;
//     const BALANCE_STARTING = 0.0;
//
//     // create special one man group
//     Group.create({
//         name: USER_GROUP_NAME,
//         balance: BALANCE_STARTING,
//         userIds: [],
//         adminIds: [],
//         expenses: [],
//     })
//         .then((group) => {
//             return User.create({
//                 username: reqUsername,
//                 name: reqName,
//                 surname: reqSurname,
//                 balance: BALANCE_STARTING,
//                 mail: reqMail,
//                 pass: reqPass,
//                 groupIds: [group._id],
//             });
//         })
//         .then((user) => {
//             // add userid to the users of the group
//             return Group.findByIdAndUpdate(user.groupIds[0], { userIds: [user._id], adminIds: [user._id] }).then(() => {
//                 return user;
//             });
//         })
//         .then((user) => {
//             res.status(201).json({
//                 _id: user._id,
//                 groupIds: user.groupIds,
//                 username: user.username,
//                 name: user.name,
//                 surname: user.surname,
//                 mail: user.mail,
//                 balance: user.balance,
//             });
//         })
//         .catch((error) => {
//             if (error instanceof SpendyError) {
//                 res.status(error.respCode).json({ message: error.message });
//             } else if (error.code === 11000 && error.keyValue) {
//                 // 11000 is mongo duplicate key error
//                 res.status(409).json({
//                     message: `User with fields: ${JSON.stringify(error.keyValue)} already exists`,
//                     error: error,
//                 });
//             } else {
//                 console.log(error);
//                 res.status(500).json({ message: "Error in database", error: error });
//             }
//         });
// };

/**
 * GET /api/v2/users/name/:name
 * return a user by his name
 * @swagger
 *  /users/name:
 *   get:
 *    summary: Get a user
 *    description: Get a user by their name
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: name
 *       description: the name of the user
 *       schema:
 *        type: string
 *       required: true
 *       example: Metka
 *    responses:
 *     "200":
 *      description: A user object
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Error'
 *     "400":
 *      description: Napaka zahteve, manjkajo obvezni parametri.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Error'
 *        example:
 *         sporočilo: Parametra lng in lat sta obvezna.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
const getUserByName = (req, res) => {
    const name = req.params.name;
    User.findOne()
        .where("name")
        .equals(name)
        .exec((napaka, user) => {
            if (!user) {
                return res.status(404).json({
                    Sporočilo: "Uporabnik s tem imenom ne obstaja",
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            } else {
                return res.status(200).json(user);
            }
        });
};

module.exports = { getAllUsers, updateUser, getUserById, deleteUser, getUserByName };
