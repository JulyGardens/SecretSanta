import ShuffleController from "@Controllers/ShuffleController";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 *  paths:
 *    /api/shuffle:
 *      post:
 *        tags: [Shuffle]
 *        summary: Shuffle all users
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    pairs:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                            example: 3
 *                          santaId:
 *                            type: integer
 *                            example: 545
 *                          receiverId:
 *                            type: integer
 *                            example: 434
 *                    count:
 *                      type: integer
 *                      example: 444
 */
router.post("/shuffle", ShuffleController.shuffle);

/**
 * @swagger
 *  paths:
 *    /api/pairs:
 *      get:
 *        tags: [Shuffle]
 *        summary: Returns all user pairs
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    pairs:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                            example: 3
 *                          santaId:
 *                            type: integer
 *                            example: 545
 *                          receiverId:
 *                            type: integer
 *                            example: 434
 *                    count:
 *                      type: integer
 *                      example: 444
 */
router.get("/pairs", ShuffleController.getAll);

/**
 * @swagger
 *  paths:
 *    /api/pairs:
 *      delete:
 *        tags: [Shuffle]
 *        summary: Deletse all users pairs
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
 *                      example: 444
 *                    message:
 *                      type: string
 *
 */
router.delete("/pairs", ShuffleController.bulkDelete);

export default router;
