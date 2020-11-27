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
    .populate("userIds", "-pass")
    .populate("adminIds", "-pass")
    .exec((err, group) => {
      if (!group) {
        return res.status(404).json({
          message: "Ne najdem skupine s podanim id-jem",
        });
      } else if (err) {
        return res.status(500).json(err);
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
      expenses: req.body.expenses,
    },
    (err, group) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else if (!group) {
        return res.status(404).json({
          message: "Ustvarjanje skupine je bilo neuspešno",
        });
      }
      res.status(201).json(group);
    }
  );
};

const removeGroupById = (req, res) => {
  const { idGroup } = req.params;
  // const idGroup = req.params.idGroup;
  console.log(idGroup);
  if (idGroup) {
    Group.findByIdAndRemove(idGroup).exec((err, group) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log("GROUP DELETED: " + group);
      console.log("Expenses to delete: " + group.expenses);

      Expense.deleteMany({ _id: { $in: group.expenses } }, (err, res) => {
        if (!res || !err) {
          console.log("Error deleting expenses for group." + err);
        }
      });

      res.status(204).json(null);
    });
  } else {
    res.status(404).json({
      message: "groupId is a required parameter.",
    });
  }
};

const updateGroup = (req, res) => {
  const groupId = req.params.idGroup;
  if (!groupId) {
    return res.status(404).json({
      message: "idGroup je obvezen parameter.",
    });
  }

  Group.findById(groupId).exec((err, group) => {
    if (!group) {
      return res.status(404).json({ message: "Ne najdem grupe" });
    } else if (err) {
      return res.status(500).json(err);
    }

    group.balance = req.body.balance;
    group.userIds = req.body.userIds || [];
    group.adminIds = req.body.adminIds || [];
    group.expenses = req.body.expenses || [];
    group.name = req.body.name;

    group.save((err, group) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(group);
      }
    });
  });
};

const deleteUserFromGroup = (req, res) => {
  Group.findById(req.params.idGroup).exec((err, group) => {
    if (!group) {
      return res.status(404).json({ message: "Ne najdem grupe" });
    } else if (err) {
      res.status(404).json(err);
    }
    console.log(group);
    group.userIds.remove(req.params.idUser);
    console.log(group);
    group.save((error, saved) => {
      if (!saved) {
        return res.status(404).json({ message: "Ni mi uspelo shranit" });
      } else if (error) {
        res.status(404).json(err);
      }
      res.status(200).json(saved);
    });
  });
};

module.exports = {
  getAllGroups,
  getGroupById,
  addGroup,
  removeGroupById,
  updateGroup,
  deleteUserFromGroup,
};
