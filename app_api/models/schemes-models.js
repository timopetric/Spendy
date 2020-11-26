// 'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// todo: dodaj še eno shemo hranjenje cen valut, ki se pridobijo enkrat na dan (za grafe)

////////////////////////////////////// USER SCHEMA: /////////////////////////////////////////////////////////

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mail: { type: String, required: true },
    pass: { type: String, required: true },
    balance: { type: Number, required: true },
    groupIds: [{
          type: Schema.Types.ObjectId,
          ref: "Group",
          validate: {
            validator: function (groupId) {
              return new Promise(function (resolve) {
                groupModel.find({_id: groupId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            message: props => `Group with id '${props.value}' is not a valid group!`
          },
    }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Users",
  }
);
const userModel = mongoose.model("User", userSchema);


////////////////////////////////////// GROUPS SCHEMA: /////////////////////////////////////////////////////////


const groupSchema = new mongoose.Schema(
  {
    balance: { type: Number, default: 0.0, required: true },
    name: { type: String, required: true },
    userIds: [{
          type: Schema.Types.ObjectId,
          ref: "User",
          validate: {
            validator: function (userId) {
              return new Promise(function (resolve) {
                userModel.find({_id: userId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            message: props => `User with id '${props.value}' is not a valid user!`
          },
    }],
    adminIds: [{
          type: Schema.Types.ObjectId,
          ref: "User",
          validate: {
            validator: function (userId) {
              return new Promise(function (resolve) {
                userModel.find({_id: userId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            message: props => `User with id '${props.value}' is not a valid user!`
          },
    }],
    expenses: [{
          type: Schema.Types.ObjectId,
          ref: "Expense",
          validate: {
            validator: function (expenseId) {
              return new Promise(function (resolve) {
                expenseModel.find({_id: expenseId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            message: props => `Expense with id '${props.value}' is not a valid expense!`
          },
    }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Groups",
  }
);
const groupModel = mongoose.model("Group", groupSchema);


/////////////////////////////////////////// EXPENSE SCHEMA: ////////////////////////////////////////////////////


const expenseSchema = new mongoose.Schema(
  {
    isExpenditure: { type: Boolean, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    category_name: { type: String, required: true },
    description: String,
    groupId: {
          type: Schema.Types.ObjectId,
          ref: "Group",
          required: true,
          validate: {
            validator: function (groupId) {
              return new Promise(function (resolve) {
                groupModel.find({_id: groupId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            message: props => `Group with id '${props.value}' is not a valid group!`
          },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Expenses",
  }
);
const expenseModel = mongoose.model("Expense", expenseSchema);