import { ResponseCodes, ResponseMessages } from "@Helpers/enums";
import { CustomRequest, RegisterBody } from "@Helpers/types";
import utils from "@Helpers/utils";
import { Users } from "@prisma/client";
import UserService from "@Services/UserService";
import DatabaseClient from "@Structure/DatabaseClient";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

class UserController {
  public async registerUser(req: CustomRequest<RegisterBody>, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          message: ResponseMessages.BAD_REQUEST,
          code: ResponseCodes.BAD_REQUEST,
        });
      }

      const { firstName, lastName, wishes } = req.body;

      const formatedWishes = wishes
        .split(", ")
        .map((w, i) => `${++i}. ${w}`)
        .join("\n");

      const isAvailable = await UserService.isAvailable();

      if (!isAvailable) {
        return res.json({
          message: ResponseMessages.NO_REGISTRATION_SLOTS,
          code: ResponseCodes.OK,
        });
      }

      const registeredUser = await UserService.createUser({
        firstName,
        lastName,
        wishes: formatedWishes,
      });

      return res.json({
        userId: registeredUser.id,
        message: ResponseMessages.SUCCESS_REGISTRATION,
        code: ResponseCodes.OK,
      });
    } catch (err) {
      console.log(err);

      return res.json({
        error: err,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const allUsers = (await UserService.getAll()) as Users[];

      return res.json({
        count: allUsers.length,
        code: ResponseCodes.OK,
        users: allUsers,
      });
    } catch (err) {
      return res.json({
        customErr: err,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async bulkDelete(req: Request, res: Response) {
    try {
      const count = await UserService.bulkDelete();

      return res.json({
        deletedUsers: count,
        code: ResponseCodes.OK,
      });
    } catch (err) {
      return res.json({
        customErr: err,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async bulkCreate(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          code: ResponseCodes.BAD_REQUEST,
          message: ResponseCodes.BAD_REQUEST,
        });
      }

      const { amount } = req.params;
      const createdUsersIds = [];

      for (let i = 0; i < +amount; i++) {
        const userData = {
          firstName: utils.randomString(),
          lastName: utils.randomString(),
          wishes: `1. ${utils.randomString()}\n2. ${utils.randomString()}\n3. ${utils.randomString()}`,
        };

        const createdUser = await UserService.createUser(userData);
        createdUsersIds.push(createdUser.id);
      }

      return res.json({
        message: ResponseMessages.SUCCESS_REGISTRATION,
        code: ResponseCodes.OK,
        userIds: createdUsersIds,
      });
    } catch (err) {
      return res.json({
        customErr: err,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async getDetails(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          code: ResponseCodes.BAD_REQUEST,
          message: ResponseCodes.BAD_REQUEST,
        });
      }

      const { id } = req.params;

      if (!id) {
        return res.json({
          message: ResponseMessages.NO_DATA,
          code: ResponseCodes.NOT_FOUND,
        });
      }

      const details = await UserService.getReceiver(Number(id));

      return res.json({
        receiverDetails: details,
        code: ResponseCodes.OK,
      });
    } catch (err) {
      return res.json({
        customErr: err,
        message: ResponseMessages.NO_DATA,
        code: ResponseCodes.NOT_FOUND,
      });
    }
  }
}

export default new UserController();
