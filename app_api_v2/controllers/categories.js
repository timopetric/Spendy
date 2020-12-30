const mongoose = require("mongoose");
const Category = mongoose.model("Category");

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
    return res.status(400).json({ message: "Parameter idGroup must be defind" });
  }
  Category.find({ groupId: idGroup})
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
    return res.status(400).json({ message: "Parameter idGroup must be defind" });
  }
  if(!category_name){
    return res.status(400).json({ message: "Category name must be provided" });
  }


  Category.find({ groupId: idGroup})
    .exec((error, res1) => {
      if(error){
        res.status(500).json({ message: "Error in database", error: error });
      }
      let exists = false;
      for(let i = 0 ; i < res1[0].categories.length ; i++){
        let tmp = res1[0].categories[i];
        if(tmp.name == category_name){
          exists = true;
          break;
        }
      }
      if(exists){
        res.status(409).json({message: "Category already exists"});
      }else{
        Category.findOneAndUpdate({ groupId: idGroup}, { $addToSet: {categories: {name: category_name }}})
          .then(()=>{
            res.status(201).json({message: "category created!"});
          });
      }

    });
};

const createCategoriesForGroup = (req,res) => {
  const idGroup = req.params.idGroup;
  if(!idGroup){
    res.status(400).json({ message: "idGroup is required!" });
  }

  Category.create(
    {categories: [{name: "hrana"}], groupId: idGroup},
    (error, categories) => {
      if (error) {
        res.status(500).json({ message: "Error in database cant create categories for group", error: error });
      } else if (!categories) {
        res.status(404).json({ message: "Cant create categories" });
      }else{
        console.log(categories);
        res.status(200).json({ message: "Adding was successful" });
      }
    });
};

const deleteCategoryForGroup = (req,res) => {
  const idGroup = req.params.idGroup;
  const toDelete = req.body.category_name;
  if(!idGroup){
    res.status(400).json({ message: "idGroup is required!" });
  }
  if(!toDelete){
    res.status(400).json({ message: "Specify which category you want to delete!" });
  }

  Category.findOneAndUpdate({ groupId: idGroup}, { $pull: { categories: {name:  toDelete}} })
    .exec((error) =>{
      if (error) {
        res.status(500).json({ message: "Error in database", error: error });
      } else{
        res.status(204).json({});
      }
    });
};

const updateCategoryForGroup = (req,res) => {
  const idGroup = req.params.idGroup;
  const toDelete = req.body.category_name;
  const newName = req.body.new_category_name;

  Category.findOneAndUpdate({ groupId: idGroup}, { $pull: { categories: {name:  toDelete}} })
    .exec((error) =>{
      Category.find({ groupId: idGroup})
        .exec()
        .then((res1) => {
        if (error) {
          res.status(500).json({ message: "Error in database", error: error });
        } else{
          let exists = false;
          for(let i = 0 ; i < res1[0].categories.length ; i++){
            let tmp = res1[0].categories[i];
            if(tmp.name == newName){
              exists = true;
              break;
            }
          }
          if(exists){
            Category.findOneAndUpdate({ groupId: idGroup}, { $addToSet: { categories: {name:  toDelete}} })
              .exec((error2) => {
                if(error2){
                  res.status(500).json({message:"Error in database", error: error2});
                }
              });
            res.status(409).json({message: "Category already exists"});
          }else{
            Category.findOneAndUpdate({ groupId: idGroup}, { $addToSet: {categories: {name: newName }}})
              .then(()=>{
                res.status(201).json({message: "category updated!"});
              });
          }

        }
      });
    });
};

module.exports = {
  createCategoryAndAddToGroup,
  createCategoriesForGroup,
  deleteCategoryForGroup,
  getCategoriesByGroupId,
  updateCategoryForGroup,
};