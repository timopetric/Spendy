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
          sporočilo: "Ne najdem skupine s podanim id-jem",
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }

      // todo: pobris gesla

      res.status(200).json(group);
    });

  return found;
};

const addGroup = (req, res) => {
  Group.create(
    {
      name: req.body.name,
      balance: req.body.balance,
      userIds: req.body.userIds,
      adminIds: req.body.adminIds,
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
};

const addGroupExpenseById = (req, res) => {
  const groupId = req.params.groupId;
  const expenseId = req.params.expenseId;

  Expense.findById(expenseId).exec((napaka, expense) => {
    if (!lokacija) {
      return res.status(404).json({
        sporočilo:
          "Ne najdem expensa s podanim enoličnim identifikatorjem idLokacije.",
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }

    res.status(200).json(expense);
  });
};

module.exports = {
  getAllGroups,
  getGroupById,
  addGroup,
};
