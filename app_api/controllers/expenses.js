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
    (error, expense) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(201).json(expense);
      }
    }
  );
};

const addExpense2 = (req, res) => {
  const idGroup = req.params.idGroup;
  if (idGroup) {
    Group.findById(idGroup)
      .select("expenses")
      .exec((napaka, group) => {
        if (napaka) {
          res.status(400).json(napaka);
        } else {
          dodajExpense2(req, res, group);
        }
      });
  } else {
    res.status(400).json({
      sporočilo: "Ne najdem lokacije, idLokacije je obvezen parameter.",
    });
  }
};

const dodajExpense2 = (req, res, group) => {
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
    (error, expense) => {
      if (error) {
        res.status(400).json(error);
      } else {
        group.expenses.push(expense._id);
        group.save((error, group) => {
          if (error) {
            res.status(400).json(napaka);
          } else {
            res.status(201).json(expense);
          }
        });
      }
    }
  );
};

const dodajExpense = (req, res, group) => {
  if (!group) {
    res.status(404).json({ sporočilo: "Ne najdem Groupe." });
  } else {
    group.komentarji.push({
      avtor: req.body.naziv,
      ocena: req.body.ocena,
      besediloKomentarja: req.body.komentar,
    });
    lokacija.save((napaka, lokacija) => {
      if (napaka) {
        res.status(400).json(napaka);
      } else {
        posodobiPovprecnoOceno(lokacija._id);
        const dodaniKomentar = lokacija.komentarji.slice(-1).pop();
        res.status(201).json(dodaniKomentar);
      }
    });
  }
};

const deleteExpenseById = (req, res) => {
  const idExpense = req.params.id;
  if (!idExpense) {
    return res.status(404).json({
      sporočilo:
        "Ne najdem lokacije oz. komentarja, " +
        "idLokacije in idKomentarja sta obvezna parametra.",
    });
  }
  Expense.findById(idExpense)
    .select("komentarji")
    .exec((napaka, expense) => {
      if (!expense) {
        return res.status(404).json({ sporočilo: "Ne najdem expensa." });
      } else if (napaka) {
        return res.status(500).json(napaka);
      } else {
        return res
          .status(200)
          .json({ sporočilo: "POPRAVI TLE K TI NE ZBRIŠE" });
      }
    });
};

module.exports = {
  getAllExpensesForUser,
  addExpense,
  addExpense2,
};
