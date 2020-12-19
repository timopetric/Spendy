const mongoose = require("mongoose");
const User = mongoose.model("User");
const Expense = mongoose.model("Expense");
const Group = mongoose.model("Group");



/** GET /api/v2/groups/{idGroup}/expenses?
 * @swagger
 *  /groups/{groupId}/expenses:
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
 *        -  in: query
 *           name: queryParameters
 *           description: Allows us to order expenses when database returns them. isExpenditure (true/false)- returns only incomes if set false, otherwise returns expenditures, Date (desc/asc) - orders by date
 *           schema:
 *             type: string
 *           example: ?isExpenditure=true&date=desc
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

const getExpensesByGroupIdWithParam = async (req, res) => {
    let isExpenditure = req.query.isExpenditure;
    let cena = req.query.cena;
    let datum = req.query.date;
    let queryinput = req.query.search;
    isExpenditure = isExpenditure != null || undefined ? { isExpenditure: isExpenditure } : {};
    cena = cena != null || undefined ? { cost: { $gte: cena } } : {};
    datum = datum != null || undefined ? { sort: { date: -1 } } : {};
    queryinput =
        queryinput != null || undefined
            ? { category_name: { $regex: new RegExp(queryinput, "i") } }
            : {};

    const match = Object.assign(isExpenditure, cena, queryinput);
    const options = Object.assign(datum);
    Group.findById(req.params.id)
        .select("expenses")
        .populate({
            path: "expenses",
            match: match,
            options: options,
        })
        .exec((napaka, group) => {
            if (!group) {
                return res.status(404).json({
                    message: "Ne najdem skupine s podanim id-jem",
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            return res.status(200).json(group);
        });
};


module.exports = {getExpensesByGroupIdWithParam};
