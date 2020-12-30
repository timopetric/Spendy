const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const SpendyError = require("./SpendyError");

const getAllCategories = async (req, res) => {
    Category.find({})
        .select("_id groupId categories")
        .exec((error, categories) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!categories) {
                res.status(404).json({ message: "Groups not found" });
            } else {
                res.status(200).json(categories);
            }
        });
};

//GET EXPENSES BY GROUP ID
const getCategoriesByGroupId = (req, res) => {
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }
    Category.find({ groupId: idGroup })
        .select("categories")
        .exec((error, groupCategories) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!groupCategories) {
                res.status(404).json({ message: `"Categories of group with this ${idGroup} group id not found` });
            } else {
                res.status(200).json(groupCategories);
            }
        });
};

const createCategoryAndAddToGroup = (req, res) => {
    const category_name = req.body.category_name;
    const idGroup = req.params.idGroup;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }
    if (!category_name) {
        return res.status(400).json({ message: "Body element category_name must be provided" });
    }

    Category.find({ groupId: idGroup })
        .then((category) => {
            if (category.length === 0) {
                throw new SpendyError("Group doesnt yet have categories", 400);
            } else {
                Category.findOneAndUpdate({ groupId: idGroup }, { $addToSet: { categories: category_name } }).then(
                    (category) => {
                        res.status(201).json({ message: "category added" });
                    }
                );
            }
        })
        .catch((error) => {
            if (error instanceof SpendyError) {
                res.status(error.respCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Error in database", error: error });
            }
        });
};

const createCategoriesForGroup = (req, res) => {
    const idGroup = req.params.idGroup;
    if (!idGroup) {
        res.status(400).json({ message: "idGroup is required!" });
    }
    Category.find({ groupId: idGroup })
        .select("categories")
        .exec((error, category) => {
            if (error) {
                res.status(500).json({ message: "Error in database cant create categories for group", error: error });
            }
            if (!category || category.length === 0) {
                createGroupCategories(idGroup)
                    .then((categories) => {
                        if (!categories) {
                            throw new SpendyError("Cant create categories", 404);
                        } else {
                            console.log(categories);
                            res.status(200).json({ message: "Adding was successful" });
                        }
                    })
                    .catch((error) => {
                        if (error instanceof SpendyError) {
                            res.status(error.respCode).json({ message: error.message });
                        } else {
                            console.log(error);
                            res.status(500).json({
                                message: "Error in database cant create categories for group",
                                error: error,
                            });
                        }
                    });
            } else {
                res.status(409).json({ message: "categories for this group already exist!" });
            }
        });
};

const createGroupCategories = (idGroup) => {
    return Category.create({
        categories: ["Car", "Beauty", "Leisure", "Salary", "Clothes"],
        groupId: idGroup,
    });
};

const deleteCategoryForGroup = (req, res) => {
    const idGroup = req.params.idGroup;
    const toDelete = req.body.category_name;
    if (!idGroup) {
        res.status(400).json({ message: "idGroup is required!" });
    }
    if (!toDelete) {
        res.status(400).json({ message: "Specify which category you want to delete!" });
    }

    Category.findOneAndUpdate({ groupId: idGroup }, { $pull: { categories: toDelete } }).exec((error) => {
        if (error) {
            res.status(500).json({ message: "Error in database", error: error });
        } else {
            res.status(204).json({});
        }
    });
};

const updateCategoryForGroup = (req, res) => {
    const idGroup = req.params.idGroup;
    const toDelete = req.body.category_name;
    const newName = req.body.new_category_name;

    if (!idGroup) {
        return res.status(400).json({ message: "Parameter idGroup must be defined" });
    }
    if (!toDelete || !newName) {
        return res.status(400).json({ message: "Body elements category_name, new_category_name must be defined" });
    }

    Category.findOneAndUpdate({ groupId: idGroup }, { $pull: { categories: toDelete } }).exec((error, category) => {
        if (error) {
            res.status(500).json({ message: "Error in database", error: error });
        } else if (!category) {
            res.status(400).json({ message: "Group doesnt yet have categories" });
        } else {
            Category.findOneAndUpdate({ groupId: idGroup }, { $addToSet: { categories: newName } }).exec(
                (error2, category) => {
                    if (error2) {
                        res.status(500).json({ message: "Error in database", error: error2 });
                    } else if (!category) {
                        res.status(400).json({ message: "Group doesnt yet have categories" });
                    } else {
                        res.status(200).json({ message: "Category updated" });
                    }
                }
            );
        }
        // });
    });
};

module.exports = {
    createCategoryAndAddToGroup,
    createCategoriesForGroup,
    deleteCategoryForGroup,
    getCategoriesByGroupId,
    updateCategoryForGroup,
    createGroupCategories,
};
