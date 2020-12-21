const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

/** GET /api/v2/users
 * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      description: Returns a list of all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User_getAllUsers'
 *        "500":
 *          description: Error in database
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 *        "404":
 *          description: No user was found
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 */
const getAllUsers = (req, res) => {
    User.find()
        .select("_id groupIds username name surname balance mail")
        .exec((error, users) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!users) {
                res.status(404).json({ message: "Users not found" });
            } else {
                res.status(200).json(
                    // FYI this map is not needed
                    users.map((user) => {
                        return {
                            _id: user._id,
                            groupIds: user.groupIds,
                            username: user.username,
                            name: user.name,
                            surname: user.surname,
                            mail: user.mail,
                            balance: user.balance,
                        };
                    })
                );
            }
        });
};

const getUserById = (req, res) => {
    User.findById(req.params.userId)
        .select("-pass")
        .populate("groupIds")
        .exec((error, user) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({
                    _id: user._id,
                    groupIds: user.groupIds,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                    mail: user.mail,
                    balance: user.balance,
                });
            }
        });
};

// pretty done, pls do not touch
const updateUser = (req, res) => {
    let idUser = req.params.idUser;
    if (!idUser) {
        res.status(404).json({ message: "Parameter {idUser} must be supplied" });
    }
    User.findByIdAndUpdate(idUser, req.body, (error, result) => {
        if (error) {
            res.status(500).json({ message: "Error in database", error: error });
        } else if (!result) {
            res.status(404).json({ message: `User with id: ${idUser} not found`, error: error });
        } else {
            return result;
        }
    })
        .then((userUpdated) => {
            res.status(200).json({
                _id: userUpdated._id,
                groupIds: userUpdated.groupIds,
                username: userUpdated.username,
                name: userUpdated.name,
                surname: userUpdated.surname,
                mail: userUpdated.mail,
                balance: userUpdated.balance,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error in database", error: error });
        });
};

module.exports = { getAllUsers, updateUser, getUserById };
