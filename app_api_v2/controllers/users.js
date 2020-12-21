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


const getUserById = (req, res) => {
    User.findById(req.params.userId)
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


module.exports = {
    getAllUsers,
    getUserByName,
    getUserById
};
