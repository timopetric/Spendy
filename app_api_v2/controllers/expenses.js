const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");

//GET ALL EXPENSES
const getAllExpenses = (req, res) => {
    Expense.find({}).exec((error, expenses) => {
        if (error) {
            res.status(500).json({ message: "Error in database", error: error });
        } else if (!expenses) {
            res.status(404).json({ message: "Expenses not found" });
        } else {
            res.status(200).json(expenses);
        }
    });
};

//GET EXPENSE BY ID
const getExpenseById = (req, res) => {
    const idExpense = req.params.idExpense;
    Expense.findById(idExpense).exec((error, expense) => {
        if (error) {
            res.status(500).json({ message: "Error in database", error: error });
        } else if (!expense) {
            res.status(404).json({ message: `"Expense with ${idExpense} not found` });
        } else {
            res.status(200).json(expense);
        }
    });
};

//GET EXPENSES BY GROUP ID
const getExpensesByGroupId = (req, res) => {
    const idGroup = req.params.idGroup;
    Group.findById(idGroup)
        .select("expenses")
        .populate("expenses")
        .exec((error, groupExpenses) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!groupExpenses) {
                res.status(404).json({ message: `"Expenses of group with this ${idGroup} group id not found` });
            } else {
                res.status(200).json(groupExpenses);
            }
        });
};

////GET ALL EXPENSES OF GROUP
const getExpensesByGroupIdWithQueries = async (req, res) => {
    //console.log("getExpensesByGroupId2 with query params" + req.query);
    let isExpenditure = req.query.isExpenditure;
    let cena = req.query.cena;
    let datum = req.query.date;
    let queryinput = req.query.search;

    isExpenditure = isExpenditure != null || undefined ? { isExpenditure: isExpenditure } : {};
    cena = cena != null || undefined ? { cost: { $gte: cena } } : {};
    datum = datum != null || undefined ? { sort: { date: -1 } } : {};
    queryinput = queryinput != null || undefined ? { category_name: { $regex: new RegExp(queryinput, "i") } } : {};

    const match = Object.assign(isExpenditure, cena, queryinput);
    const options = Object.assign(datum);
    //console.log(match);
    //console.log(req.params);
    const idGroup = req.params.idGroup;
    Group.findById(idGroup)
        .select("expenses")
        .populate({
            path: "expenses",
            match: match,
            options: options,
        })
        .exec((error, groupExpenses) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!groupExpenses) {
                res.status(404).json({ message: `Expenses of group with this group id: ${idGroup} not found` });
            } else {
                res.status(200).json(groupExpenses);
            }
        });
};

//DODAJ EXPENSE GROUPI
const addExpenseToGroup = (req, res) => {
    const idGroup = req.params.idGroup;
    console.log(idGroup);
    if (idGroup) {
        Group.findById(req.params.idGroup).exec((error, group) => {
            if (error) {
                res.status(500).json({ message: "Error in database.", error: error });
            } else if (!group) {
                res.status(404).json({ message: `Cant find group with idGroup:${idGroup}` });
            } else {
                //console.log("grupa:  " + group);
                createExpenseAndAddToGroup(req, res, group);
            }
        });
    } else {
        res.status(400).json({
            message: "Parameter idGroup must be defind.",
        });
    }
};

const createExpenseAndAddToGroup = (req, res, group) => {
    const isExpenditure = req.body.isExpenditure;
    const cost = req.body.cost;
    const date = req.body.date;
    const category_name = req.body.category_name;
    const description = req.body.description;
    const created_by = req.body.created_by;

    if (!created_by) {
        return res.status(400).json({ message: "Parameter created_by is not defind" });
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
            if (error) {
                res.status(500).json({ message: "Error in database cant create expense", error: error });
            } else if (!expense) {
                res.status(404).json({ message: "Cant create expense" });
            } else {
                group.expenses.push(expense._id);
                group.save((error2, savedGroup) => {
                    if (error2) {
                        res.status(500).json({ message: "Error in database cant save group with new expense" });
                    } else if (!savedGroup) {
                        res.status(404).json({ message: "Error cant get group" });
                    } else {
                        res.status(200).json({ message: "Adding was successful" });
                    }
                });
            }
        }
    );
};

//IZBRIŠI  EXPENSE GROUPI
const deleteExpenseOfGroup = (req, res) => {
    const idGroup = req.params.idGroup;
    const idExpense = req.params.idExpense;

    if (!idGroup || !idExpense) {
        return res.status(400).json({ message: "Parameters idGroup and idExpense must be defind" });
    }

    Group.findById(idGroup)
        .select("expenses")
        .exec((error, group) => {
            if (error) {
                res.status(500).json({ message: "Error in database cant find group", error: error });
            } else if (!group) {
                res.status(404).json({ message: `Cant find group with idGroup:${idGroup}` });
            } else {
                //console.log(group);
                //console.log(group.expenses);
                deleteExpenseOfGroupHelper(req, res, group);
            }
        });
};

const deleteExpenseOfGroupHelper = (req, res, group) => {
    const idExpense = req.params.idExpense;

    group.expenses.remove(idExpense);
    Expense.findByIdAndRemove(idExpense, (error, expense) => {
        if (error) {
            res.status(500).json({ message: "Error in database cant find group", error: error });
        } else if (!expense) {
            res.status(404).json({ message: `Cant find expense with idExpense ${idExpense}` });
        } else {
            group.save((error2, groupWithoutExpense) => {
                if (error2) {
                    res.status(500).json({
                        message: "Error in database cant save group with deleted expense",
                        error: error,
                    });
                } else if (!groupWithoutExpense) {
                    res.status(404).json({
                        message: `Cant find save group with deleted expense with this idExpense: ${idExpense}`,
                    });
                } else {
                    res.status(200).json({ message: "Deleting was successful" });
                }
            });
        }
    });
};

const updateExpense = (req, res) => {
    const idGroup = req.params.idGroup;
    const idExpense = req.params.idExpense;
    if (!idExpense || !idGroup) {
        return res.status(400).json({ message: "Parameters idGroup and idExpense must be defind" });
    }

    Group.findById(idGroup)
        .select("expenses")
        .populate("expenses")
        .exec((error, group) => {
            if (error) {
                res.status(500).json({ message: "Error in database cant find group", error: error });
            } else if (!group) {
                res.status(404).json({ message: `Cant find group with idGroup:${idGroup}` });
            } else {
                Expense.findByIdAndUpdate(idExpense, req.body, { new: true }, (error2, updatedExpense) => {
                    if (error2) {
                        res.status(500).json({
                            message: "Error in database cant find group and update expense",
                            error: error,
                        });
                    } else if (!updatedExpense) {
                        res.status(404).json({
                            message: `Cant find save group with deleted expense with this idExpense: ${idExpense}`,
                        });
                    } else {
                        res.status(200).json({
                            message: `Updating was successful`,
                        });
                    }
                });
            }
        });
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    getExpensesByGroupId,
    getExpensesByGroupIdWithQueries,
    addExpenseToGroup,
    deleteExpenseOfGroup,
    updateExpense,
};