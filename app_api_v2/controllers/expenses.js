const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");

const mongoosePaginate = require("mongoose-paginate-v2");

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

    if (!idExpense) {
        return res.status(400).json({ message: "Parameter idExpense must be defined" });
    }

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

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }

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
const getExpensesByGroupIdWithQueries = (req, res) => {
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

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }

    Group.findById(idGroup, { _id: false })
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

const getExpensesByGroupIdWithQueriesWithPagination = (req, res) => {
    //console.log("getExpensesByGroupId2 with query params" + req.query);
    let isExpenditure = req.query.isExpenditure;
    let cena = req.query.cena;
    let datum = req.query.date;
    let queryinput = req.query.search;
    const page = req.query.page;

    isExpenditure = isExpenditure != null || undefined ? { isExpenditure: isExpenditure } : {};
    cena = cena != null || undefined ? { cost: { $gte: cena } } : {};
    datum = datum != null || undefined ? { sort: { date: -1 } } : {};
    queryinput = queryinput != null || undefined ? { category_name: { $regex: new RegExp(queryinput, "i") } } : {};

    const options = Object.assign(datum);
    //console.log(match);
    //console.log(req.params);
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }

    // prettier-ignore
    Group.findById(idGroup,"expenses")
        .then(expenses => {
           const match = Object.assign({_id : {$in: expenses['expenses']}}, isExpenditure, cena, queryinput);
           Expense.paginate(match,{limit: 4, page: page ,options})
           .then(exp =>{
            //console.log(exp)
                res.status(200).json(exp);
            })
            .catch(error =>{
                res.status(500).json(error);
            });
        })
        .catch(error => {
            //console.log(error)

            res.status(500).json(error);
        });
};

//DODAJ EXPENSE GROUPI
const addExpenseToGroup = (req, res) => {
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }

    Group.findById(idGroup).exec((error, group) => {
        if (error) {
            res.status(500).json({ message: "Error in database.", error: error });
        } else if (!group) {
            res.status(404).json({ message: `Cant find group with idGroup:${idGroup}` });
        } else {
            //console.log("grupa:  " + group);
            createExpenseAndAddToGroup(req, res, group);
        }
    });
};

const createExpenseAndAddToGroup = (req, res, group) => {
    const isExpenditure = req.body.isExpenditure;
    const cost = parseFloat(req.body.cost);
    const date = req.body.date;
    const category_name = req.body.category_name;
    const description = req.body.description;
    const created_by = req.body.created_by;

    let RegEx = RegExp("^[A-Za-zčćžđšČĆŽĐŠ0-9 ]{3,25}$");
    let descRegEx = RegExp("^[A-Za-zčćžđšČĆŽĐŠ0-9 ]{3,130}$");
    if (!RegEx.test(category_name)) {
        return res.status(400).json({ message: "Category not in line with regex" });
    }
    if (!descRegEx.test(category_name)) {
        return res.status(400).json({ message: "Description not in line with regex" });
    }
    if (!RegEx.test(description)) {
        return res.status(400).json({ message: "Description not in line with regex" });
    }
    if (typeof cost !== "number") {
        return res.status(400).json({ message: "Body element cost must be a number" });
    }

    if (!created_by) {
        return res.status(400).json({ message: "Parameter created_by is not defined" });
    }

    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }

    Expense.create(
        {
            isExpenditure: isExpenditure,
            cost: cost,
            date: date,
            category_name: category_name,
            groupId: idGroup,
            description: description,
            created_by: created_by,
        },
        (error, expense) => {
            if (error) {
                res.status(500).json({ message: "Error in database cant create expense 2", error: error });
            } else if (!expense) {
                res.status(404).json({ message: "Cant create expense" });
            } else {
                group.expenses.push(expense._id);
                group.balance += isExpenditure ? -cost : cost;
                group.save((error2, savedGroup) => {
                    if (error2) {
                        res.status(500).json({
                            message: "Error in database cant save group with new expense",
                            error: error2,
                        });
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
        return res.status(400).json({ message: "Parameters idGroup and idExpense must be defined" });
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

    if (!idExpense) {
        return res.status(400).json({ message: "Parameter idExpense must be defined" });
    }

    Expense.findByIdAndRemove(idExpense, (error, expense) => {
        if (error) {
            res.status(500).json({ message: "Error in database cant find group", error: error });
        } else if (!expense) {
            res.status(404).json({ message: `Cant find expense with idExpense ${idExpense}` });
        } else {
            group.expenses.remove(idExpense);
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

    const isExpenditure = req.body.isExpenditure;
    const cost = parseFloat(req.body.cost);
    const category_name = req.body.category_name;
    const description = req.body.description;
    //prettier-ignore
    let RegExdesc = RegExp("([a-zA-Z0-9,. ]{3,120})");
    //prettier-ignore
    let RegNumb = RegExp("[0-9]{1,16}\.{0,1}[0-9]*");

    if (!RegNumb.test(cost) || !RegExdesc.test(category_name) || !RegExdesc.test(description)) {
        return res.status(400).json({ message: "Updating body params are in invalid form" });
    }

    if (!idExpense || !idGroup) {
        return res.status(400).json({ message: "Parameters idGroup and idExpense must be defined" });
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
                            expense: updatedExpense,
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
    getExpensesByGroupIdWithQueriesWithPagination,
};
