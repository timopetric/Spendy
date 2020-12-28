/** GET /api/v2/expenses/{idExpense}
 * @swagger
 *  /expenses/{idExpense}:
 *    get:
 *      summary: Get expense by ID
 *      description: Returns expense
 *      tags: [Expenses]
 *      parameters:
 *        - in: path
 *          name: idExpense
 *          description: enolicni identifikator expensa
 *          schema:
 *            type: string
 *          required: true
 *          example: 5ded18eb51386c3799833191
 *      responses:
 *        "200":
 *          description: Expense element
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Expense'
 *        "500":
 *          description: Error in database
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 *        "404":
 *          description: Expense was not found
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 */
