const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");


/** GET /api/v2/groups/{idGroup}
 * @swagger
 *  /groups/{groupId}:
 *    get:
 *      summary: Get all expenses of specific group defined by unique groupId.
 *      description: Returns all expenses of a specific group given by unique groupId.
 *      tags: [Groups]
 *      parameters:
 *        -  in: path
 *           name: groupId
 *           description: Unique group id.
 *           schema:
 *             type: string
 *           example: 218389asd912
 *      responses:
 *        "200":
 *          description: An array of expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Expense'
 *        "500":
 *          description: An error message
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 */

const getExpensesByGroupId = async (req, res) => {
    let found = await Group.findById(req.params.id)
        .select("expenses")
        .populate("expenses")
        .exec((napaka, group) => {
            if (!group) {
                return res.status(404).json({
                    message: "Can't find the group with this unique Id",
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            return res.status(200).json(group);
        });

    return found;
};

module.exports = {getExpensesByGroupId};
