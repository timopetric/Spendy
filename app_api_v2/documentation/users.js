/** GET /api/v2/users
 * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      description: Returns a list of all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User_getAllUsers'
 *        "500":
 *          description: Error in database
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 *        "404":
 *          description: No user was found
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 */