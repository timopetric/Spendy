const passport = require("passport");
const mongoose = require("mongoose");
const Group = mongoose.model("Group");
const Uporabnik = mongoose.model("User");

const SpendyError = require("./SpendyError");

const registracija = (req, res) => {
    const reqName = req.body.name;
    const reqSurname = req.body.surname;
    const reqUsername = req.body.username;
    const reqMail = req.body.mail;
    const reqPass = req.body.pass;

    if (!reqUsername || !reqName || !reqSurname || !reqMail || !reqPass) {
        return res.status(404).json({
            message: "Parameters username, name, surname, mail, pass must be supplied in the body",
        });
    }

    if (req.body.groupIds !== undefined) {
        return res.status(404).json({
            message: "groupIds must not be defined",
        });
    }

    // create special one man group
    const USER_GROUP_NAME = `${reqMail}`;
    const BALANCE_STARTING = 0.0;
    Group.create({
        name: USER_GROUP_NAME,
        balance: BALANCE_STARTING,
        userIds: [],
        adminIds: [],
        expenses: [],
    })
        .then((group) => {
            // console.log("1");
            const user = new Uporabnik();
            user.name = reqName;
            user.surname = reqSurname;
            user.mail = reqMail;
            user.balance = BALANCE_STARTING;
            user.username = reqUsername;
            user.groupIds = [group._id];
            user.nastaviGeslo(reqPass);
            return user.save();
        })
        .then((user) => {
            // console.log("3");
            // add userid to the users of the group
            return Group.findByIdAndUpdate(user.groupIds[0], { userIds: [user._id], adminIds: [user._id] }).then(() => {
                return user;
            });
        })
        .then((user) => {
            // console.log("4");
            res.status(200).json({ žeton: user.generirajJwt() });
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else if (error.code === 11000 && error.keyValue) {
                // 11000 is mongo duplicate key error
                res.status(409).json({
                    message: `User with fields: ${JSON.stringify(error.keyValue)} already exists`,
                    error: error,
                });
            } else {
                console.log(error);
                res.status(500).json({ message: "Error in database", error: error });
            }
        });
};

const prijava = (req, res) => {
    if (!req.body.mail || !req.body.pass) {
        return res.status(400).json({ sporočilo: "Zahtevani so vsi podatki" });
    }
    passport.authenticate("local", (napaka, uporabnik, informacije) => {
        if (napaka) return res.status(500).json(napaka);
        if (uporabnik) {
            res.status(200).json({ žeton: uporabnik.generirajJwt() });
        } else {
            res.status(401).json(informacije);
        }
    })(req, res);
};

module.exports = {
    registracija,
    prijava,
};
