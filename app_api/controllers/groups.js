const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");


/**
 * @swagger
 * paths:
 *  /groups:
 *    get:
 *      summary: Get all groups
 *      tags: [Groups]
 *      responses:
 *        "200":
 *          description: An array of groups
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Group'
 */
const getAllGroups = async (req, res) => {
  Group
      .find()
      // .populate("userIds", "_id username name surname")
      // .populate("adminIds", "_id username name surname")
      // .populate("expenses")
      .exec((err, groups) => {
        if (err || !groups) return res.status(404).json({
          "message": "Pridobivanje skupin je neuspešno: "+err
        });
        else if (groups) {
          console.log(groups);
          return res.status(200).json({groups});
        }
      });
};


/**
 * @swagger
 * paths:
 *  /groups/{groupId}:
 *    post:
 *      summary: Add a valid user to a valid group
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: groupId
 *          schema:
 *            type: string
 *          required: true
 *          description: A valid group id
 *      requestBody:
 *          name: userId
 *          content:
 *            application/json:
 *              todo: ??
 *          required: true
 *          description: A valid user you want to add to the group
 *      responses:
 *        "200":
 *          description: A group with updated userId, userAdmin lists
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Group'
 */
const addUserToGroup = (req, res) => {
  const groupId = req.params.idGroup;
  const userId = req.body.userId;   // user id string
  const isAdmin = req.body.isAdmin; // boolean

  Group
      .findById(groupId)
      .exec((err, group) => {
        if (err || !group) {
          return res.status(404).json({"message": `Group not found: ${err}`});
        }

        group.userIds.push(userId);
        if (isAdmin === true)
          group.adminIds.push(userId);

        group.save((err, groupUpdated) => {
          if (err || !groupUpdated) {
            return res.status(404).json({"message": `Could not add groupId to group: ${err}`});
          }
          return res.status(200).json({groupUpdated});
        });
      });
}


/**
 * @swagger
 * paths:
 *  /groups/{id}:
 *    get:
 *      summary: Get group by id
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: A valid group id
 *      responses:
 *        "200":
 *          description: A group
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Group'
 */
const getGroupById = async (req, res) => {
  Group
      .findById(req.params.id)
      .populate("expenses")
      .populate("userIds", "-pass")
      .populate("adminIds", "-pass")
      .exec((err, group) => {
        if (!group) {
          return res.status(404).json({
            "message": "Ne najdem skupine s podanim id-jem",
          });
        } else if (err) {
          return res.status(500).json(err);
        }

        return res.status(200).json(group);
      });
};


/**
 * @swagger
 * paths:
 *  /groups:
 *    post:
 *      summary: Create a new group
 *      tags: [Groups]
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Group'
 *          required: true
 *      responses:
 *        "200":
 *          description: Created group
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Group'
 */
const addGroup = (req, res) => {
  Group.create(
    {
      name: req.body.name,
      balance: req.body.balance,
      userIds: req.body.userIds,
      adminIds: req.body.adminIds,
      expenses: req.body.expenses,
    },
    (err, group) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else if (!group) {
        return res.status(404).json({
          message: "Ustvarjanje skupine je bilo neuspešno",
        });
      }
      res.status(201).json(group);
    }
  );
};

const removeGroupById = (req, res) => {
  const { idGroup } = req.params;
  // const idGroup = req.params.idGroup;
  console.log(idGroup);
  if (idGroup) {
    Group.findByIdAndRemove(idGroup).exec((err, group) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log("GROUP DELETED: " + group);
      console.log("Expenses to delete: " + group.expenses);

      Expense.deleteMany({ _id: { $in: group.expenses } }, (err, res) => {
        if (!res || !err) {
          console.log("Error deleting expenses for group." + err);
        }
      });

      res.status(204).json(null);
    });
  } else {
    res.status(404).json({
      message: "groupId is a required parameter.",
    });
  }
};

const updateGroup = (req, res) => {
  const groupId = req.params.idGroup;
  if (!groupId) {
    return res.status(404).json({
      message: "idGroup je obvezen parameter.",
    });
  }

  Group.findById(groupId).exec((err, group) => {
    if (!group) {
      return res.status(404).json({ message: "Ne najdem grupe" });
    } else if (err) {
      return res.status(500).json(err);
    }

    group.balance = req.body.balance;
    group.userIds = req.body.userIds || [];
    group.adminIds = req.body.adminIds || [];
    group.expenses = req.body.expenses || [];
    group.name = req.body.name;

    group.save((err, group) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(group);
      }
    });
  });
};

const deleteUserFromGroup = (req, res) => {
  Group.findById(req.params.idGroup).exec((err, group) => {
    if (!group) {
      return res.status(404).json({ message: "Ne najdem grupe" });
    } else if (err) {
      res.status(404).json(err);
    }
    console.log(group);
    group.userIds.remove(req.params.idUser);
    console.log(group);
    group.save((error, saved) => {
      if (!saved) {
        return res.status(404).json({ message: "Ni mi uspelo shranit" });
      } else if (error) {
        res.status(404).json(err);
      }
      User.findById(req.params.idUser)
      .exec((userErr, user) => {
        if(!user){
          return res.status(404).json({ message: "Ne najdem userja" });
        }
        else if(userErr){
          res.status(404).json(userErr);
        }
        user.groupIds.remove(req.params.idGroup);
        user.save((saveErr, result) => {
          if(!result){
            return res.status(404).json({ message: "Ni mi uspelo shranit userja" });
          }
          else if(saveErr){
            res.status(404).json(userErr);
          }
          res.status(200).json(saved);
        })
      })
    });
  });
};

module.exports = {
  getAllGroups,
  getGroupById,
  addUserToGroup,
  addGroup,
  removeGroupById,
  updateGroup,
  deleteUserFromGroup,
};
