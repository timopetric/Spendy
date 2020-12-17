const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

/** GET /api/v2/users
 * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      description: \-
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
 *          description: An error message
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
                res.status(500).json({ message: "Napaka v bazi", error: error });
            } else {
                res.status(200).json({ users });
            }
        });
};

/**
 * GET /api/v2/users/name/:name
 * return a user by his name
 *  * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      description: \-
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
 *          description: An error message
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
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

module.exports = {
    getAllUsers,
    getUserByName
};
