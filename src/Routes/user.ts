import {
  userBulkCreateValidator,
  userDetailsValidator,
  userRegisterValidator,
} from "@Helpers/Middlewares/validators";
import UserController from "@Controllers/UserController";
import { Router } from "express";
import { body, param } from "express-validator";

const router = Router();

/**
 * @swagger
 *  paths:
 *    /api/users:
 *      post:
 *        tags: [Users]
 *        summary: Create new user in system
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  firstName:
 *                    type: string
 *                    example: Brook
 *                  lastName:
 *                    type: string
 *                    example: McJohn
 *                  wishes:
 *                    type: string
 *                    example: new year, new cellphone, new tv, candy
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    userId:
 *                      type: integer
 *                      example: 53
 *                    message:
 *                      type: string
 */

router.post(
  "/users",
  body().custom(userRegisterValidator),
  UserController.registerUser
);
/**
 * @swagger
 *  paths:
 *    /api/users/{amount}:
 *      post:
 *        tags: [Users]
 *        summary: Creating a collection of users by provided amount
 *        parameters:
 *          - name: amount
 *            in: path
 *            required: true
 *            description: Amount of users to be created
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    userIds:
 *                      type: array
 *                      items:
 *                        type: integer
 *                        example: 431
 *                    message:
 *                      type: string
 */

router.post(
  "/users/:amount",
  param().custom(userBulkCreateValidator),
  UserController.bulkCreate
);

/**
 * @swagger
 *  paths:
 *    /api/users/{id}:
 *      get:
 *        tags: [Users]
 *        summary: Returns a details about santa's receiver.
 *        parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: User ID
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    receiverDetails:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        firstName:
 *                          type: string
 *                          example: Seen
 *                        lastName:
 *                          type: string
 *                          example: McJohn
 *                        wishes:
 *                          type: string
 *                          example: 1. new cellphone\n2. ice cream\n3. better car
 *                      code:
 *                        type: integer
 *                    message:
 *                      type: string
 */
router.get(
  "/users/:id",
  param().custom(userDetailsValidator),
  UserController.getDetails
);
/**
 * @swagger
 *  paths:
 *    /api/users:
 *      get:
 *        tags: [Users]
 *        summary: Returns all users registered in game
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    count:
 *                      type: integer
 *                      example: 500
 *                    users:
 *                      type: array
 *                      items:
 *                        type: integer
 *                        example: 5
 *                    message:
 *                      type: string
 */
router.get("/users", UserController.getUsers);

/**
 * @swagger
 *  paths:
 *    /api/users:
 *      delete:
 *        tags: [Users]
 *        summary: Deletes all users in a system
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    count:
 *                      type: integer
 *                    message:
 *                      type: string
 */

router.delete("/users", UserController.bulkDelete);

export default router;
