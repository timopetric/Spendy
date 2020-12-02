const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");

////GET ALL EXPENSES OF GROUP
const importDbData = async (req, res) => {
    const userData = require("../models/user-data.json");
    const groupData = require("../models/groups-data.json");
    const expenseData = require("../models/expenses-data.json");

    let resMessage = [];

    Group.insertMany(groupData, function (err1, result) {
        if (err1) {
            console.log("### Group NOT Inserted " + err1);
            resMessage.push({ Group: "db user import NOT ok", GroupErr: err1 });
            res.status(400).json(resMessage);
        } else {
            console.log("### Group Inserted");
            resMessage.push({ Group: "success" });

            User.insertMany(userData, function (err, result) {
                if (err) {
                    console.log("### User NOT Inserted " + err);
                    resMessage.push({ User: "db user import NOT ok", UserErr: err });
                    res.status(400).json(resMessage);
                } else {
                    console.log("### User Inserted");
                    resMessage.push({ User: "success" });

                    Expense.insertMany(expenseData, function (err2, result) {
                        if (err2) {
                            console.log("### Expense NOT Inserted " + err2);
                            resMessage.push({ Expense: "db user import NOT ok", ExpenseErr: err2 });
                            res.status(400).json(resMessage);
                        } else {
                            console.log("### Expense Inserted");
                            resMessage.push({ Expense: "success" });

                            res.status(200).json(resMessage);
                        }
                    });
                }
            });
        }
    });
};

const dropDb = async (req, res) => {
    await mongoose.connection.db.dropDatabase(function (err, result) {
        if (err) {
            console.log("Db NOT dropped" + err);
            return res.status(404).json({ message: "db not dropped", err: err });
        } else {
            console.log("### Db dropped");
            return res.status(200).json(result);
        }
    });

    // const resMessage = []
    // User.delete({}, function(err,result) {
    //    if (err) {
    //      console.log("### User NOT Deleted "+err);
    //      resMessage.push({"User": "db user collection not deleted", "UserErr": err});
    //    } else {
    //      console.log("### User Deleted");
    //      resMessage.push({"User": "success"});
    //    }
    // });
    //
    // Group.delete({}, function(err,result) {
    //    if (err) {
    //      console.log("### Group NOT Deleted "+err);
    //      resMessage.push({"Group": "db user collection not deleted", "GroupErr": err});
    //    } else {
    //      console.log("### Group Deleted");
    //      resMessage.push({"Group": "success"});
    //    }
    // });
    //
    // Expense.delete({}, function(err,result) {
    //    if (err) {
    //      console.log("### Expense NOT Deleted "+err);
    //      resMessage.push({"Expense": "db user collection not deleted", "ExpenseErr": err});
    //    } else {
    //      console.log("### Expense Deleted");
    //      resMessage.push({"Expense": "success"});
    //    }
    // });
    //
    // return res.status(200).json(resMessage);
};

module.exports = {
    importDbData,
    dropDb,
};
