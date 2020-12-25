const mongoose = require("mongoose");
const SpendyError = require("./SpendyError");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");

//GET ALL GROUPS
const getAllGroups = async (req, res) => {
    Group.find({})
        .select("_id name balance userIds adminIds expenses")
        .exec((error, groups) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!groups) {
                res.status(404).json({ message: "Groups not found" });
            } else {
                res.status(200).json(groups);
            }
        });
};

//GET GROUP BY ID
const getGroupById = async (req, res) => {
    const idGroup = req.params.id;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defind" });
    }

    // TODO: populate only needed fields in expenses
    Group.findById(idGroup)
        .populate("expenses")
        .populate("userIds", "_id groupIds username name surname mail balance")
        .populate("adminIds", "_id groupIds username name surname mail balance")
        .exec((error, group) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!group) {
                res.status(404).json({ message: `Group with ${idGroup} not found` });
            } else {
                res.status(200).json(group);
            }
        });
};

//CREATE GROUP
const crateNewGroup = (req, res) => {
    const name = req.body.name;
    const balance = req.body.balance;
    const userIds = req.body.category_name;
    const adminIds = req.body.adminIds;
    const expenses = req.body.expenses;
    Group.create(
        {
            name: name,
            balance: balance,
            userIds: userIds,
            adminIds: adminIds,
            expenses: expenses,
        },
        (error, group) => {
            if (error) {
                res.status(500).json({ message: "Error in database cant create group", error: error });
            } else if (!group) {
                res.status(404).json({ message: `Cant create group` });
            } else {
                res.status(200).json({
                    _id: group._id,
                    name: group.name,
                    userIds: group.userIds,
                    adminIds: group.adminIds,
                    expenses: group.expenses,
                    balance: group.balance,
                });
            }
        }
    );
};

const addUserToGroup = async (req, res) => {
    const idGroup = req.params.idGroup;
    const mailOfUser = req.body.mail; // userToAdd id string
    // const isAdmin = req.body.isAdmin; // boolean

    if (!idGroup || !mailOfUser) {
        return res.status(400).json({ message: "Parameter idGroup and mailOfUser must be defined" });
    }

    User.findOne({ mail: mailOfUser })
        .select("_id username name surname mail")
        .then((user) => {
            if (!user) {
                throw new SpendyError("User with this mail does not exist", 404);
            } else {
                return Group.findByIdAndUpdate(idGroup, { $addToSet: { userIds: user._id } }, { upsert: true })
                    .select("_id name balance userIds adminIds expenses")
                    .populate("userIds", "_id username name surname mail");
            }
        })
        .then((group) => {
            if (!group) {
                throw new SpendyError("Group with this id does not exist", 404);
            } else {
                res.status(200).json(group);
            }
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({ message: "Error in database", error: error });
            }
        });
    // Group.findById(idGroup).exec((error, group) => {
    //     if (error) {
    //         res.status(500).json({ message: "Error in database cant create group", error: error });
    //     } else if (!group) {
    //         res.status(404).json({ message: `Cant find group with id: ${idGroup}` });
    //     } else {
    //         if (!group.userIds.contains((user) => user._id !== userToAdd._id)) {
    //             group.userIds.push(userToAdd);
    //         }
    //         if (isAdmin === true) group.adminIds.push(userToAdd);
    //
    //         group.save((error2, groupUpdated) => {
    //             if (error2) {
    //                 res.status(500).json({ message: "Error in database cant save group", error: error });
    //             } else if (!groupUpdated) {
    //                 res.status(404).json({ message: `Cant add user to group with id: ${idGroup}` });
    //             } else {
    //                 res.status(200).json(groupUpdated);
    //             }
    //         });
    //     }
    // });
};

const updateGroup = (req, res) => {
    let idGroup = req.params.idGroup;
    if (!idGroup) {
        res.status(404).json({ message: "Parameter {idGroup} must be supplied" });
    }

    // DONE please ask before changing response selections and populations. lePigeon
    Group.findByIdAndUpdate(idGroup, req.body)
        .select("_id name balance userIds adminIds expenses")
        .populate("userIds", "_id username name surname mail")
        .then((groupUpdated) => {
            if (!groupUpdated) {
                throw new SpendyError("Group with this id does not exist", 404);
            } else {
                res.status(200).json(groupUpdated);
            }
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else if (error.kind === "ObjectId") {
                res.status(404).json({ message: `Could not find group with id: ${idGroup}` });
            } else {
                console.log(error);
                res.status(500).json({ message: `Error in database`, error: error });
            }
        });
};

// const updateGroup2 = (req, res) => {
//     const idGroup = req.params.idGroup;
//     if (!idGroup) {
//         return res.status(404).json({
//             message: "Parameter idGroup must be defined",
//         });
//     }
//
//     Group.findById(groupId).exec((error, group) => {
//         if (error) {
//             return res.status(500).json({ message: "Error in database cant find group", error: error });
//         } else if (!group) {
//             return res.status(404).json({ message: `Cant find Group with id: ${idGroup}` });
//         }
//
//         group.balance = req.body.balance;
//         group.userIds = req.body.userIds || [];
//         group.adminIds = req.body.adminIds || [];
//         group.expenses = req.body.expenses || [];
//         group.name = req.body.name;
//
//         group.save((error2, groupUpdated) => {
//             if (error2) {
//                 res.status(500).json({ message: "Error in database cant find group", error: error });
//             } else if (!groupUpdated) {
//                 res.status(404).json({ message: `Cant update group ${group}` });
//             } else {
//                 res.status(200).json({ message: `Group was successfully updated` });
//             }
//         });
//     });
// };

const deleteUserFromGroup = (req, res) => {
    const idGroup = req.params.idGroup;
    const idUser = req.params.idUser;

    if (!idGroup || !idUser) {
        return res.status(404).json({
            message: "Parameter idGroup and idUser must be defind",
        });
    }

    Group.findById(idGroup).exec((error, group) => {
        if (error) {
            res.status(500).json({ message: "Error in database cant find group", error: error });
        } else if (!group) {
            res.status(404).json({ message: `Cant find group with id ${idGroup}` });
        } else {
            group.userIds.remove(idUser);
            group.save((error2, savedGroup) => {
                if (error2) {
                    res.status(500).json({ message: "Error in database cant save group without user", error: error });
                } else if (!savedGroup) {
                    res.status(404).json({ message: `Cant save group without user ${idUser}` });
                } else {
                    User.findById(idUser).exec((userErr, user) => {
                        if (userErr) {
                            res.status(500).json({ message: "Error in database cant find user", error: error });
                        } else if (!user) {
                            res.status(404).json({ message: `Cant find user with id: ${idUser}` });
                        } else {
                            user.groupIds.remove(idGroup);
                            user.save((saveUserErr, savedUser) => {
                                if (saveUserErr) {
                                    res.status(500).json({
                                        message: "Error in database cant save user without idGroup",
                                        error: error,
                                    });
                                } else if (!savedUser) {
                                    res.status(404).json({
                                        message: `Error in database cant save user without idGroup with idUser : ${idUser}`,
                                    });
                                } else {
                                    res.status(200).json({ message: "Deleting was successfully" });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

// ALI JE PROBLEM ČE IZBRIŠEMO SKUPINO SKUPINO UPORABNIKA
const removeGroupById = (req, res) => {
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(404).json({
            message: "Parameter idGroup must be defind",
        });
    }

    Group.findByIdAndDelete(idGroup)
        .select("name balance userIds adminIds expenses")
        .then(async (deletedGroup) => {
            //console.log(deletedGroup._id);
            //console.log(deletedGroup.expenses);
            try {
                const deleted = await Expense.deleteMany({ _id: { $in: deletedGroup.expenses } });
                console.log(deleted);
                console.log(deletedGroup);
                return deletedGroup;
            } catch (error) {
                //console.log("nek error je kao");
                console.log(error);
                throw new SpendyError("Cant delete expenses of group", 404);
            }
        })
        .then(async (deletedGroup) => {
            console.log("hehe tle se ustau");
            console.log(deletedGroup);
            try {
                const updated = await User.updateMany(
                    { _id: { $in: deletedGroup.userIds } },
                    { $pull: { groupIds: { $in: [idGroup] } } },
                    { multi: true }
                );
                console.log(updated);
                return deletedGroup;
            } catch (error) {
                console.log(error);
                throw new SpendyError("Cant update users of group", 404);
            }
        })
        .then((deletedGroup) => {
            return res.status(200).json(deletedGroup);
        })
        .catch((error) => {
            return res.status(404).json({ message: error });
        });
};

module.exports = {
    getAllGroups,
    getGroupById,
    crateNewGroup,
    addUserToGroup,
    updateGroup,
    removeGroupById,
};
