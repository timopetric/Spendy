// 'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

////////////////////////////////////// CATEGORIES SCHEMA: /////////////////////////////////////////////////////////
// todo: dodaj še eno shemo hranjenje kategorij
const categoriesSchema = new mongoose.Schema(
    {
        categories: [
          {
            name: {type: String, unique:true}
          },
        ],
        groupId: {
          ref: "Group",
          type: Schema.Types.ObjectId,
        }

    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        collection: "Categories",
    }
);
const categoriesModel = mongoose.model("Category", categoriesSchema);

////////////////////////////////////// USER SCHEMA: /////////////////////////////////////////////////////////

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        mail: { type: String, required: true, unique: true },
        // pass: { type: String, required: true /*, set: Data.prototype.saltySha1*/ }, //we don't save password because that is a vulnerability
        zgoscenaVrednost: { type: String, required: true }, //calculated with nakljucnaVrednost and mail
        nakljucnaVrednost: { type: String, required: true },
        balance: { type: Number, required: true },
        groupIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Group",
                // validate: {
                //     validator: function (groupId) {
                //         return new Promise(function (resolve) {
                //             groupModel.find({ _id: groupId }, function (err, docs) {
                //                 resolve(docs.length === 1);
                //             });
                //         });
                //     },
                //     message: (props) => `Group with id '${props.value}' is not a valid group!`,
                // },
            },
        ],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        collection: "Users",
    }
);

//kreira zgoščeno in naključno vrednost iz podanega gesla pri registraciji, samega gesla pa ne hrani nikjer in se zavrže
userSchema.methods.nastaviGeslo = function (geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString("hex");
    this.zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, "sha512").toString("hex");
};

//za preverjanje ustreznosti gesla pri prijavi. Ponovno gesla se ne hrani nikjer, ampak se generira nova zgoščena vrednost iz
//podanega gesla pri prijavi in se primerja z naključno vrednostjo uporabnika z istim mailom, ki je unikaten
userSchema.methods.preveriGeslo = function (geslo) {
    let zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, "sha512").toString("hex");
    return this.zgoscenaVrednost === zgoscenaVrednost;
};

//ko se uporabnik prijavi dobi žeton, ki ima nek omejen čas trajanja, ta je pri nas 7 dni oziroma en teden
userSchema.methods.generirajJwt = function () {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);

    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            mail: this.mail,
            name: this.name,
            surname: this.surname,
            exp: parseInt(datumPoteka.getTime() / 1000, 10),
        },
        process.env.JWT_GESLO
    );
};

const userModel = mongoose.model("User", userSchema);

// mongoose.model('Uporabnik', uporabnikiShema, 'Uporabniki');

////////////////////////////////////// GROUPS SCHEMA: /////////////////////////////////////////////////////////

const groupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        balance: { type: Number, default: 0.0, required: true },
        // isUserGroup: { type: Boolean, default: false },
        userIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                // validate: {
                //     validator: function (userId) {
                //         return new Promise(function (resolve) {
                //             userModel.find({ _id: userId }, function (err, docs) {
                //                 resolve(docs.length === 1);
                //             });
                //         });
                //     },
                //     message: (props) => `User with id '${props.value}' is not a valid user!`,
                // },
            },
        ],
        adminIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                // validate: {
                //     validator: function (userId) {
                //         return new Promise(function (resolve) {
                //             userModel.find({ _id: userId }, function (err, docs) {
                //                 resolve(docs.length === 1);
                //             });
                //         });
                //     },
                //     message: (props) => `User with id '${props.value}' is not a valid user!`,
                // },
            },
        ],
        expenses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Expense",
                // validate: {
                //     validator: function (expenseId) {
                //         return new Promise(function (resolve) {
                //             expenseModel.find({ _id: expenseId }, function (err, docs) {
                //                 resolve(docs.length === 1);
                //             });
                //         });
                //     },
                //     message: (props) => `Expense with id '${props.value}' is not a valid expense!`,
                // },
            },
        ],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        collection: "Groups",
    }
);
groupSchema.plugin(mongoosePaginate);
const groupModel = mongoose.model("Group", groupSchema);

/////////////////////////////////////////// EXPENSE SCHEMA: ////////////////////////////////////////////////////

const expenseSchema = new mongoose.Schema(
    {
        isExpenditure: { type: Boolean, required: true },
        cost: { type: Number, required: true },
        date: { type: Date, default: Date.now(), required: true },
        category_name: { type: String, required: true },
        created_by: { type: String, required: true }, // username
        description: String,
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
            // validate: {
            //     validator: function (groupId) {
            //         return new Promise(function (resolve) {
            //             groupModel.find({ _id: groupId }, function (err, docs) {
            //                 resolve(docs.length === 1);
            //             });
            //         });
            //     },
            //     message: (props) => `Group with id '${props.value}' is not a valid group!`,
            // },
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
expenseSchema.plugin(mongoosePaginate);
const expenseModel = mongoose.model("Expense", expenseSchema);
