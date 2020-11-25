const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");

const getAllExpensesForUser = async (req, res) => {
  let found = await Expense.find({});
  console.log(found);
  res.status(200).json(found);
};

const addExpense = (req, res) => {
  const isExpenditure = req.body.isExpenditure;
  const cost = req.body.cost;
  const date = req.body.date;
  const category_name = req.body.category_name;
  const groupId = req.body.groupId;
  const description = req.body.description;

  Expense.create(
    {
      isExpenditure: isExpenditure,
      cost: cost,
      date: date,
      category_name: category_name,
      groupId: groupId,
      description: description,
    },
    (error, user) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(201).json(user);
      }
    }
  );
};

module.exports = {
  getAllExpensesForUser,
  addExpense,
};
