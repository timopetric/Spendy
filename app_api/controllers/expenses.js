const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");

//GET ALL EXPENSES
const getExpenses = async (req, res) => {
  let found = await Expense.find({});
  console.log(found);
  res.status(200).json(found);
};

const getExpenseById = async (req, res) => {
  const expenseId = req.params.id;

  let found = await Expense.findById(expenseId);
  console.log(found);
  res.status(200).json(found);
};

////GET ALL EXPENSES OF GROUP
const getExpensesByGroupId = async (req, res) => {
  let found = await Group.findById(req.params.id)
    .select("expenses")
    .populate("expenses")
    .exec((napaka, group) => {
      if (!group) {
        return res.status(404).json({
          message: "Ne najdem skupine s podanim id-jem",
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }
      return res.status(200).json(group);
    });

  return found;
};

//DODAJ EXPENSE GROUPI
const addExpense = (req, res) => {
  const idGroup = req.params.idGroup;
  console.log(idGroup);
  if (idGroup) {
    Group.findById(req.params.idGroup).exec((napaka, group) => {
      if (!group) {
        return res.status(404).json({
          message:
            "Ne najdem groupe s podanim enoličnim identifikatorjem idGroup.",
        });
      } else if (napaka) {
        console.log("napaka" + napaka);
        res.status(400).json(napaka);
      }
      console.log("grupa:  " + group);
      dodajExpense(req, res, group);
    });
  } else {
    res.status(400).json({
      message: "V zahtevku ni id skupine, id skupine je obvezen parameter",
    });
  }
};

const dodajExpense = (req, res, group) => {
  const isExpenditure = req.body.isExpenditure;
  const cost = req.body.cost;
  const date = req.body.date;
  const category_name = req.body.category_name;
  const description = req.body.description;
  const created_by = req.body.created_by;
  console.log(req.body);

  if (!created_by) {
    res.status(400).json({
      message:
        "Ne najdem created_by, ki naj bi vseboval username tistega," +
        "ki kreira expense, created_by je obvezen parameter.",
    });
  }

  const groupId = req.params.idGroup;

  Expense.create(
    {
      isExpenditure: isExpenditure,
      cost: cost,
      date: date,
      category_name: category_name,
      groupId: groupId,
      description: description,
      created_by: created_by,
    },
    (error, expense) => {
      if (!expense) {
        return res.status(404).json({
          message:
            "Ne najdem expensa s podanim enoličnim identifikatorjem idGroup." + error,
        });
      }
      if (error) {
        res.status(400).json(error);
      } else {
        group.expenses.push(expense._id);
        group.save((err, group) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(201).json(expense);
          }
        });
      }
    }
  );
};

//IZBRIŠI  EXPENSE GROUPI
const deleteExpense = (req, res) => {
  const idGroup = req.params.idGroup;
  const idExpense = req.params.idExpense;

  if (!idGroup || !idExpense) {
    return res.status(404).json({
      message:
        "Ne najdem Groupe oz. Expensa, " +
        "idGroup in idExpense sta obvezna parametra.",
    });
  }
  Group.findById(idGroup)
    .select("expenses")
    .exec((napaka, group) => {
      if (napaka) {
        res.status(400).json(napaka);
      } else {
        console.log(group);
        console.log(group.expenses);
        odstraniExpense(req, res, group);
      }
    });
};

const odstraniExpense = (req, res, group) => {
  const idExpense = req.params.idExpense;

  group.expenses.remove(idExpense);
  Expense.findByIdAndRemove(idExpense, (err, expense) => {
    if (!expense) {
      return res.status(404).json({
        message: "Ne najdem Expensa za izbris.",
      });
    }
    if (err) {
      res.status(400).json(err);
    } else {
      group.save((napaka) => {
        if (napaka) {
          return res.status(500).json(napaka);
        } else {
          res.status(204).json(expense);
        }
      });
    }
  });
};

const updateExpense = (req, res) => {
  if (!req.params.idExpense || !req.params.idGroup) {
    return res.status(404).json({
      message:
        "Ne najdem groupe oz. expensa, " +
        "idExpense in idGroup sta obvezna parametra.",
    });
  }
  Group.findById(req.params.idGroup)
    .select("expenses")
    .populate("expenses")
    .exec((napaka, group) => {
      if (!group) {
        return res.status(404).json({ message: "Ne najdem groupe." });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }

      Expense.findByIdAndUpdate(
        req.params.idExpense,
        req.body,
        (err, result) => {
          if (!result) {
            return res.status(404).json({
              message: "Ne najdem expensa, idExpense ni veljaven. " + err,
            });
          }
          if (err) {
            return res.status(500).json(err);
          } else {
            // vrne še ne posodobljen
            Expense.findById(result._id).exec((err, expense) => {
              if (!expense) {
                return res.status(500).json(err);
              }
              return res.status(200).json(expense);
            });
          }
        }
      );
    });
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  getExpensesByGroupId,
  updateExpense,
};
