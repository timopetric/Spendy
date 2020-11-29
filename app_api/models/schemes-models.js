// 'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


////////////////////////////////////// CURRENCIES SCHEMA: /////////////////////////////////////////////////////////
// todo: dodaj še eno shemo hranjenje cen valut, ki se pridobijo enkrat na dan (za grafe)
const currencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0},
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Currencies",
  }
);
const currencyModel = mongoose.model("Currency", currencySchema);


////////////////////////////////////// USER SCHEMA: /////////////////////////////////////////////////////////
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - name
 *          - surname
 *          - mail
 *          - pass
 *          - balance
 *        properties:
 *          username:
 *            type: integer
 *            description: Username of the user
 *            example: janez123
 *          name:
 *            type: string
 *            description: Name of the user
 *            example: Janez
 *          surname:
 *            type: string
 *            description: Surname of the user
 *            example: Novak
 *          mail:
 *            type: boolean
 *            description: Mail address of the user
 *            example: j_novak@email.com
 *          pass:
 *            type: string
 *            description: Password of the user
 *            example: securePass123
 *          balance:
 *            type: number
 *            description: Current balance of the user
 *            example: 100.9
 *          groupIds:
 *            type: array
 *            items:
 *              type: string
 *            description: A list of valid(existing) group IDs
 *            example: ["5fc01ba0cd9e25474436be60", "5fba7cb28a41eb7ee6452713"]
 */
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mail: { type: String, required: true},
    pass: { type: String, required: true /*, set: Data.prototype.saltySha1*/ },
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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Group:
 *        type: object
 *        required:
 *          - name
 *          - balance
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the group
 *            example: Družina
 *          balance:
 *            type: number
 *            description: Current balance of the group
 *            example: 19999.88
 *          userIds:
 *            type: array
 *            items:
 *              type: string
 *            description: A list of valid(existing) user IDs
 *            example: ["5fc01ba0cd9e25474436be60", "5fba7cb28a41eb7ee6452713"]
 *          adminIds:
 *            type: array
 *            items:
 *              type: string
 *            description: A list of valid(existing) user IDs
 *            example: ["5fc01ba0cd9e25474436be60", "5fba7cb28a41eb7ee6452713"]
 *          expenses:
 *            type: array
 *            items:
 *              type: string
 *            description: A list of valid(existing) expense IDs
 *            example: ["5fc01ba0cd9e25474436be60", "5fba7cb28a41eb7ee6452713"]
 */
const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    balance: { type: Number, default: 0.0, required: true },
    // isUserGroup: {type: Boolean, default: false},
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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Expense:
 *        type: object
 *        required:
 *          - isExpenditure
 *          - cost
 *          - date
 *          - category_name
 *          - created_by
 *          - groupId
 *        properties:
 *          isExpenditure:
 *            type: boolean
 *            description: Marks if the expense is an expenditure or a cash inflow
 *            example: true
 *          cost:
 *            type: number
 *            description: The cost in eur
 *            example: 89.99
 *          date:
 *            type: string
 *            format: date-time
 *            description: Date when the expense was created
 *            example: 2017-07-21T17:32:28Z
 *          category_name:
 *            type: string
 *            description: Name of the category
 *            example:
 *          created_by:
 *            type: string
 *            description: Username of the creator
 *            example: j_novak123
 *          description:
 *            type: string
 *            description: A description od the expense
 *            example: a very helpful description
 *          groupId:
 *            type: string
 *            description: A list of valid(existing) group IDs
 *            example: "5fc01ba0cd9e25474436be60"
 */
const expenseSchema = new mongoose.Schema(
  {
    isExpenditure: { type: Boolean, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now(), required: true},
    category_name: { type: String, required: true },
    created_by: { type: String, required: true }, // username
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