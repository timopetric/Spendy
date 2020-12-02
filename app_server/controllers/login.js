const login = (req, res) => {
    res.render("login", {
        title: "Prijavna stran",
        navbar_button_selected_login: true,
        stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
        scripts_load: ["/javascripts/checkLogin.js"],
    });
};

var user = null;

function getUserId() {
    return user._id;
    // return userIdCurrent
}
function getUserGroups() {
    return user.groupIds;
    // return userGroups;
}
function getUser() {
    return user;
}

function logoutUser() {
    user = null;
}

// called to save the currently logged in user on the server (only one user a time can be logged on)
const loginServer = (req, res) => {
    console.log(req.body);
    user = req.body.user;

    if (user) res.status(200).json({ message: "successful user server logon" });
    else res.status(404).json({ message: "not successful user server logon" });
};

// called to delete the currently logged in user from the server
const logoutServer = (req, res) => {
    logoutUser();
    res.redirect("/login");
};

module.exports = {
    login,
    loginServer,
    getUserId,
    getUserGroups,
    getUser,
    logoutServer,
};
