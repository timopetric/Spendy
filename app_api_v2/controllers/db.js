const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");
const json2mongo = require("json2mongo");

////////////////////////////////////////////////////////////////////////////
// run this in project root with mongodb database running in docker to get the database export
// Users:
// docker exec -it sp-spendy-mongodb mongoexport -h localhost -d SpendyDB --jsonArray --pretty --quiet -c Users > ./app_api_v2/models/user-data-exported.json
// Groups:
// docker exec -it sp-spendy-mongodb mongoexport -h localhost -d SpendyDB --jsonArray --pretty --quiet -c Groups > ./app_api_v2/models/group-data-exported.json
// Expenses:
// docker exec -it sp-spendy-mongodb mongoexport -h localhost -d SpendyDB --jsonArray --pretty --quiet -c Expenses > ./app_api_v2/models/expense-data-exported.json
// DONT FORGET TO CHECK FOR EMPTY FILES AND ADD "[]" TO THEM (W/O ")
////////////////////////////////////////////////////////////////////////////

////GET ALL EXPENSES OF GROUP
const importDbData = async (req, res) => {
    let userJson, groupJson, expenseJson;
    try {
        userJson = require("../models/user-data-exported.json");
        groupJson = require("../models/group-data-exported.json");
        expenseJson = require("../models/expense-data-exported.json");
    } catch (err) {
        res.status(409).json(err);
        console.log(err);
    }

    const userData = json2mongo(userJson);
    const groupData = json2mongo(groupJson);
    const expenseData = json2mongo(expenseJson);

    // const userData = require("../models/user-data.json");
    // const groupData = require("../models/groups-data.json");
    // const expenseData = require("../models/expenses-data.json");

    // let userObjs = json2mongo(userData);
    // let userDbList = [];
    //
    // for (let i = 0; i < userObjs.length; i++) {
    //     let userObj = userObjs[i];
    //     // console.log(userObj);
    //     let user = new User();
    //     user._id = userObj._id;
    //     user.name = userObj.name;
    //     user.username = userObj.username;
    //     user.surname = userObj.surname;
    //     user.mail = userObj.mail;
    //     user.balance = userObj.balance;
    //     user.nakljucnaVrednost = userObj.nakljucnaVrednost;
    //     user.zgoscenaVrednost = userObj.zgoscenaVrednost;
    //     user.groupIds = [];
    //     await user.save();
    //     // console.log(user);
    //     userDbList.push(user);
    // }
    // // console.log(userDbList);
    //
    // let groupObjs = json2mongo(groupData);
    // let groupDbList = [];
    //
    // for (let i = 0; i < groupObjs.length; i++) {
    //     let groupObj = groupObjs[i];
    //     // console.log(groupObj);
    //     let group = new Group();
    //     group._id = groupObj._id;
    //     group.name = groupObj.name;
    //     group.balance = ObjectId(groupObj.balance);
    //     group.userIds = groupObj.userIds;
    //     console.log(groupObj);
    //     console.log(group.userIds);
    //     // for (let j = 0; j < groupObj.userIds; j++) {
    //     //     group.userIds.push(groupObj.userIds[j]);
    //     // }
    //     group.adminIds = groupObj.adminIds;
    //     // for (let j = 0; j < groupObj.adminIds; j++) {
    //     //     group.adminIds.push(groupObj.adminIds[j]);
    //     // }
    //     group.expenses = [];
    //     await group.save();
    //     // console.log(group);
    //     groupDbList.push(group);
    // }

    // console.log(groupDbList);

    // let resMessage = [];
    //
    // console.log(userObjs);
    // User.collection.insertMany(userObjs, function (err, result) {
    //     if (!err) {
    //         console.log(result.result);
    //         console.log(result.result.ok === result.result.n);
    //     }
    //     // console.log(err, result);
    // });

    // res.status(200).json("kek");
    let resMessage = [];

    Group.insertMany(groupData, function (err1, result) {
        if (err1) {
            console.log("### Group NOT Inserted " + err1);
            resMessage.push({ Group: "db user import NOT ok", GroupErr: err1 });
            res.status(409).json(resMessage);
        } else {
            console.log("### Group Inserted");
            resMessage.push({ Group: "success" });

            User.insertMany(userData, function (err, result) {
                if (err) {
                    console.log("### User NOT Inserted " + err);
                    resMessage.push({ User: "db user import NOT ok", UserErr: err });
                    res.status(409).json(resMessage);
                } else {
                    console.log("### User Inserted");
                    resMessage.push({ User: "success" });

                    Expense.insertMany(expenseData, function (err2, result) {
                        if (err2) {
                            console.log("### Expense NOT Inserted " + err2);
                            resMessage.push({ Expense: "db user import NOT ok", ExpenseErr: err2 });
                            res.status(409).json(resMessage);
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
