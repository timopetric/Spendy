const mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
mongoose.model("User", userSchema);

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
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // users of the group
    adminIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // admins (users) of the group
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
mongoose.model("Group", groupSchema);
