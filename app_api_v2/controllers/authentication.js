const passport = require('passport');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('User');


const addGroupToUserWhenRegister = (user) => {

    const USER_GROUP_NAME = `Uporabnik ${user.name}`;

    // create special one man group
    Group.create(
        {
            name: USER_GROUP_NAME,
            balance: 0.0,
            userIds: [],
            adminIds: [user._id],
            expenses: [user._id],
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
            group.save((err, group) => {
                if (err) {
                    let eMsg =
                        "Error updating the user and admin ids in the newly created group: " +
                        err;
                    console.log(eMsg);
                    res.status(400).json({message: eMsg});
                } else {
                    console.log(
                        "Group user and admin ids successfully updated: " + group
                    );
                    res.status(201).json(user); // return the created user
                }
            })
        }
    );
};
const registracija = (req, res) => {
    if (!req.body.name || !req.body.mail || !req.body.pass) {
        // console.log("################################");
        // console.log(req.body);
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }

    if (req.body.groupIds !== undefined) {
        return res.status(404).json({
            message: "groupIds ne sme biti definiran. Dodate ga lahko kasneje",
        });
    }

    // let nekej = Uporabnik.findOne()
    //     .where("name")
    //     .equals(name)
    //     .exec((napaka, user) => {
    //         if (!user) {
    //             return false
    //         } else if (napaka) {
    //             return res.status(500).json(napaka);
    //         } else {
    //             true;
    //         }
    //     });
    // if (nekej) {
    //     return res.status(404).json( {
    //         message: "Uporabnik s tem elektronskim naslovom že obstaja",
    //     })
    // }

    const uporabnik = new Uporabnik();
    uporabnik.name = req.body.name;
    uporabnik.surname = req.body.surname
    uporabnik.mail = req.body.mail;
    uporabnik.balance = req.body.balance;
    uporabnik.username = req.body.username;
    uporabnik.nastaviGeslo(req.body.pass);
    uporabnik.save(napaka => {
        console.log("Sem prišel do sem");
        if (napaka) {
            console.log("Sem v napaki.");
            res.status(500).json(napaka);
        } else {
            // addGroupToUserWhenRegister(uporabnik);
            console.log("Sem v ustvarjanju uporabnika");
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        }
    });
};

const prijava = (req, res) => {
    if (!req.body.mail || !req.body.pass) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
        if (napaka)
            return res.status(500).json(napaka);
        if (uporabnik) {
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        } else {
            res.status(401).json(informacije);
        }
    })(req, res);
};


module.exports = {
    registracija,
    prijava,
};
