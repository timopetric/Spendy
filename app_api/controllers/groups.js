const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");


const getAllGroups = async (req, res) => {
  let found = await Group.find({});
  console.log(found);
  res.status(200).json(found);
};

const getGroupById = async (req, res) => {
  let found = await Group.findById(req.params.id)
    .populate("expenses")
    .populate("userIds")
    .populate("adminIds")
    .exec((napaka, group) => {
      if (!group) {
        return res.status(404).json({
          "message": "Ne najdem skupine s podanim id-jem",
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }

      // todo: pobris gesla

      res.status(200).json(group);
    });

  return found;
};

const addGroup = async (req, res) => {
  console.log(req.body.userIds);
  let neki = true;
  neki = await req.body.userIds.forEach((element) => {
    User.exists(element, (err, user) => {
      console.log(element);
      if (err) {
        console.log("napaka:", user);
        return false;
      }
    });
  });
  console.log(neki);
  User.find()
    .where("_id")
    .in(req.body.userIds)
    .exec((err, records) => {
      if (err) {
        return res.status(404).json({
          sporočilo: "Ne najdem teh userjev s podanim id-jem",
        });
      } else {
        Group.create(
          {
            name: req.body.name,
            balance: req.body.balance,
            userIds: req.body.userIds,
            adminIds: req.body.adminIds,
            expenses: req.body.expenses,
          },
          function (napaka, group) {
            if (napaka) {
              console.log(napaka);
              res.status(400).json(napaka);
            } else {
              console.log(group);
              res.status(201).json(group);
            }
          }
        );
      }
    });
};

const addGroupExpenseById = (req, res) => {
  const groupId = req.params.groupId;
  const expenseId = req.params.expenseId;

  Expense.findById(expenseId).exec((napaka, expense) => {
    if (!lokacija) {
      return res.status(404).json({
        "message":
          "Ne najdem expensa s podanim enoličnim identifikatorjem idLokacije.",
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }

    res.status(200).json(expense);
  });
};

const removeGroupById = (req, res) => {
  const {idGroup} = req.params;
  // const idGroup = req.params.idGroup;
  console.log(idGroup);
  if (idGroup) {
    Group
        .findByIdAndRemove(idGroup)
        .exec((err) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(204).json(null);
        });
  } else {
    res.status(404).json({
      "message": "groupId is a required parameter."
    })
  }
}


module.exports = {
  getAllGroups,
  getGroupById,
  addGroup,
  removeGroupById
};
