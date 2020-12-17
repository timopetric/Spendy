const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

/**
 * GET /api/v2/users
 * return all users in db
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

module.exports = { getAllUsers };
