const passport = require("passport");
const LokalnaStrategija = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Uporabnik = mongoose.model("User");

passport.use(
    new LokalnaStrategija(
        {
            usernameField: "mail",
            passwordField: "pass",
        },
        (uporabniskoIme, geslo, pkKoncano) => {
            Uporabnik.findOne({ mail: uporabniskoIme }, (napaka, uporabnik) => {
                if (napaka) return pkKoncano(napaka);
                if (!uporabnik) {
                    return pkKoncano(null, false, {
                        sporočilo: "Napačno uporabniško ime ali geslo",
                    });
                }
                if (!uporabnik.preveriGeslo(geslo)) {
                    return pkKoncano(null, false, {
                        sporočilo: "Napačno uporabniško ime ali geslo",
                    });
                }
                return pkKoncano(null, uporabnik);
            });
        }
    )
);
