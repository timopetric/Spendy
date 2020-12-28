/** ############# ERROR: [500] "Error in database" ##########
 * @swagger
 *  components:
 *    schemas:
 *      Error:
 *        type: object
 *        description: Returns errors
 *        properties:
 *          message:
 *            type: string
 *          error:
 *            type: string
 *        example:
 *          message: Error in database
 *          error: optional json error
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        description: \-
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

/** ########################## GET /api/v2/users [User_getAllUsers] ############################
 * @swagger
 *  components:
 *    schemas:
 *      User_getAllUsers:
 *        type: object
 *        description: Returns all users in the database
 *        properties:
 *          groupIds:
 *            type: array
 *            items:
 *              type: string
 *            description: A list of valid(existing) group IDs
 *            example: ["5fc01ba0cd9e25474436be60", "5fba7cb28a41eb7ee6452713"]
 *          _id:
 *            type: string
 *            description: Internal database ID of the user
 *            example: 5fc44bd3f35a902b3000803c
 *          username:
 *            type: string
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
 *          balance:
 *            type: number
 *            description: Current balance of the user in €
 *            example: 100.9
 *          mail:
 *            type: boolean
 *            description: Mail address of the user
 *            example: j_novak@email.com
 */

/** ########################## GET /api/v2/groups [Group_bare] ############################
 * @swagger
 *  components:
 *    schemas:
 *      Group_bare:
 *        type: object
 *        description: Returns all groups in the database
 *        properties:
 *          balance:
 *            type: number
 *            description: Current balance of the group in €
 *            example: 100.9
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
 *          _id:
 *            type: string
 *            description: Internal database ID of the group
 *            example: 5fc44bd3f35a902b3000803c
 *          name:
 *            type: string
 *            description: Name of the user
 *            example: Janez
 */

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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Expense:
 *        type: object
 *        description: Expense object
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
 *            description: user ID
 *            example: "8fc0cca0cd9e25474436rd32"
 *          description:
 *            type: string
 *            description: A description od the expense
 *            example: a very helpful description
 *          groupId:
 *            type: string
 *            description: A list of valid(existing) group IDs
 *            example: "5fc01ba0cd9e25474436be60"
 */
