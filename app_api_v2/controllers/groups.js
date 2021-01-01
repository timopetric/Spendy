const mongoose = require("mongoose");
const SpendyError = require("./SpendyError");
const ctrlCategories = require("../controllers/categories");
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
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }

    // TODO: populate only needed fields in expenses
    Group.findById(idGroup)
        .select("_id name balance userIds adminIds expenses")
        .populate("expenses", "_id isExpenditure cost date category_name created_by groupId description")
        .populate("userIds", "_id groupIds username name surname mail balance")
        .exec((error, group) => {
            if (!group) {
                res.status(404).json({ message: `Group with id ${idGroup} not found` });
            } else if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else {
                res.status(200).json(group);
            }
        });
};

// NOT USED
//CREATE GROUP
// const crateNewGroup = (req, res) => {
//     const name = req.body.name;
//     const balance = req.body.balance;
//     const userIds = req.body.category_name;
//     const adminIds = req.body.adminIds;
//     const expenses = req.body.expenses;
//     Group.create(
//         {
//             name: name,
//             balance: balance,
//             userIds: userIds,
//             adminIds: adminIds,
//             expenses: expenses,
//         },
//         (error, group) => {
//             if (error) {
//                 res.status(500).json({ message: "Error in database cant create group", error: error });
//             } else if (!group) {
//                 res.status(404).json({ message: `Cant create group` });
//             } else {
//                 res.status(200).json({
//                     _id: group._id,
//                     name: group.name,
//                     userIds: group.userIds,
//                     adminIds: group.adminIds,
//                     expenses: group.expenses,
//                     balance: group.balance,
//                 });
//             }
//         }
//     );
// };

const createAndAddToUser = (req, res) => {
    const idUser = req.body.idUser;
    const groupName = req.body.groupName;

    if (!idUser || !groupName) {
        return res.status(404).json({
            message: "idUser and groupName must present present in the body",
        });
    }

    // create one man group and add it to the user
    const BALANCE_STARTING = 0.0;

    User.findById(idUser)
        .then((user) => {
            if (!user) throw new SpendyError("User with this id not found", 404);
            else
                return Group.create({
                    name: groupName,
                    balance: BALANCE_STARTING,
                    userIds: [user._id],
                    adminIds: [user._id],
                    expenses: [],
                });
        })
        .then((group) => {
            // console.log("3");
            // add userid to the users of the group
            return User.findByIdAndUpdate(idUser, {
                $push: {
                    groupIds: group._id,
                },
            }).then(() => {
                return group;
            });
        })
        .then((group) => {
            // create the group categories
            return ctrlCategories.createGroupCategories(group._id).then((categories) => {
                if (!categories) {
                    throw new SpendyError("Cant create categories", 404);
                } else {
                    // console.log(categories);
                    return Group.findById(group._id)
                        .select("_id name balance userIds adminIds expenses")
                        .populate("userIds", "_id username name surname mail");
                }
            });
        })

        .then((group) => {
            // console.log("4");
            res.status(200).json(group);
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({ message: "Error in database", error: error });
            }
        });
};

const removeUserFromGroup = async (req, res) => {
    const idGroup = req.params.idGroup;
    const idUser = req.params.idUser;

    if (!idGroup || !idUser) {
        return res.status(400).json({ message: "Parameter idGroup and idUser must be defined" });
    }

    User.findByIdAndUpdate(idUser, { $pull: { groupIds: idGroup } })
        .select("_id username name surname mail")
        .then((user) => {
            if (!user) {
                throw new SpendyError("User with this id does not exist", 404);
            } else {
                return Group.findByIdAndUpdate(
                    idGroup,
                    { $pull: { userIds: user._id, adminIds: user._id } },
                    { upsert: true }
                )
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
            } else if (error.kind === "ObjectId") {
                res.status(404).json({ message: `Could not find user with id to remove from this group` });
            } else {
                console.log(error);
                res.status(500).json({ message: "Error in database", error: error });
            }
        });
};

const addUserToGroup = async (req, res) => {
    const idGroup = req.params.idGroup;
    const mailOfUser = req.body.mail; // userToAdd id string
    // const isAdmin = req.body.isAdmin; // boolean

    if (!idGroup || !mailOfUser) {
        return res.status(400).json({ message: "Parameter idGroup and mailOfUser must be defined" });
    }

    // console.log("#################################");
    // console.log(idGroup);

    Group.findById(idGroup)
        .then((group) => {
            return User.findOneAndUpdate({ mail: mailOfUser }, { $addToSet: { groupIds: group._id } }).select(
                "_id username name surname mail"
            );
        })
        .then((user) => {
            if (!user) {
                throw new SpendyError("User with this mail does not exist", 404);
            } else
                return Group.findByIdAndUpdate(idGroup, { $addToSet: { userIds: user._id } }, { upsert: true })
                    .select("_id name balance userIds adminIds expenses")
                    .populate("userIds", "_id username name surname mail");
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

    let body = {};
    if (req.body.userIds) {
        body["userIds"] = req.body.userIds.split(",");
    }
    if (req.body.adminIds) {
        body["adminIds"] = req.body.adminIds.split(",");
    }
    if (req.body.expenses) {
        body["expenses"] = req.body.expenses.split(",");
    }
    if (req.body.balance) {
        body["balance"] = req.body.balance;
    }
    if (req.body.name) {
        body["name"] = req.body.name;
    }
    // console.log("###################");
    // console.log(body);

    // DONE please ask before changing response selections and populations. lePigeon
    Group.findByIdAndUpdate(idGroup, body)
        .then((groupUpdated) => {
            if (!groupUpdated) {
                throw new SpendyError(
                    "Group with this id does not exist or could not be updated using the data in request body",
                    404
                );
            } else {
                return Group.findById(idGroup)
                    .select("_id name balance userIds adminIds expenses")
                    .populate("userIds", "_id username name surname mail");
            }
        })
        .then((group) => {
            res.status(200).json(group);
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else if (error.kind === "ObjectId") {
                res.status(404).json({ message: `Group with this id does not exist` });
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

// const deleteUserFromGroup = (req, res) => {
//     const idGroup = req.params.idGroup;
//     const idUser = req.params.idUser;
//
//     if (!idGroup || !idUser) {
//         return res.status(404).json({
//             message: "Parameter idGroup and idUser must be defined",
//         });
//     }
//
//     Group.findById(idGroup).exec((error, group) => {
//         if (error) {
//             res.status(500).json({ message: "Error in database cant find group", error: error });
//         } else if (!group) {
//             res.status(404).json({ message: `Cant find group with id ${idGroup}` });
//         } else {
//             group.userIds.remove(idUser);
//             group.save((error2, savedGroup) => {
//                 if (error2) {
//                     res.status(500).json({ message: "Error in database cant save group without user", error: error });
//                 } else if (!savedGroup) {
//                     res.status(404).json({ message: `Cant save group without user ${idUser}` });
//                 } else {
//                     User.findById(idUser).exec((userErr, user) => {
//                         if (userErr) {
//                             res.status(500).json({ message: "Error in database cant find user", error: error });
//                         } else if (!user) {
//                             res.status(404).json({ message: `Cant find user with id: ${idUser}` });
//                         } else {
//                             user.groupIds.remove(idGroup);
//                             user.save((saveUserErr, savedUser) => {
//                                 if (saveUserErr) {
//                                     res.status(500).json({
//                                         message: "Error in database cant save user without idGroup",
//                                         error: error,
//                                     });
//                                 } else if (!savedUser) {
//                                     res.status(404).json({
//                                         message: `Error in database cant save user without idGroup with idUser : ${idUser}`,
//                                     });
//                                 } else {
//                                     res.status(200).json({ message: "Deleting was successfully" });
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// };

// TODO: ALI JE PROBLEM ČE IZBRIŠEMO SKUPINO UPORABNIKA?
const removeGroupById = (req, res) => {
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(404).json({
            message: "Parameter idGroup must be defined",
        });
    }

    Group.findByIdAndDelete(idGroup)
        .select("name balance userIds adminIds expenses")
        .then(async (deletedGroup) => {
            //console.log(deletedGroup._id);
            //console.log(deletedGroup.expenses);
            try {
                const deleted = await Expense.deleteMany({ _id: { $in: deletedGroup.expenses } });
                await ctrlCategories.deleteCategoriesOfGroup(idGroup).exec((error, category) => {
                    // if (error) throw new SpendyError("Could not find and delete category for this group", 404);
                });
                // console.log(deleted);
                // console.log(deletedGroup);
                return deletedGroup;
            } catch (error) {
                //console.log("nek error je kao");
                // console.log(error);
                // throw new SpendyError("Cant delete expenses of group", 404);
            }
        })
        .then(async (deletedGroup) => {
            // console.log("hehe tle se ustau");
            // console.log(deletedGroup);
            try {
                const updated = await User.updateMany(
                    { _id: { $in: deletedGroup.userIds } },
                    { $pull: { groupIds: { $in: [idGroup] } } },
                    { multi: true }
                );
                // console.log(updated);
                return deletedGroup;
            } catch (error) {
                // console.log(error);
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

const getGroupsByUserId = async (req, res) => {
    const idUser = req.params.idUser;
    if (!idUser) {
        return res.status(400).json({ message: "Parameter idUser must be defined" });
    }
    const populate = req.query.populate;
    let populateField = "";
    let populateFields = "";
    if (populate && populate === "userIds") {
        populateField = "userIds";
        populateFields = "_id username name surname mail";
    }

    User.findById(idUser)
        .then((user) => {
            if (!user) {
                throw new SpendyError("User with this id does not exist.", 404);
            } else {
                return Group.find({
                    _id: {
                        $in: user.groupIds,
                    },
                })
                    .populate(populateField, populateFields)
                    .select("_id name balance userIds adminIds expenses");
            }
        })
        .then((groups) => {
            if (!groups) {
                throw new SpendyError("This user does not have any groups.", 404);
            } else {
                res.status(200).json(groups);
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
};

module.exports = {
    getAllGroups,
    getGroupById,
    addUserToGroup,
    updateGroup,
    removeGroupById,
    removeUserFromGroup,
    createAndAddToUser,
    getGroupsByUserId,
};
