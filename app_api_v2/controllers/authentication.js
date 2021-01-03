const passport = require("passport");
const mongoose = require("mongoose");
const Group = mongoose.model("Group");
const Uporabnik = mongoose.model("User");
const ctrlCategories = require("../controllers/categories");

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
    } else if (
        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            reqMail
        )
    ) {
        return res.status(400).json({ sporočilo: "Elektronski naslov je napačne oblike!" });
    } else if (
        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            reqUsername
        )
    ) {
        return res.status(400).json({ sporočilo: "Uporabniško ime je napačno!" });
    } else if (!/^[A-Za-zčćžđšČĆŽĐŠ0-9 ]+/.test(reqPass)) {
        res.status(400).json({ sporočilo: "Geslo je napačne oblike!" });
    } else if (!/^[A-Za-zčćžđšČĆŽĐŠ0-9 ]+/.test(reqName)) {
        res.status(400).json({ sporočilo: "Ime je napačne oblike!" });
    } else if (!/^[A-Za-zčćžđšČĆŽĐŠ0-9 ]+/.test(reqSurname)) {
        res.status(400).json({ sporočilo: "Priimek je napačne oblike!" });
    }
    if (req.body.groupIds !== undefined) {
        return res.status(404).json({
            message: "groupIds must not be defined",
        });
    }

    // create special one man group
    const USER_GROUP_NAME = `Skupina ${reqMail}`;
    const BALANCE_STARTING = 0.0;
    Group.create({
        name: USER_GROUP_NAME,
        balance: BALANCE_STARTING,
        userIds: [],
        adminIds: [],
        expenses: [],
    })
        .then((group) => {
            return ctrlCategories.createGroupCategories(group._id).then((categories) => {
                if (!categories) {
                    throw new SpendyError("Cant create categories", 404);
                } else {
                    // console.log(categories);
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
                }
            });
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
                    // message: `User with fields: ${JSON.stringify(error.keyValue)} already exists`,
                    // TODO: TO SEM SPREMENIL. VPRAŠAJ TIMOTA, ČE JE KUL.
                    sporočilo: "Uporabnik s to elektronsko pošto že obstaja!",
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
    } else if (
        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            req.body.mail
        )
    ) {
        return res.status(400).json({ sporočilo: "Elektronski naslov je napačne oblike!" });
    } else if (!/^[A-Za-zčćžđšČĆŽĐŠ0-9 ]+/.test(req.body.pass)) {
        res.status(400).json({ sporočilo: "Geslo je napačne oblike!" });
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
