const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// skupine:
// -ime
// -admini
// -stroski
//
// strosek:
// -boolean: prihodek/odhodek
// -skupina (kam pase) oziroma uporabnik
//
// uporabnik:
// -ime
// -priimk
// -mail
// -pass
// -skupine
// -(stroški)?

// todo: dodaj še eno shemo hranjenje cen valut, ki se pridobijo enkrat na dan (za grafe)

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mail: { type: String, required: true },
    pass: { type: String, required: true },
    balance: { type: Number, required: true },
    groupIds: [{ type: Schema.Types.ObjectId, ref: "Group" }], // user belongs to multiple groups
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

const expenseSchema = new mongoose.Schema(
  {
    isExpenditure: { type: Boolean, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    category_name: { type: String, required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true }, // expense belongs to a certain group
    description: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Expenses",
  }
);
mongoose.model("Expense", expenseSchema);

const groupSchema = new mongoose.Schema(
  {
    balance: { type: Number, default: 0.0, required: true },
    name: { type: String, required: true },
    userIds: [{
          type: Schema.Types.ObjectId,
          ref: "User",
          validate: {
            validator: function (uId) {
              return new Promise(function (resolve) {
                userModel.find({_id: uId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            // message: "Message error user not exists"
          },
    }], // users of the group
    adminIds: [{
          type: Schema.Types.ObjectId,
          ref: "User",
          validate: {
            validator: function (uId) {
              return new Promise(function (resolve) {
                userModel.find({_id: uId}, function (err, docs) {
                  resolve(docs.length === 1);
                });
              })
            },
            // message: "Message error user not exists"
          },
    }], // admins (users) of the group
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
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
